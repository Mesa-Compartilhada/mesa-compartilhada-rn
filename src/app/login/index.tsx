import InputDefault from "@/src/components/inputs/inputDefault";
import { Colors } from "@/src/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { View, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import ButtonDefault from "@/src/components/buttons/buttonDefault";
import { login as loginEmpresa } from "@/src/api/services/authService"

import { Formik } from "formik"
import * as yup from "yup"
import { getToken, saveToken } from "@/src/storage/secureStore";
import { useEffect, useState } from "react";
import CustomLogo from "@/src/components/logo/customLogo";
import { Link } from "expo-router";

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
        validateOnChange={false}
        validateOnBlur={true}      
        onSubmit={ values => {
            login(values.email, values.senha)
        }}>
            {({ 
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit,
                handleBlur
            }) => (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <KeyboardAvoidingView 
                        className="flex-1 w-full px-4 my-4"
                        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                    >
                        <View className="flex-1 flex-col justify-between">
                            <View className="mt-10">
                                <CustomLogo direction="column" title="Bem vindo de volta"/>
                            </View>
                            <View className="my-2">
                                <Text className="text-lg font-bolder text-gray-700">Insira seu email</Text>
                                <InputDefault 
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    Icon={
                                        <MaterialIcons
                                            name="email"
                                            color={Colors.azul}
                                            size={24}
                                        />
                                    }
                                    placeholder="exemplo@gmail.com"
                                    error={errors.email}
                                    autoCapitalize="none"
                                />
                                <Text className="text-lg font-bolder text-gray-700">Insira sua senha</Text>
                                <InputDefault 
                                    value={values.senha}
                                    onChangeText={handleChange("senha")}
                                    onBlur={handleBlur("senha")}
                                    Icon={
                                        <MaterialIcons
                                            name="lock"
                                            color={Colors.azul}
                                            size={24}
                                        />
                                    }
                                    placeholder="******"
                                    error={errors.senha}
                                    autoCapitalize="none"
                                    isPassword={true}
                                />
                                <Link className="text-right" href={"/cadastro"}>Esqueceu sua senha?</Link>
                            </View>
                            <View className="mb-8">
                                <ButtonDefault 
                                    icon={<MaterialIcons name="login" size={24} color={"white"} />}
                                    title="Entrar"
                                    onPress={handleSubmit as any}  // handleSubmit sem 'as any' causa um erro de tipagem, apesar de não afetar o funcionamento
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            )
            }
        </Formik>
    )
}

