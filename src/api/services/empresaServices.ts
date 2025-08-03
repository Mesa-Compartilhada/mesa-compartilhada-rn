import ENDPOINTS from "../endpoints";
import api from "../axios";
import { Empresa, EmpresaAdd, EmpresaUpdate } from "@/src/types/empresa";

export async function addEmpresa(empresa: EmpresaAdd): Promise<EmpresaAdd> {
    const response = await api.post(ENDPOINTS.EMPRESAS, empresa)
    return response.data
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