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
  nome: yup.string().required("É necessário digitar o nome da sua doação"),
  descricao: yup.string().required("É necessário digitar a descrição"),
  observacao: yup.string().required("É necessário digitar a observação"),
  dataFabricacao: yup.string().min(8, "Muito curta. Mínimo: 8 caracteres").required("É necessário digitar a data de fabricação"),
  dataValidade: yup.string().min(8, "Muito curta. Mínimo: 8 caracteres").required("É necessário digitar a data de validade"),
  dataMaxRetirada: yup.string().min(8, "Muito curta. Mínimo: 8 caracteres").required("É necessário digitar a data máxima para retirada"),
  horarioMin: yup.string().required("É necessário digitar o horário mínimo para retirada"),
  horarioMax: yup.string().required("É necessário digitar o horário máximo para retirada"),
  tipo: yup.number().required("Selecione o tipo de alimento"),
  categoria: yup.number().required("Selecione o tipo de armazenamento"),
  quantidade: yup.string().required("Informe a quantidade"),
  unidadeMedida: yup.string().required("Informe a unidade de medida"),
  imagemCapa: yup.string(),
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
            nome: "",
            descricao: "",
            observacao: "",
            dataFabricacao: "",
            dataValidade: "",
            dataMaxRetirada: "",
            horarioMin: "",
            horarioMax: "",
            tipo: 0,
            categoria: 0,
            quantidade: "",
            unidadeMedida: "",
            imagemCapa: "",
        }}
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={true} 
        onSubmit={ values => {
            const cadastrar = async () => {
               
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
                                value={values.nome}
                                onChangeText={handleChange("nome-doacao")}
                                onBlur={handleBlur("nome-doacao")}
                                Icon={ 
                                    <MaterialIcons 
                                    name="cake"
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="Bolo de Morango"
                                error={ touched.nome ? errors.nome : undefined}
                                autoCapitalize="none" 
                                />
                        </View>

                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Descrição de Doação:</Text>
                            <InputDefault 
                                value={values.descricao}
                                onChangeText={handleChange("descricaoDoacao")}
                                onBlur={handleBlur("descricaoDoacao")}
                                Icon={ 
                                    <MaterialIcons 
                                    name="description" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="Com calda de morango"
                                error={ touched.descricao ? errors.descricao : undefined }
                                autoCapitalize="none" 
                                />
                        </View>
                        
                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Observação Doação:</Text>
                            <InputDefault 
                                value={values.observacao}
                                onChangeText={handleChange("observacaoDoacao")}
                                onBlur={handleBlur("observacaoDoacao")}
                                Icon={ 
                                    <MaterialIcons 
                                    name="search" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="Sem glúten"
                                autoCapitalize="none" 
                                error={ touched.observacao ? errors.observacao : undefined }
                                />
                        </View>
                        
                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Data de Fabricação:</Text>
                            <InputDefault 
                                value={values.dataFabricacao}
                                onChangeText={handleChange("dataFabricacao")}
                                onBlur={handleBlur("dataFabricacao")}
                                Icon={
                                    <MaterialIcons 
                                    name="calendar-month" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="00/00/0000" 
                                error={errors.dataFabricacao}
                                autoCapitalize="none"
                                dataDetectorTypes={"calendarEvent"}
                                />
                        </View>
                        
                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Data de Validade:</Text>
                            <InputDefault 
                                value={values.dataValidade}
                                onChangeText={handleChange("dataValidade")}
                                onBlur={handleBlur("dataValidade")}
                                Icon={
                                    <MaterialIcons 
                                    name="calendar-month" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="00/00/0000" 
                                error={errors.dataValidade}
                                autoCapitalize="none"
                                />
                        </View>


                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Data máxima para retirada:</Text>
                            <InputDefault 
                                value={values.dataMaxRetirada}
                                onChangeText={handleChange("dataValidade")}
                                onBlur={handleBlur("dataValidade")}
                                Icon={
                                    <MaterialIcons 
                                    name="calendar-month" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="00/00/0000" 
                                error={errors.dataMaxRetirada}
                                autoCapitalize="none"
                                />
                        </View>

                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Horário mínimo para retirada:</Text>
                            <InputDefault 
                                value={values.horarioMin}
                                onChangeText={handleChange("horarioMinRetirada")}
                                onBlur={handleBlur("horarioMinRetirada")}
                                Icon={
                                    <MaterialIcons 
                                    name="timer" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="00h00m BRT" 
                                error={errors.horarioMin}
                                autoCapitalize="none"
                                />
                        </View>

                         <View>
                            <Text className="text-lg font-bolder text-gray-700">Horário máximo para retirada:</Text>
                            <InputDefault 
                                value={values.horarioMax}
                                onChangeText={handleChange("horarioMaxRetirada")}
                                onBlur={handleBlur("horarioMaxRetirada")}
                                Icon={
                                    <MaterialIcons 
                                    name="timer" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="00h00m BRT" 
                                error={errors.horarioMax}
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
                                value={values.quantidade}
                                
                                onChangeText={handleChange("quantidade")}
                                onBlur={handleBlur("quantidade")}
                                Icon={
                                    <MaterialIcons 
                                    name="monitor-weight"  
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="00000000" 
                                error={errors.quantidade}
                                autoCapitalize="none"
                                keyboardType="number-pad"
                            />
                        </View>

                        <View>
                            <Text className="text-lg font-bolder text-gray-700">Unidade de Medida (kg,gr,l)</Text>
                            <InputDefault 
                                value={values.unidadeMedida}
                                onChangeText={handleChange("unidadeMedida")}
                                onBlur={handleBlur("unidadeMedida")}
                                Icon={
                                    <Entypo 
                                    name="ruler" 
                                    color={Colors.azul} 
                                size={24} />} 
                                placeholder="000" 
                                error={errors.unidadeMedida}
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