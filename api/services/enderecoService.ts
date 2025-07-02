import { EnderecoAdd } from "@/types/endereco";
import ENDPOINTS from "../endpoints";
import api from "../axios";

export async function addEndereco(): Promise<EnderecoAdd> {
    const response = await api.post(ENDPOINTS.ENDERECOS)
    return response.data
}