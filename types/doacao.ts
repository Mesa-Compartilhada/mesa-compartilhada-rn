import { Empresa } from "./empresa"

export type Doacao = {
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
    empresaDoadora: Empresa,
    empresaRecebedora: Empresa,
    empresaDoadoraConcluida: boolean,
    empresaRecebedoraConcluida: boolean,
    quantidade: number,
    unidadeMedida: string
}

export type DoacaoAdd = {
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

export type DoacaoUpdateState = {
    status: string,
    empresaRecebedoraId: string,
    empresaSolicitanteId: string
}

export type DoacaoFilter = {
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