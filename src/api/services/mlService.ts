import axios from "axios"

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_MC_ML_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    validateStatus: status => (status < 500)
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("Erro na resposta: ", error)
        return Promise.reject(error)
    }
)

type TData = {
    "dataValidade": string,
    "dataCriada": string,
    "dataMaxRetirada": string,
    "quantidade": number,
    "tipoAlimento": number
}

export async function preverStatusFinal(data: TData) {
    try {
        console.log(process.env.EXPO_PUBLIC_MC_ML_API_URL)
        const response = await api.post('', data)
        return response.data.response
    } catch(error) {
        console.log(error)
    }   
}