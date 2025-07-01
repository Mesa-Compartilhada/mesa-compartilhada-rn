export type endereco = {
    id: string,
    cep: string,
    numero: string,
    logradouro: string,
    bairro: string,
    cidade: string,
    estado: string,
    pais: string,
    complemento?: string
    latitude: number,
    longitude: number
}

export type enderecoAdd = {
    cep: string,
    numero: string,
    logradouro: string,
    bairro: string,
    cidade: string,
    estado: string,
    pais: string,
    complemento?: string
    latitude: number,
    longitude: number
}