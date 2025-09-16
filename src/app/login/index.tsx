import InputDefault from "@/src/components/inputs/inputDefault";
import { Colors } from "@/src/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { View, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import ButtonDefault from "@/src/components/buttons/buttonDefault";

import { Formik, FormikProps } from "formik"
import * as yup from "yup"
import CustomLogo from "@/src/components/logo/customLogo";
import { Link, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { Snackbar } from "react-native-paper";

const schema = yup.object().shape({
    email: yup.string()
        .email("Deve ser um email válido")
        .required("É necessário digitar seu email"),
    senha: yup.string()
        .required("É necessário digitar sua senha")
})

type loginValues = {
    email: string,
    senha: string
}

export default function Login() {
    const router = useRouter()
    const formikRef = useRef<FormikProps<loginValues>>(null)

    const { loginUser } = useAuth()

    const [msg, setMsg] = useState("")

    async function login(email: string, senha: string) {
        const response = await loginUser({
            email: email,
            senha: senha
        })
        if(response) {
            setMsg(response?.message)
            if(response.status) {
                formikRef.current?.resetForm()
                router.navigate("/dashboard")
            }
        }
    }

    return (
        <View>
            <Formik
            innerRef={formikRef}
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
                    <View className="px-2 flex-col justify-between">
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
                )
                }
            </Formik>
            <Snackbar children={msg} visible={msg.length >= 1} onDismiss={() => { setMsg("") }} duration={2000} />
        </View>
    )
}

