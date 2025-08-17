import { createContext, useContext, useEffect, useState } from "react";
import { Empresa, EmpresaLogin } from "../types/empresa";
import { deleteToken, getToken, saveToken } from "../storage/secureStore";
import { login } from "../api/services/authService";
import { getMe } from "../api/services/empresaServices";

type TAuthContext = {
    isLoggedIn: boolean,
    userInfo: Empresa | null,
    loginUser: (user: EmpresaLogin) => Promise<{ status: boolean, statusCode: number, data?: string, message: string } | undefined>,
    logoutUser: () => Promise<boolean>,
    fetchOwnProfile: () => Promise<void>,
    isLoading: boolean  // já que isLoggedIn é falso por padrão
                        // o componente deve aguardar o useEffect desse contexto
                        // para terminar de carregar antes de redirecionar o usuario
}

const AuthContext = createContext<TAuthContext>({
    isLoggedIn: false,
    userInfo: null,
    loginUser: async () => undefined,
    logoutUser: async () => false,
    fetchOwnProfile: async () => {},
    isLoading: true
})

type TAuthProvider = {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: TAuthProvider) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<Empresa | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getToken()
            if(token !== null && token !== undefined) {
                const fetchProfile = async () => {
                    await fetchOwnProfile()
                    setIsLoading(false)
                }
                fetchProfile()
            }
            else {
                setIsLoading(false)
            }
        }
        fetchToken()
    }, [])

    const loginUser = async (user: EmpresaLogin) => {
        const response = await login(user)
        if(response.status) {
            await saveToken(response.data.token)
            setIsLoggedIn(true)
            await fetchOwnProfile()
        }
        return response
    }

    const logoutUser = async () => {
        await deleteToken()
        setIsLoggedIn(false)
        setUserInfo(null)
        return true
    }

    const fetchOwnProfile = async () => {
        const response = await getMe()
        if(response?.status) {
            setIsLoggedIn(true)
            setUserInfo(response.data.user)
        }
        else {
            setIsLoggedIn(false)
            setUserInfo(null)
        }
    }

    return (
        <AuthContext.Provider value={ { isLoggedIn, userInfo, loginUser, logoutUser, fetchOwnProfile, isLoading } }>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    if(!authContext) throw new Error("useAuth precisa ser usado dentro do AuthProvider")
    return authContext
}