import ENDPOINTS from "../endpoints";
import api from "../axios";
import { Empresa, EmpresaAdd, EmpresaUpdate } from "@/src/types/empresa";
import { getToken } from "@/src/storage/secureStore";

export async function addEmpresa(empresa: EmpresaAdd) {
    try {
        const response = await api.post(`${ENDPOINTS.EMPRESAS}/register`, empresa)
        return { status: response.status === 200, statusCode: response.status, empresa: response.data }
    } catch(error) {
        console.log(error)
    }
}

export async function updateEmpresa(id: string, empresa: EmpresaUpdate): Promise<EmpresaUpdate> {
    const response = await api.put(`${ENDPOINTS.EMPRESAS}/${id}`, empresa)
    return response.data
}

export async function getEmpresa(id: string): Promise<Empresa> {
    const response = await api.get(`${ENDPOINTS.EMPRESAS}/${id}`)
    return response.data
}

export async function getAllEmpresa(): Promise<Empresa[]> {
    const response = await api.get(ENDPOINTS.EMPRESAS)
    return response.data
}

export async function getMe() {
    const jwt = await getToken()
    if(jwt) {
        try {
            const response = await api.get(`${ENDPOINTS.EMPRESAS}/me`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            })
            return response
        } catch(error) {
            console.log(error)
        }
    }
}