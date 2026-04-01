import React from "react";
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
        <View className="flex-1 bg-branco">
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
                        className="flex-1"
                        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}    
                    >
                        <ScrollView 
                            className="flex-1" 
                            contentContainerStyle={{ padding: 24, gap: 24 }}
                        >
                            <View className="gap-6">
                                <View className="gap-2">
                                    <Text className="text-lg font-bold text-azulEscuro ml-1">Informações Básicas</Text>
                                    <View className="gap-4 bg-azul/5 p-4 rounded-3xl border border-azul/10">
                                        <View className="gap-1">
                                            <Text className="text-sm font-semibold text-gray-500 ml-1">Nome da Doação</Text>
                                            <InputDefault 
                                                value={values.nome}
                                                onChangeText={handleChange("nome")}
                                                onBlur={handleBlur("nome")}
                                                Icon={<MaterialIcons name="cake" color="#62C0C0" size={24} />} 
                                                placeholder="Ex: Bolo de Morango"
                                                error={ touched.nome ? errors.nome : undefined}
                                            />
                                        </View>
                                        <View className="gap-1">
                                            <Text className="text-sm font-semibold text-gray-500 ml-1">Descrição</Text>
                                            <InputDefault 
                                                value={values.descricao}
                                                onChangeText={handleChange("descricao")}
                                                onBlur={handleBlur("descricao")}
                                                Icon={<MaterialIcons name="description" color="#62C0C0" size={24} />} 
                                                placeholder="Ex: Com calda de morango"
                                                error={ touched.descricao ? errors.descricao : undefined }
                                            />
                                        </View>
                                        <View className="gap-1">
                                            <Text className="text-sm font-semibold text-gray-500 ml-1">Observações</Text>
                                            <InputDefault 
                                                value={values.observacao}
                                                onChangeText={handleChange("observacao")}
                                                onBlur={handleBlur("observacao")}
                                                Icon={<MaterialIcons name="info" color="#62C0C0" size={24} />} 
                                                placeholder="Ex: Sem glúten"
                                                error={ touched.observacao ? errors.observacao : undefined }
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View className="gap-2">
                                    <Text className="text-lg font-bold text-azulEscuro ml-1">Datas e Prazos</Text>
                                    <View className="gap-4 bg-azul/5 p-4 rounded-3xl border border-azul/10">
                                        <View className="flex-row gap-4">
                                            <View className="flex-1 gap-1">
                                                <Text className="text-sm font-semibold text-gray-500 ml-1">Fabricação</Text>
                                                <InputDefault 
                                                    value={values.dataFabricacao}
                                                    onChangeText={handleChange("dataFabricacao")}
                                                    onBlur={handleBlur("dataFabricacao")}
                                                    Icon={<MaterialIcons name="calendar-today" color="#62C0C0" size={20} />} 
                                                    placeholder="DD/MM/AAAA" 
                                                    error={errors.dataFabricacao}
                                                />
                                            </View>
                                            <View className="flex-1 gap-1">
                                                <Text className="text-sm font-semibold text-gray-500 ml-1">Validade</Text>
                                                <InputDefault 
                                                    value={values.dataValidade}
                                                    onChangeText={handleChange("dataValidade")}
                                                    onBlur={handleBlur("dataValidade")}
                                                    Icon={<MaterialIcons name="event" color="#62C0C0" size={20} />} 
                                                    placeholder="DD/MM/AAAA" 
                                                    error={errors.dataValidade}
                                                />
                                            </View>
                                        </View>
                                        <View className="gap-1">
                                            <Text className="text-sm font-semibold text-gray-500 ml-1">Limite para Retirada</Text>
                                            <InputDefault 
                                                value={values.dataMaxRetirada}
                                                onChangeText={handleChange("dataMaxRetirada")}
                                                onBlur={handleBlur("dataMaxRetirada")}
                                                Icon={<MaterialIcons name="access-alarm" color="#62C0C0" size={24} />} 
                                                placeholder="DD/MM/AAAA" 
                                                error={errors.dataMaxRetirada}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View className="gap-2">
                                    <Text className="text-lg font-bold text-azulEscuro ml-1">Horários de Retirada</Text>
                                    <View className="flex-row gap-4 bg-azul/5 p-4 rounded-3xl border border-azul/10">
                                        <View className="flex-1 gap-1">
                                            <Text className="text-sm font-semibold text-gray-500 ml-1">De</Text>
                                            <InputDefault 
                                                value={values.horarioMin}
                                                onChangeText={handleChange("horarioMin")}
                                                onBlur={handleBlur("horarioMin")}
                                                Icon={<MaterialIcons name="timer" color="#62C0C0" size={20} />} 
                                                placeholder="08:00" 
                                                error={errors.horarioMin}
                                            />
                                        </View>
                                        <View className="flex-1 gap-1">
                                            <Text className="text-sm font-semibold text-gray-500 ml-1">Até</Text>
                                            <InputDefault 
                                                value={values.horarioMax}
                                                onChangeText={handleChange("horarioMax")}
                                                onBlur={handleBlur("horarioMax")}
                                                Icon={<MaterialIcons name="timer-off" color="#62C0C0" size={20} />} 
                                                placeholder="18:00" 
                                                error={errors.horarioMax}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View className="gap-4">
                                    <ImagePickerButton callback={(base64) => {
                                        if(base64) {
                                            setFieldValue("imagemCapa", base64)
                                        }
                                    }} />

                                    <View className="gap-2">
                                        <Text className="text-sm font-bold text-azulEscuro ml-1">Tipo de Alimento</Text>
                                        <PickerDefault values={TipodoAlimento} onChange={(key) => setFieldValue("tipo", key)} />
                                    </View>

                                    <View className="gap-2">
                                        <Text className="text-sm font-bold text-azulEscuro ml-1">Armazenamento</Text>
                                        <PickerDefault values={TipodeArmazenamento} onChange={(key) => setFieldValue("categoria", key)} />
                                    </View>
                                </View>

                                <View className="gap-2">
                                    <Text className="text-lg font-bold text-azulEscuro ml-1">Quantidade e Medida</Text>
                                    <View className="flex-row gap-4 bg-azul/5 p-4 rounded-3xl border border-azul/10">
                                        <View className="flex-1 gap-1">
                                            <Text className="text-sm font-semibold text-gray-500 ml-1">Valor</Text>
                                            <InputDefault 
                                                value={values.quantidade}
                                                onChangeText={handleChange("quantidade")}
                                                onBlur={handleBlur("quantidade")}
                                                Icon={<MaterialIcons name="monitor-weight" color="#62C0C0" size={20} />} 
                                                placeholder="Ex: 10" 
                                                error={errors.quantidade}
                                                keyboardType="number-pad"
                                            />
                                        </View>
                                        <View className="flex-1 gap-1">
                                            <Text className="text-sm font-semibold text-gray-500 ml-1">Unidade</Text>
                                            <InputDefault 
                                                value={values.unidadeMedida}
                                                onChangeText={handleChange("unidadeMedida")}
                                                onBlur={handleBlur("unidadeMedida")}
                                                Icon={<Entypo name="ruler" color="#62C0C0" size={20} />} 
                                                placeholder="Ex: kg" 
                                                error={errors.unidadeMedida}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View className="mt-4 mb-10">
                                    <ButtonDefault 
                                        icon={<MaterialIcons name="check-circle" size={24} color="white" />}
                                        title="Criar Doação"
                                        onPress={handleSubmit as any}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                        <Snackbar children={msg} visible={msg.length >= 1} onDismiss={() => { setMsg("") }} />
                    </KeyboardAvoidingView>
                )
                }
            </Formik>
        </View>
    )
}