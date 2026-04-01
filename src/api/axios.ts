import axios, { AxiosAdapter } from "axios"
import { USE_MOCK } from "./mockConfig";
import { getMockResponse } from "./axiosMock";

// define configuracoes base pras requisicoes
// EXPO_PUBLIC_MC_API_URL vai localmente no .env
const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_MC_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    validateStatus: status => (status < 500)
})

const originalAdapter = api.defaults.adapter as AxiosAdapter;

api.defaults.adapter = async (config) => {
    if (USE_MOCK) {
        const mock = await getMockResponse(config.url || '', config.method || 'get', config.data);
        if (mock) {
            return {
                data: mock.data,
                status: mock.status,
                statusText: mock.status === 200 ? 'OK' : 'Error',
                headers: {},
                config: config,
            };
        }
    }
    return originalAdapter(config);
};

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("Erro na resposta: ", error)
        return Promise.reject(error)
    }
)

export default api