import { Endereco } from "./endereco"

export type Empresa = {
    id: string,
    cnpj: string,
    tipo: string,
    categoria: string,
    nome: string,
    email: string,
    status: string,
    endereco: Endereco
}

export type EmpresaAdd = {
    cnpj: string,
    tipo: number,
    categoria: number,
    nome: string,
    email: string,
    senha: string,
    enderecoId: string
}

export type EmpresaLogin = {
    email: string,
    senha: string
}

export type EmpresaUpdate = {
    cnpj: string,
    tipo: number,
    categoria: number,
    nome: string,
    email: string,
    enderecoId: string
}

export type EmpresaResetPassword = {
    token: string,
    senha: string
}