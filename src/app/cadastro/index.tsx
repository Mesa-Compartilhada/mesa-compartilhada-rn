import InputDefault from "@/src/components/inputs/inputDefault";
import { Colors } from "@/src/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import ButtonDefault from "@/src/components/buttons/buttonDefault";

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
        validateOnChange={false}
        validateOnBlur={true} 
        onSubmit={ values => {
            cadastro(values.cnpj, values.nome, values.email, values.senha)
        }}>
            {({ 
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleBlur,
                handleSubmit
            }) => (
                <KeyboardAvoidingView 
                    className="flex-1 w-full px-4 my-4"
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}    
                >
                    <View className="flex-1 flex-col justify-between">
                        <View>
                        <View>
                            <InputDefault 
                                value={values.cnpj}
                                onChangeText={handleChange("cnpj")}
                                onBlur={handleBlur("cnpj")}
                                Icon={ 
                                    <MaterialIcons 
                                    name="map"
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="000-0000"
                                error={ touched.cnpj ? errors.cnpj : undefined}
                                autoCapitalize="none" 
                                />
                        </View>
                        
                        <View>
                            <InputDefault 
                                value={values.nome}
                                onChangeText={handleChange("nome")}
                                onBlur={handleBlur("nome")}
                                Icon={ 
                                    <MaterialIcons 
                                    name="account-circle" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="Companhia LTDA."
                                error={ touched.nome ? errors.nome : undefined }
                                autoCapitalize="none" 
                                />
                        </View>
                        
                        <View>
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
                                autoCapitalize="none" 
                                error={ touched.email ? errors.email : undefined }
                                />
                        </View>
                        
                        <View>
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
                                error={errors.senha}
                                autoCapitalize="none"
                                isPassword={true}
                                />
                        </View>
                        
                        <View>
                            <InputDefault 
                                value={values.confirmacaoDeSenha}
                                onChangeText={handleChange("confirmacaoDeSenha")}
                                onBlur={handleBlur("confirmacaoDeSenha")}
                                Icon={
                                    <MaterialIcons 
                                    name="password" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="******" 
                                error={errors.confirmacaoDeSenha}
                                autoCapitalize="none"
                                isPassword={true}
                                />
                        </View>
                        </View>
                    </View>
                    <View className="mb-8">
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