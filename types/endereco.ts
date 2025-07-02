export type Endereco = {
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

export type EnderecoAdd = {
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