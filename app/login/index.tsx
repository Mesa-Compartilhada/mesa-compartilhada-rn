import InputDefault from "@/components/inputs/inputDefault";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { View, KeyboardAvoidingView, Platform, Text } from "react-native";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { login as loginEmpresa } from "@/api/services/authService"

import { Formik } from "formik"
import * as yup from "yup"
import { getToken, saveToken } from "@/storage/secureStore";
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
                handleBlur, // passar no onBlur dos campos para validacao em tempo real
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
                            onBlur={handleBlur("email")}
                            Icon={ 
                                <MaterialIcons 
                                name="email" 
                                color={Colors.azul} 
                            size={24} />} 
                            placeholder="exemplo@gmail.com"
                            error={ touched.email ? errors.email : undefined }
                            autoCapitalize="none" 
                        />

                        <InputDefault 
                            value={values.senha}
                            onChangeText={handleChange("senha")}
                            onBlur={handleBlur("senha")}
                            Icon={
                                <MaterialIcons 
                                name="password" 
                                color={Colors.azul} 
                            size={24} />} 
                            placeholder="******" 
                            error={ touched.senha ? errors.senha : undefined }
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