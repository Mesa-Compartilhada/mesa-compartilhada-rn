import { JwtToken } from "@/src/types/jwtToken";
import api from "../axios";
import { EmpresaLogin } from "@/src/types/empresa";
import ENDPOINTS from "../endpoints";

export async function login(loginInfo: EmpresaLogin): Promise<JwtToken> {
    const response = await api.post(`${ENDPOINTS.EMPRESAS}/login`, JSON.stringify(loginInfo))
    return response.data
}