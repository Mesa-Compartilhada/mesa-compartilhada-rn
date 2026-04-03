import ENDPOINTS from "../endpoints";
import api from "../axios";
import { Doacao, DoacaoAdd, DoacaoFilter, DoacaoUpdateState } from "@/src/types/doacao";
import { getToken } from "@/src/storage/secureStore";

export async function addDoacao(doacao: DoacaoAdd): Promise<{ status: boolean, data?: Doacao, message: string }> {
    const jwt = await getToken()
    try {
        const response = await api.post(ENDPOINTS.DOACOES, doacao, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        if (response.status === 200 || response.status === 201) {
            return { status: true, data: response.data, message: "Doação criada com sucesso" }
        }
        return { status: false, message: response.data?.message || "Erro ao criar doação" }
    } catch(error: any) {
        console.warn("Erro ao adicionar doação:", error)
        return { status: false, message: error.response?.data?.message || "Erro inesperado ao criar doação" }
    }
}

export async function updateStateDoacao(id: string, doacao: DoacaoUpdateState) {
    const jwt = await getToken()
    if(jwt) {
        const response = await api.put(`${ENDPOINTS.DOACOES}/status/${id}`, doacao, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        return response.data
    }
}

export async function getDoacaoById(id: string): Promise<Doacao> {
    const jwt = await getToken()
    const response = await api.get(`${ENDPOINTS.DOACOES}/${id}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    return response.data
}

export async function getDoacaoByFilter(filtros: DoacaoFilter): Promise<Doacao[]> {
    const jwt = await getToken()
    if(jwt) {
        try {
            const response = await api.post(`${ENDPOINTS.DOACOES}/filtro`, JSON.stringify(filtros), {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            // Handle possible API response wrapping (e.g., { data: [] } or just [])
            const finalData = response.data?.data || response.data;
            return Array.isArray(finalData) ? finalData : [];
        } catch(error) {
            console.warn("Erro ao buscar doações por filtro:", error)
            return [];
        }
    }
    return [];
}