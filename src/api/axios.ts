import axios from "axios"

// define configuracoes base pras requisicoes
// EXPO_PUBLIC_MC_API_URL vai localmente no .env
const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_MC_API_URL,
    timeout: 1000,
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

export default api