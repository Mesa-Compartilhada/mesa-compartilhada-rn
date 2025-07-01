import { empresa } from "./empresa"

export type doacao = {
    id: string
    nome: string
    descricao: string,
    status: string,
    observacao: string,
    dataFabricacao: string,
    dataValidade: string,
    dataCriada: string,
    dataEncerrada: string,
    dataMaxRetirada: string,
    horarioMin: string,
    horarioMax: string,
    tipoAlimento: string,
    tipoArmazenamento: string,
    empresaDoadora: empresa,
    empresaRecebedora: empresa,
    empresaDoadoraConcluida: boolean,
    empresaRecebedoraConcluida: boolean,
    quantidade: number,
    unidadeMedida: string
}

export type doacaoAdd = {
    nome: string
    descricao: string,
    observacao: string,
    dataFabricacao: string,
    dataValidade: string,
    dataCriada: string,
    dataMaxRetirada: string,
    horarioMin: string,
    horarioMax: string,
    tipoAlimento: number,
    tipoArmazenamento: number,
    empresaDoadoraId: string,
    quantidade: number,
    unidadeMedida: number
}

export type doacaoUpdateState = {
    status: string,
    empresaRecebedoraId: string,
    empresaSolicitanteId: string
}

export type doacaoFilter = {
    status: string[],
    dataFabricacaoMin: string,
    dataFabricacaoMax: string,
    dataValidadeMin: string,
    dataValidadeMax: string,
    dataCriadaMin: string,
    dataCriadaMax: string,
    dataEncerradaMin: string,
    dataEncerradaMax: string,
    dataRetiradaMin: string,
    dataRetiradaMax: string,
    tipoAlimento: number[],
    tipoArmazenamento: number[],
    empresaDoadoraId: string,
    empresaRecebedoraId: string
}