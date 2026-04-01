import { Empresa } from "../types/empresa";
import { Doacao } from "../types/doacao";

export const MOCK_USER_DOADORA: Empresa = {
    id: "doadora-1",
    cnpj: "12.345.678/0001-90",
    tipo: 1, // DOADORA
    categoria: 1,
    nome: "Supermercado Mock",
    email: "doadora@mock.com",
    status: 1,
    endereco: {
        id: "addr-1",
        cep: "12345-678",
        logradouro: "Rua das Flores",
        numero: "100",
        bairro: "Centro",
        cidade: "São Paulo",
        estado: "SP",
        pais: "Brasil",
        latitude: -23.5505,
        longitude: -46.6333
    },
    fotoPerfil: "https://github.com/txr-nicole.png"
};

export const MOCK_USER_RECEBEDORA: Empresa = {
    id: "recebedora-1",
    cnpj: "98.765.432/0001-10",
    tipo: 2, // RECEBEDORA
    categoria: 2,
    nome: "ONG Alimento Mock",
    email: "recebedora@mock.com",
    status: 1,
    endereco: {
        id: "addr-2",
        cep: "87654-321",
        logradouro: "Avenida da Paz",
        numero: "500",
        bairro: "Bairro Novo",
        cidade: "São Paulo",
        estado: "SP",
        pais: "Brasil",
        latitude: -23.5600,
        longitude: -46.6400
    },
    fotoPerfil: "https://via.placeholder.com/150"
};

export const MOCK_DOACOES: Doacao[] = [
    {
        id: "doacao-1",
        nome: "Maçãs Frescas",
        descricao: "Cerca de 10kg de maçãs frescas.",
        status: "DISPONIVEL",
        observacao: "Retirar até as 18h.",
        dataFabricacao: "2026-03-30T10:00:00Z",
        dataValidade: "2026-04-10T10:00:00Z",
        dataCriada: "2026-03-31T08:00:00Z",
        dataEncerrada: "",
        dataMaxRetirada: "2026-04-05T18:00:00Z",
        horarioMin: "08:00",
        horarioMax: "18:00",
        tipoAlimento: 1,
        tipoArmazenamento: 1,
        empresaDoadora: MOCK_USER_DOADORA,
        empresaRecebedora: null as any,
        empresaDoadoraConcluida: false,
        empresaRecebedoraConcluida: false,
        quantidade: 10,
        unidadeMedida: 1,
        imagemCapa: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6"
    },
    {
        id: "doacao-2",
        nome: "Pães Variados",
        descricao: "Pães do dia anterior, ainda bons.",
        status: "ANDAMENTO",
        observacao: "Levar sacolas.",
        dataFabricacao: "2026-03-30T06:00:00Z",
        dataValidade: "2026-04-02T10:00:00Z",
        dataCriada: "2026-03-31T07:00:00Z",
        dataEncerrada: "",
        dataMaxRetirada: "2026-04-01T12:00:00Z",
        horarioMin: "06:00",
        horarioMax: "12:00",
        tipoAlimento: 2,
        tipoArmazenamento: 1,
        empresaDoadora: MOCK_USER_DOADORA,
        empresaRecebedora: MOCK_USER_RECEBEDORA,
        empresaDoadoraConcluida: false,
        empresaRecebedoraConcluida: false,
        quantidade: 5,
        unidadeMedida: 1,
        imagemCapa: "https://images.unsplash.com/photo-1509440159596-0249088772ff"
    }
];
