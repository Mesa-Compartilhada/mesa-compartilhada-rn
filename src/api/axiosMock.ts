import { InternalAxiosRequestConfig } from "axios";
import { USE_MOCK } from "./mockConfig";
import { MOCK_DOACOES, MOCK_USER_DOADORA, MOCK_USER_RECEBEDORA } from "./mockData";
import ENDPOINTS from "./endpoints";

export const setupAxiosMock = (config: InternalAxiosRequestConfig) => {
    if (!USE_MOCK) return config;

    const { url, method, data } = config;
    
    // Helper to return a "mock response" structure that axios expects
    const mockResponse = (responseData: any, status = 200) => {
        // We throw an object that we will catch in the adapter or handle differently.
        // But a cleaner way with standard axios is to use an adapter or just mock at the service level.
        // However, to avoid changing all services, we can "hijack" the request.
        
        // Since we can't easily return a response from a request interceptor without a library,
        // I will implement a simple logic in the services instead, or use a custom adapter.
        return null; 
    };

    return config;
};

// Actually, let's just create a mock helper that services can use.
// It's safer and less prone to breaking axios internals.

export const getMockResponse = async (url: string, method: string, data?: any) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network lag

    if (url.includes(`${ENDPOINTS.EMPRESAS}/login`)) {
        const parsedData = typeof data === 'string' ? JSON.parse(data || '{}') : data;
        const user = parsedData?.email === 'recebedora@mock.com' ? MOCK_USER_RECEBEDORA : MOCK_USER_DOADORA;
        return {
            status: 200,
            data: {
                token: "mock-jwt-token",
                user: user
            }
        };
    }

    if (url.includes(`${ENDPOINTS.EMPRESAS}/register`)) {
        return {
            status: 200,
            data: { ...MOCK_USER_DOADORA, id: "new-user-id" }
        };
    }

    if (url.includes(`${ENDPOINTS.EMPRESAS}/me`)) {
        return {
            status: 200,
            data: { user: MOCK_USER_DOADORA }
        };
    }

    if (url.includes(`${ENDPOINTS.EMPRESAS}/atualizar-senha`)) {
        return { status: 200, data: { message: "Senha atualizada" } };
    }

    if (url.includes(ENDPOINTS.EMPRESAS) && method === 'put') {
        return {
            status: 200,
            data: { ...MOCK_USER_DOADORA, ... (typeof data === 'string' ? JSON.parse(data || '{}') : data) }
        };
    }

    if (url.includes(`${ENDPOINTS.DOACOES}/filtro`)) {
        return {
            status: 200,
            data: MOCK_DOACOES
        };
    }

    if (url.includes(ENDPOINTS.DOACOES) && method === 'get') {
        const id = url.split('/').pop();
        const doacao = MOCK_DOACOES.find(d => d.id === id) || MOCK_DOACOES[0];
        return {
            status: 200,
            data: doacao
        };
    }

    if (url.includes(ENDPOINTS.EMPRESAS) && method === 'get') {
        const id = url.split('/').pop();
        if (id === 'me') return { status: 200, data: MOCK_USER_DOADORA };
        return {
            status: 200,
            data: MOCK_USER_DOADORA
        };
    }

    if (url.includes(ENDPOINTS.ENDERECOS) && method === 'post') {
        return {
            status: 200,
            data: { id: "new-addr-id", ...JSON.parse(data || '{}') }
        };
    }

    return null;
};
