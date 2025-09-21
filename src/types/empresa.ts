import { Endereco } from "./endereco"

export type Empresa = {
    id: string,
    cnpj: string,
    tipo: number,
    categoria: number,
    nome: string,
    email: string,
    status: number,
    endereco: Endereco,
    fotoPerfil?: string
}

export type EmpresaAdd = {
    cnpj: string,
    tipo: number,
    categoria: number,
    nome: string,
    email: string,
    senha: string,
    enderecoId: string,
    fotoPerfil?: string
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
    enderecoId: string,
    fotoPerfil?: string
}

export type EmpresaResetPassword = {
    token: string,
    senha: string
}

export type EmpresaUpdatePassword = {
    senhaAtual: string,
    senhaNova: string
}