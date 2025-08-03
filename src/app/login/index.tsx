import InputDefault from "@/src/components/inputs/inputDefault";
import { Colors } from "@/src/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { View, KeyboardAvoidingView, Platform, Text } from "react-native";
import ButtonDefault from "@/src/components/buttons/buttonDefault";
import { login as loginEmpresa } from "@/src/api/services/authService"

import { Formik } from "formik"
import * as yup from "yup"
import { getToken, saveToken } from "@/src/storage/secureStore";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
    email: yup.string()
        .email("Deve ser um email válido")
        .required("É necessário digitar seu email"),
    senha: yup.string()
        .required("É necessário digitar sua senha")
})

export default function Login() {
    async function login(email: string, senha: string) {
        const response = await loginEmpresa({
            email: email,
            senha: senha
        })
        saveToken(response.token)
    }

    return (
        <Formik
        initialValues={{
            email: "",
            senha: ""
        }}
        validationSchema={schema}
        onSubmit={ values => {
            login(values.email, values.senha)
        }}>
            {({ 
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit
            }) => (
                <KeyboardAvoidingView 
                    className="self-center w-full px-4 my-4"
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                >
                    <View className="h-3/4 my-2 gap-4"> 
                        <InputDefault 
                            value={values.email}
                            onChangeText={handleChange("email")}
                            Icon={ 
                                <MaterialIcons 
                                name="email" 
                                color={Colors.azul} 
                            size={24} />} 
                            placeholder="exemplo@gmail.com"
                            error={errors.email}
                            autoCapitalize="none" 
                        />

                        <InputDefault 
                            value={values.senha}
                            onChangeText={handleChange("senha")}
                            Icon={
                                <MaterialIcons 
                                name="password" 
                                color={Colors.azul} 
                            size={24} />} 
                            placeholder="******" 
                            error={errors.senha}
                            secureTextEntry={true}
                            autoCapitalize="none"
                        />
                    </ View>

                    <View className="">
                        <ButtonDefault 
                            icon={<MaterialIcons name="login" size={24} color={"white"} />}
                            title="Entrar"
                            onPress={handleSubmit as any} // handleSubmit sem 'as any' causa um erro de tipagem, apesar de não afetar o funcionamento
                        />
                    </View>
                </KeyboardAvoidingView>
            )
            }
        </Formik>
    )
}