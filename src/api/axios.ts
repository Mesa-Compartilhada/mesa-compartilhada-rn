import axios from "axios"
import { USE_MOCK } from "./mockConfig";
import { getMockResponse } from "./axiosMock";

// define configuracoes base pras requisicoes
const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_MC_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    validateStatus: status => (status < 500)
})

// Se o Mock estiver ativado, interceptamos a requisição
if (USE_MOCK) {
    api.interceptors.request.use(async (config) => {
        const mock = await getMockResponse(config.url || '', config.method || 'get', config.data);
        if (mock) {
            // Se houver mock, podemos forçar um erro ou sucesso simulado via adapter
            // Mas para simplificar e evitar o erro do adapter, vamos apenas logar ou lançar
            // No futuro, se precisar de mock real com axios, recomenda-se axios-mock-adapter
            console.log("Mock data would be used here");
        }
        return config;
    });
}

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Erro na resposta: ", error)
        return Promise.reject(error)
    }
)

export default api