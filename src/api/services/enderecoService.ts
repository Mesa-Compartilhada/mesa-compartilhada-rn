import { EnderecoAdd } from "@/src/types/endereco";
import ENDPOINTS from "../endpoints";
import api from "../axios";

export async function addEndereco(endereco: EnderecoAdd) {
    try {
        const response = await api.post(ENDPOINTS.ENDERECOS, endereco)
        return response.data
    } catch(error) {
        console.log(error)
    }
    
}