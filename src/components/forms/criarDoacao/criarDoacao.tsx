import React from "react";
import InputDefault from "@/src/components/inputs/inputDefault";
import { Colors } from "@/src/constants/Colors";
import { MaterialIcons, Entypo,  } from "@expo/vector-icons";
import { View, KeyboardAvoidingView, Platform, Text } from "react-native";
import ButtonDefault from "@/src/components/buttons/buttonDefault";

import { Formik } from "formik"
import * as yup from "yup"
import PickerDefault from "@/src/components/inputs/pickerDefault";
import { addDoacao } from "@/src/api/services/doacaoService";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useState } from "react";
import Snackbar from "@/src/components/snackbar/Snackbar";
import ImagePickerButton from "@/src/components/buttons/imagePickerButton";
import { TipodeArmazenamento, TipodoAlimento } from "@/src/constants/doacoes/tipo";
import { DoacaoAdd } from "@/src/types/doacao";
import { useAuth } from "@/src/context/AuthContext";
import { UnidadeMedida } from "@/src/constants/enums";

const schema = yup.object().shape({
  nome: yup.string().required("É necessário digitar o nome da sua doação"),
  descricao: yup.string().required("É necessário digitar a descrição"),
  observacao: yup.string().required("É necessário digitar a observação"),
  dataFabricacao: yup.string().min(10, "Formato: DD/MM/AAAA").required("É necessário digitar a data de fabricação"),
  dataValidade: yup.string().min(10, "Formato: DD/MM/AAAA").required("É necessário digitar a data de validade"),
  dataMaxRetirada: yup.string().min(10, "Formato: DD/MM/AAAA").required("É necessário digitar a data máxima para retirada"),
  horarioMin: yup.string().required("É necessário digitar o horário mínimo para retirada"),
  horarioMax: yup.string().required("É necessário digitar o horário máximo para retirada"),
  tipo: yup.number().required("Selecione o tipo de alimento"),
  categoria: yup.number().required("Selecione o tipo de armazenamento"),
  quantidade: yup.string().required("Informe a quantidade"),
  unidadeMedida: yup.number().required("Informe a unidade de medida"),
  imagemCapa: yup.string(),
})

const unidadesMedidaOptions = [
    { key: UnidadeMedida.KG, value: "Kilogramas (KG)" },
    { key: UnidadeMedida.G, value: "Gramas (G)" },
    { key: UnidadeMedida.L, value: "Litros (L)" },
    { key: UnidadeMedida.ML, value: "Mililitros (ML)" },
]

const convertDateToISO = (dateStr: string) => {
    try {
        const [day, month, year] = dateStr.split("/");
        if (!day || !month || !year) return dateStr;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00Z`;
    } catch (e) {
        return dateStr;
    }
}

export default function CriarDoacao() {
    const [msg, setMsg] = useState("")
    const router = useRouter()
    const { userInfo } = useAuth()

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
                tipo: 1,
                categoria: 1,
                quantidade: "",
                unidadeMedida: UnidadeMedida.KG,
                imagemCapa: "",
            }}
            validationSchema={schema}
            validateOnChange={false}
            validateOnBlur={true} 
            onSubmit={ async (values, { setSubmitting }) => {
                setSubmitting(true);
                try {
                    const doacaoAdd: DoacaoAdd = {
                        nome: values.nome,
                        descricao: values.descricao,
                        observacao: values.observacao,
                        dataFabricacao: convertDateToISO(values.dataFabricacao),
                        dataValidade: convertDateToISO(values.dataValidade),
                        dataCriada: new Date().toISOString(),
                        dataMaxRetirada: convertDateToISO(values.dataMaxRetirada),
                        horarioMin: values.horarioMin,
                        horarioMax: values.horarioMax,
                        tipoAlimento: values.tipo,
                        tipoArmazenamento: values.categoria,
                        empresaDoadoraId: userInfo?.id || "",
                        quantidade: Number(values.quantidade),
                        unidadeMedida: values.unidadeMedida,
                        imagemCapa: values.imagemCapa,
                    }

                    console.log("Enviando doação:", JSON.stringify(doacaoAdd, null, 2));
                    const result = await addDoacao(doacaoAdd);
                    console.log(result);
                    
                    if(result.status) {
                        setMsg("Doação criada com sucesso!");
                        setTimeout(() => {
                            router.replace("/(drawer)/(tabs)/dashboard");
                        }, 2000);
                    } else {
                        setMsg("Erro ao criar doação. Verifique os dados.");
                    }
                } catch (error: any) {
                    console.error("Erro fatal ao cadastrar doação:", error);
                    setMsg("Erro na conexão com o servidor");
                } finally {
                    setSubmitting(false);
                }
            }}>
                {({ 
                    values,
                    errors,
                    touched,
                    isSubmitting,
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
                                        {errors.tipo && <Text className="text-xs text-red-500 ml-1">{errors.tipo}</Text>}
                                    </View>

                                    <View className="gap-2">
                                        <Text className="text-sm font-bold text-azulEscuro ml-1">Armazenamento</Text>
                                        <PickerDefault values={TipodeArmazenamento} onChange={(key) => setFieldValue("categoria", key)} />
                                        {errors.categoria && <Text className="text-xs text-red-500 ml-1">{errors.categoria}</Text>}
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
                                            <PickerDefault values={unidadesMedidaOptions} onChange={(key) => setFieldValue("unidadeMedida", key)} />
                                            {errors.unidadeMedida && (
                                                <Text className="text-xs text-red-500 ml-1 font-medium">{errors.unidadeMedida}</Text>
                                            )}
                                        </View>
                                    </View>
                                </View>

                                <View className="mt-4 mb-10">
                                    <ButtonDefault 
                                        disabled={isSubmitting}
                                        icon={<MaterialIcons name="check-circle" size={24} color="white" />}
                                        title={isSubmitting ? "Enviando..." : "Criar Doação"}
                                        onPress={() => {
                                            if (Object.keys(errors).length > 0) {
                                                setMsg("Por favor, preencha todos os campos corretamente.");
                                            }
                                            handleSubmit();
                                        }}
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