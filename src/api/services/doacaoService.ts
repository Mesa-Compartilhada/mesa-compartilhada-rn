import ENDPOINTS from "../endpoints";
import api from "../axios";
import { Doacao, DoacaoAdd, DoacaoFilter, DoacaoUpdateState } from "@/src/types/doacao";
import { getToken } from "@/src/storage/secureStore";

export async function addDoacao(doacao: DoacaoAdd): Promise<Doacao> {
    const response = await api.post(ENDPOINTS.DOACOES, doacao)
    return response.data
}

export async function updateStateDoacao(id: string, doacao: DoacaoUpdateState): Promise<Doacao> {
    const response = await api.put(`${ENDPOINTS.DOACOES}/status/${id}`, doacao)
    return response.data
}

export async function getDoacaoById(id: string): Promise<Doacao> {
    const response = await api.get(`${ENDPOINTS.DOACOES}/${id}`)
    return response.data
}

export async function getDoacaoByFilter(filtros: DoacaoFilter) {
    const jwt = await getToken()
    if(jwt) {
        try {
            const response = await api.post(`${ENDPOINTS.DOACOES}/filtro`, JSON.stringify(filtros), {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log(response.data)
            return response.data
        } catch(error) {
            console.warn(error)
        }
    }
}