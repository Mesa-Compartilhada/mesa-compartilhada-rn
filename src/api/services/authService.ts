import api from "../axios";
import { EmpresaLogin } from "@/src/types/empresa";
import ENDPOINTS from "../endpoints";

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