import { endereco } from "./endereco"

export type empresa = {
    id: string,
    cnpj: string,
    tipo: string,
    categoria: string,
    nome: string,
    email: string,
    status: string,
    endereco: endereco
}

export type empresaAdd = {
    cnpj: string,
    tipo: number,
    categoria: number,
    nome: string,
    email: string,
    status: string,
    enderecoId: string
}

export type empresaLogin = {
    email: string,
    senha: string
}

export type empresaUpdate = {
    cnpj: string,
    tipo: number,
    categoria: number,
    nome: string,
    email: string,
    enderecoId: string
}

export type empresaResetPassword = {
    token: string,
    senha: string
}