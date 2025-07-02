import InputDefault from "@/components/inputs/inputDefault";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Logo from "@/assets/images/mc_logo_fruteira.svg"
import ButtonDefault from "@/components/buttons/buttonDefault";

import { Formik } from "formik"
import * as yup from "yup"
import { useState } from "react";

const schema = yup.object().shape({
    cnpj: yup.string()
        .matches(
            /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
            'CNPJ inválido'
        )
        .required("É necessário digitar o CNPJ"),
    nome: yup.string()
        .required("É necessário digitar o nome de sua empresa/instituição"),
    email: yup.string()
        .email("Digite um email válido")
        .required("É necessário digitar um email"),
    senha: yup.string()
        .min(8, "Muito curta. Mínimo: 8 caracteres")
        .required("É necessário digitar uma senha"),
    confirmacaoDeSenha: yup.string()
        .min(8, "Muito curta. Mínimo: 8 caracteres")
        .oneOf([yup.ref("senha")], "As senhas devem coincidir")
        .required("É necessário confirmar sua senha")
})

export default function Cadastro() {
    const [tipoEmpresa, setTipoEmpresa] = useState([
        "Doadora",
        "Recebedora"
    ])

    function cadastro(cnpj: string, nome: string, email: string, senha: string) {
        console.log(cnpj, nome, email, senha)
    }

    return (
        <Formik
        initialValues={{
            cnpj: "",
            nome: "",
            email: "",
            senha: "",
            confirmacaoDeSenha: ""
        }}
        validationSchema={schema}
        onSubmit={ values => {
            cadastro(values.cnpj, values.nome, values.email, values.senha)
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
                        <View>
                            <InputDefault 
                                value={values.cnpj}
                                onChangeText={handleChange("cnpj")}
                                Icon={ 
                                    <MaterialIcons 
                                    name="perm-identity" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="000-0000"
                                error={errors.cnpj}
                                autoCapitalize="none" 
                                />
                        </View>
                        
                        <View>
                            <InputDefault 
                                value={values.nome}
                                onChangeText={handleChange("nome")}
                                Icon={ 
                                    <MaterialIcons 
                                    name="account-circle" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="Companhia LTDA."
                                error={errors.nome}
                                autoCapitalize="none" 
                                />
                        </View>
                        
                        <View>
                            <InputDefault 
                                value={values.email}
                                onChangeText={handleChange("email")}
                                Icon={ 
                                    <MaterialIcons 
                                    name="email" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="exemplo@gmail.com"
                                autoCapitalize="none" 
                                error={errors.email}
                                />
                        </View>
                        
                        <View>
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
                        </View>
                        
                        <View>
                            <InputDefault 
                                value={values.confirmacaoDeSenha}
                                onChangeText={handleChange("confirmacaoDeSenha")}
                                Icon={
                                    <MaterialIcons 
                                    name="password" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="******" 
                                error={errors.confirmacaoDeSenha}
                                secureTextEntry={true}
                                autoCapitalize="none"
                                />
                        </View>
                    </View>
                    <View className="">
                        <ButtonDefault 
                            icon={<MaterialIcons name="login" size={24} color={"white"} />}
                            title="Cadastrar"
                            onPress={handleSubmit as any} // handleSubmit sem 'as any' causa um erro de tipagem, apesar de não afetar o funcionamento
                        />
                    </View>
                </KeyboardAvoidingView>
            )
            }
        </Formik>
        
    )
}