import InputDefault from "@/src/components/inputs/inputDefault";
import { Colors } from "@/src/constants/Colors";
import { MaterialIcons, Entypo,  } from "@expo/vector-icons";
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
import ImagePickerButton from "@/src/components/buttons/imagePickerButton";
import { TiposEmpresa } from "@/src/constants/empresa/tipos";
import { categoriasEstabelecimento, categoriasInstituicao } from "@/src/constants/empresa/categorias";
import { Endereco, EnderecoAdd } from "@/src/types/endereco";
import { EmpresaAdd } from "@/src/types/empresa";
import { TipodeArmazenamento, TipodoAlimento } from "@/src/constants/doacoes/tipo";

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
    fotoPerfil: yup.string(),
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

export default function CriarDoacao() {
    const [msg, setMsg] = useState("")
    const router = useRouter()
 
    async function cadastrar() {
        // console.warn(logradouro)
    }

    return (
        <Formik
        initialValues={{
            cnpj: "",
            nome: "",
            email: "",
            senha: "",
            confirmacaoDeSenha: "",
            fotoPerfil: "",
            tipo: 1,
            categoria: 1,
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
            const cadastrar = async () => {
                const enderecoAdd: EnderecoAdd = {
                    cep: values.cep,
                    bairro: values.bairro,
                    logradouro: values.logradouro,
                    cidade: values.cidade,
                    estado: values.estado,
                    pais: values.pais,
                    numero: values.numero,
                    latitude: values.latitude,
                    longitude: values.longitude
                }
                const enderecoResponse = await addEndereco(enderecoAdd)
                const empresaAdd: EmpresaAdd = {
                    cnpj: values.cnpj,
                    nome: values.nome,
                    email: values.email,
                    senha: values.senha,
                    fotoPerfil: values.fotoPerfil ? values.fotoPerfil : undefined,
                    tipo: values.tipo,
                    categoria: values.categoria,
                    enderecoId: enderecoResponse.id
                }
                const empresaResponse = await addEmpresa(empresaAdd)
                console.warn(empresaResponse)
                if(empresaResponse?.status) {
                    setMsg("Cadastrado com sucesso")
                    router.navigate("/login")
                }
                else {
                    setMsg("Erro ao realizar o cadastro")
                }
            }
            cadastrar()
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
                            <Text className="text-lg font-bolder text-gray-700">Nome Doação:</Text>
                            <InputDefault 
                                value={values.cnpj}
                                onChangeText={handleChange("nome-doacao")}
                                onBlur={handleBlur("nome-doacao")}
                                Icon={ 
                                    <MaterialIcons 
                                    name="cake"
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="Bolo de Morango"
                                error={ touched.cnpj ? errors.cnpj : undefined}
                                autoCapitalize="none" 
                                />
                        </View>

                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Descrição de Doação:</Text>
                            <InputDefault 
                                value={values.nome}
                                onChangeText={handleChange("descricaoDoacao")}
                                onBlur={handleBlur("descricaoDoacao")}
                                Icon={ 
                                    <MaterialIcons 
                                    name="description" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="Com calda de morango"
                                error={ touched.nome ? errors.nome : undefined }
                                autoCapitalize="none" 
                                />
                        </View>
                        
                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Observação Doação:</Text>
                            <InputDefault 
                                value={values.email}
                                onChangeText={handleChange("observacaoDoacao")}
                                onBlur={handleBlur("observacaoDoacao")}
                                Icon={ 
                                    <MaterialIcons 
                                    name="search" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="Sem glúten"
                                autoCapitalize="none" 
                                error={ touched.email ? errors.email : undefined }
                                />
                        </View>
                        
                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Data de Fabricação:</Text>
                            <InputDefault 
                                value={values.senha}
                                onChangeText={handleChange("dataFabricacao")}
                                onBlur={handleBlur("dataFabricacao")}
                                Icon={
                                    <MaterialIcons 
                                    name="calendar-month" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="00/00/0000" 
                                error={errors.senha}
                                autoCapitalize="none"
                                dataDetectorTypes={"calendarEvent"}
                                />
                        </View>
                        
                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Data de Validade:</Text>
                            <InputDefault 
                                value={values.confirmacaoDeSenha}
                                onChangeText={handleChange("dataValidade")}
                                onBlur={handleBlur("dataValidade")}
                                Icon={
                                    <MaterialIcons 
                                    name="calendar-month" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="00/00/0000" 
                                error={errors.confirmacaoDeSenha}
                                autoCapitalize="none"
                                />
                        </View>


                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Data máxima para retirada:</Text>
                            <InputDefault 
                                value={values.confirmacaoDeSenha}
                                onChangeText={handleChange("dataValidade")}
                                onBlur={handleBlur("dataValidade")}
                                Icon={
                                    <MaterialIcons 
                                    name="calendar-month" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="00/00/0000" 
                                error={errors.confirmacaoDeSenha}
                                autoCapitalize="none"
                                />
                        </View>

                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Horário mínimo para retirada:</Text>
                            <InputDefault 
                                value={values.confirmacaoDeSenha}
                                onChangeText={handleChange("horarioMinRetirada")}
                                onBlur={handleBlur("horarioMinRetirada")}
                                Icon={
                                    <MaterialIcons 
                                    name="timer" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="00h00m BRT" 
                                error={errors.confirmacaoDeSenha}
                                autoCapitalize="none"
                                />
                        </View>

                         <View>
                            <Text className="text-lg font-bolder text-gray-700">Horário máximo para retirada:</Text>
                            <InputDefault 
                                value={values.confirmacaoDeSenha}
                                onChangeText={handleChange("horarioMaxRetirada")}
                                onBlur={handleBlur("horarioMaxRetirada")}
                                Icon={
                                    <MaterialIcons 
                                    name="timer" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="00h00m BRT" 
                                error={errors.confirmacaoDeSenha}
                                autoCapitalize="none"
                                />
                        </View>

                        <ImagePickerButton callback={(base64) => {
                            if(base64) {
                                setFieldValue("imagemCapa", base64)
                            }
                        }} />

                        <Text className="text-lg font-bolder text-gray-700">Tipo de Alimento:</Text>
                        <PickerDefault values={TipodoAlimento} onChange={(key) => setFieldValue("tipo", key)} />

                        <Text className="text-lg font-bolder text-gray-700">Tipo de Armazenamento:</Text>
                        <PickerDefault values={TipodeArmazenamento} onChange={(key) => setFieldValue("categoria", key)} />

                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Quantidade Doação:</Text>
                            <InputDefault 
                                value={values.cep}
                                
                                onChangeText={handleChange("quantidade")}
                                onBlur={handleBlur("quantidade")}
                                Icon={
                                    <MaterialIcons 
                                    name="monitor-weight"  
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="00000000" 
                                error={errors.cep}
                                autoCapitalize="none"
                                keyboardType="number-pad"
                            />
                        </View>

                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Unidade de Medida (kg,gr,l)</Text>
                            <InputDefault 
                                value={values.numero}
                                onChangeText={handleChange("unidadeMedida")}
                                onBlur={handleBlur("unidadeMedida")}
                                Icon={
                                    <Entypo 
                                    name="ruler" 
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