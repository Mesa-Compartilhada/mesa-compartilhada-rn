import InputDefault from "@/src/components/inputs/inputDefault";
import { Colors } from "@/src/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { View, KeyboardAvoidingView, Platform, Text } from "react-native";
import ButtonDefault from "@/src/components/buttons/buttonDefault";

import { Formik } from "formik"
import * as yup from "yup"
import PickerDefault from "@/src/components/inputs/pickerDefault";
import axios from "axios";
import { addEndereco } from "@/src/api/services/enderecoService";
import { addEmpresa } from "@/src/api/services/empresaServices";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useState } from "react";
import Snackbar from "@/src/components/snackbar/Snackbar";

const API_CEP_URL = "https://cep.awesomeapi.com.br/json"

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
        .required("É necessário confirmar sua senha"),
    tipo: yup.number()
        .required("Selecione o tipo de empresa"),
    categoria: yup.number()
        .required("Selecione a categoria de empresa"),
    cep: yup.string()
        .required(""),
    numero: yup.string(),
    logradouro: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    estado: yup.string(),
    pais: yup.string(),
    complemento: yup.string(),
    latitude: yup.string(),
    longitude: yup.string()
})

export default function Cadastro() {
    const [msg, setMsg] = useState("")
    const router = useRouter()

    const tiposEmpresa = [
        { key: "1", value: "Doadora" },
        { key: "2", value: "Recebedora" }
    ]
    
    const categoriasInstituicao = [
        { key: "1", value: "ONG" },
        { key: "2", value: "OSC" },
        { key: "3", value: "Religiosa" },
        { key: "4", value: "Banco de alimentos" },
    ]
    
    const categoriasEstabelecimento = [
        { key: "1", value: "Restaurante" },
        { key: "2", value: "Hortifrutti" },
        { key: "3", value: "Mercado" },
        { key: "4", value: "Padaria" },
        { key: "5", value: "Fastfood" },
        { key: "6", value: "Adega" }
    ]
 
    async function cadastro(
        cnpj: string,
        nome: string,
        email: string,
        senha: string,
        tipo: string,
        categoria: string,
        cep: string,
        numero: string,
        logradouro: string,
        bairro: string,
        cidade: string,
        estado: string,
        pais: string,
        latitude: number,
        longitude: number
    ) {
        const enderecoResponse = await addEndereco({ cep, numero, logradouro, bairro, cidade, estado, pais, latitude, longitude })
        const empresaResponse = await addEmpresa({ cnpj, nome, email, senha, tipo: parseInt(tipo), categoria: parseInt(categoria), enderecoId: enderecoResponse.id })
        if(empresaResponse?.status) {
            setMsg("Cadastrado com sucesso")
            router.navigate("/login")
        }
        else {
            setMsg("Erro ao realizar o cadastro")
        }
    }

    return (
        <Formik
        initialValues={{
            cnpj: "",
            nome: "",
            email: "",
            senha: "",
            confirmacaoDeSenha: "",
            tipo: "1",
            categoria: "1",
            cep: "",
            numero: "",
            logradouro: "",
            bairro: "",
            cidade: "",
            estado: "",
            pais: "",
            complemento: "",
            latitude: 0,
            longitude: 0
        }}
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={true} 
        onSubmit={ values => {
            cadastro(
                values.cnpj,
                values.nome,
                values.email,
                values.senha,
                values.tipo,
                values.categoria,
                values.cep,
                values.numero,
                values.logradouro,
                values.bairro,
                values.cidade,
                values.estado,
                values.pais,
                values.latitude,
                values.longitude
            )
        }}>
            {({ 
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue
            }) => (
                <KeyboardAvoidingView 
                    className="flex-1 w-full px-4"
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}    
                >
                    <ScrollView className="flex-1 flex-col p-4">
                        <View>
                            <Text className="text-lg font-bolder text-gray-700">CNPJ:</Text>
                            <InputDefault 
                                value={values.cnpj}
                                onChangeText={handleChange("cnpj")}
                                onBlur={handleBlur("cnpj")}
                                Icon={ 
                                    <MaterialIcons 
                                    name="map"
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="00.000.000/0000-00"
                                error={ touched.cnpj ? errors.cnpj : undefined}
                                autoCapitalize="none" 
                                />
                        </View>

                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Nome fantasia:</Text>
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
                            <Text className="text-lg font-bolder text-gray-700">Email:</Text>
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
                            <Text className="text-lg font-bolder text-gray-700">Senha:</Text>
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
                            <Text className="text-lg font-bolder text-gray-700">Confirme sua senha:</Text>
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

                        <Text className="text-lg font-bolder text-gray-700">Tipo da empresa:</Text>
                        <PickerDefault values={tiposEmpresa} onChange={(key) => setFieldValue("tipo", key)} />
                        <Text className="text-lg font-bolder text-gray-700">Categoria da empresa:</Text>
                        <PickerDefault values={values.tipo === "1" ? categoriasEstabelecimento : categoriasInstituicao} onChange={(key) => setFieldValue("categoria", key)} />

                        <View>
                            <Text className="text-lg font-bolder text-gray-700">CEP:</Text>
                            <InputDefault 
                                value={values.cep}
                                onChange={async (e) => {
                                    if(e.nativeEvent.text.length === 8) {
                                        try {
                                            const response = await axios.get(`${API_CEP_URL}/${e.nativeEvent.text}`)
                                            setFieldValue("logradouro", response.data.address)
                                            setFieldValue("bairro", response.data.district)
                                            setFieldValue("cidade", response.data.city)
                                            setFieldValue("estado", response.data.state)
                                            setFieldValue("pais", "Brasil")
                                            setFieldValue("latitude", parseFloat(response.data.lat))
                                            setFieldValue("longitude", parseFloat(response.data.lng))
                                        } catch(error) {
                                            console.warn(error)
                                        }
                                    }
                                }}
                                onChangeText={handleChange("cep")}
                                onBlur={handleBlur("cep")}
                                Icon={
                                    <MaterialIcons 
                                    name="location-city" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="00000000" 
                                error={errors.cep}
                                autoCapitalize="none"
                                keyboardType="number-pad"
                            />
                        </View>

                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Número</Text>
                            <InputDefault 
                                value={values.numero}
                                onChangeText={handleChange("numero")}
                                onBlur={handleBlur("numero")}
                                Icon={
                                    <MaterialIcons 
                                    name="home" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="000" 
                                error={errors.numero}
                                autoCapitalize="none"
                                />
                        </View>
                    </ScrollView>
                    <View className="mb-8">
                        <ButtonDefault 
                            icon={<MaterialIcons name="login" size={24} color={"white"} />}
                            title="Cadastrar"
                            onPress={handleSubmit as any} // handleSubmit sem 'as any' causa um erro de tipagem, apesar de não afetar o funcionamento
                        />
                    </View>
                    <Snackbar children={msg} visible={msg.length >= 1} onDismiss={() => { setMsg("") }} />
                </KeyboardAvoidingView>
            )
            }
        </Formik>
        
    )
}