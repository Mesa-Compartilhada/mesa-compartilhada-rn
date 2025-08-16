import * as SecureStore from "expo-secure-store"
import { Empresa, EmpresaAdd } from "../types/empresa"

const JWT_KEY = "jwt"

export async function saveToken(token: string) {
    try {
        await SecureStore.setItemAsync(JWT_KEY, token)
        return true
    }
    catch(error) {
        console.log(error)
        return false
    }
}

export async function getToken() {
    try {
        const jwt = await SecureStore.getItemAsync(JWT_KEY)
        return jwt
    }
    catch(error) {
        console.log(error)
        return false
    }
}

export async function deleteToken() {
    try {
        await SecureStore.deleteItemAsync(JWT_KEY)
        return true
    }
    catch(error) {
        console.log(error)
        return false
    }
}