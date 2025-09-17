import api from "../axios";
import { EmpresaLogin, EmpresaResetPassword, EmpresaUpdatePassword } from "@/src/types/empresa";
import ENDPOINTS from "../endpoints";
import { getToken } from "@/src/storage/secureStore";

export async function login(loginInfo: EmpresaLogin) {
    try {
        const response = await api.post(`${ENDPOINTS.EMPRESAS}/login`, JSON.stringify(loginInfo))
        let statusCode = response.status
        let message = statusCode === 200 ? "Autenticado com sucesso" : "Credenciais inválidas"
        return { status: statusCode === 200, statusCode, data: response.data, message }
    } catch(error) {
        console.warn(error)
        return { status: false, statusCode: 500, message: "Erro inesperado" }
    }
}

export async function updatePassword(senhas: EmpresaUpdatePassword) {
    const jwt = await getToken()
    try {
        const response = await api.put(`${ENDPOINTS.EMPRESAS}/atualizar-senha`, JSON.stringify(senhas), {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        })
        let statusCode = response.status
        let message = statusCode === 200 ? "Senha atualizada com sucesso" : "Credenciais inválidas"
        return { status: statusCode === 200, statusCode, data: response.data, message }
    } catch(error) {
        console.warn(error)
        return { status: false, statusCode: 500, message: "Erro inesperado" }
    }
}

export async function sendToken(email: string) {
    const jwt = await getToken()
    try {
        const response = await api.post(`${ENDPOINTS.TOKEN}/${email}`)
        let statusCode = response.status
        let message = statusCode === 200 ? "Sucesso! Um token foi enviado ao seu email" : "Erro ao enviar token por email"
        return { status: statusCode === 200, statusCode, data: response.data, message }
    } catch(error) {
        console.warn(error)
        return { status: false, statusCode: 500, message: "Erro inesperado" }
    }
}

export async function recoverPassword(data: EmpresaResetPassword) {
    try {
        const response = await api.post(`${ENDPOINTS.EMPRESAS}/recuperar-senha`, JSON.stringify(data))
        let statusCode = response.status
        let message = statusCode === 200 ? "Senha atualizada com sucesso" : "Credenciais inválidas"
        return { status: statusCode === 200, statusCode, data: response.data, message }
    } catch(error) {
        console.warn(error)
        return { status: false, statusCode: 500, message: "Erro inesperado" }
    }
}