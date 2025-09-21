import InputDefault from "@/components/inputs/inputDefault"
import { Colors } from "@/src/constants/Colors"
import { MaterialIcons } from "@expo/vector-icons"
import { Formik } from "formik"
import { useRef, useState } from "react"
import { Text, View } from "react-native"
import * as yup from 'yup'
import ButtonDefault from "../../buttons/buttonDefault"
import { Snackbar } from "react-native-paper"
import { Empresa, EmpresaUpdate } from "@/src/types/empresa"
import { updateEmpresa } from "@/src/api/services/empresaServices"
import ImagePickerButton from "../../buttons/imagePickerButton"
import PickerDefault from "../../inputs/pickerDefault"
import { TiposEmpresa } from "@/src/constants/empresa/tipos"
import { categoriasEstabelecimento, categoriasInstituicao } from "@/src/constants/empresa/categorias"
import axios from "axios"
import { addEndereco } from "@/src/api/services/enderecoService"
import { EnderecoAdd } from "@/src/types/endereco"

const schema = yup.object().shape({
    cnpj: yup.string(),
    tipo: yup.number(),
    categoria: yup.number(),
    nome: yup.string(),
    email: yup.string(),
    cep: yup.string(),
    fotoPerfil: yup.string(),
    numero: yup.string(),
    logradouro: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    estado: yup.string(),
    pais: yup.string(),
    complemento: yup.string().notRequired().nullable(),
    latitude: yup.string(),
    longitude: yup.string(),
    enderecoId: yup.string()
})

type Props = {
    empresa: Empresa
}

export default function AlterarDadosForms({ empresa }: Props) {
    const formikRef = useRef(null)
    const [msg, setMsg] = useState("")

    const API_CEP_URL = "https://cep.awesomeapi.com.br/json"

    return (
        <View>
            <Formik
            innerRef={formikRef}
            initialValues={{
                cnpj: empresa.cnpj,
                tipo: empresa.tipo,
                categoria: empresa.categoria,
                nome: empresa.nome,
                email: empresa.email,
                cep: empresa.endereco.cep,
                fotoPerfil: empresa.fotoPerfil ? empresa.fotoPerfil : undefined,
                numero: empresa.endereco.numero,
                logradouro: empresa.endereco.logradouro,
                bairro: empresa.endereco.bairro,
                cidade: empresa.endereco.cidade,
                estado: empresa.endereco.estado,
                pais: empresa.endereco.pais,
                complemento: empresa.endereco.complemento ? empresa.endereco.complemento : null,
                latitude: empresa.endereco.latitude,
                longitude: empresa.endereco.longitude,
            }}
            validationSchema={schema}
            validateOnChange={false}
            validateOnBlur={true}   
            onSubmit={ (values, { resetForm }) => {
                const update = async () => {
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
                    const empresaAdd: EmpresaUpdate = {
                        cnpj: values.cnpj,
                        nome: values.nome,
                        email: values.email,
                        fotoPerfil: values.fotoPerfil ? values.fotoPerfil : undefined,
                        tipo: values.tipo,
                        categoria: values.categoria,
                        enderecoId: enderecoResponse.id
                    }
                    const res = await updateEmpresa(empresaAdd)
                    if(res?.status) {
                        setMsg(res?.message)
                    }
                    
                }
                update()
            }}>
                {({ 
                    values,
                    errors,
                    touched,
                    isValid,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    setFieldValue
                }) => (
                    <View className="m-4">
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

                        <ImagePickerButton callback={(base64) => {
                            if(base64) {
                                setFieldValue("fotoPerfil", base64)
                            }
                        }} />

                        <Text className="text-lg font-bolder text-gray-700">Tipo da empresa:</Text>
                        <PickerDefault values={TiposEmpresa} onChange={(key) => setFieldValue("tipo", key)} />
                        <Text className="text-lg font-bolder text-gray-700">Categoria da empresa:</Text>
                        <PickerDefault values={values.tipo === 1 ? categoriasEstabelecimento : categoriasInstituicao} onChange={(key) => setFieldValue("categoria", key)} />

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
                        <View className="mb-8">
                            <ButtonDefault 
                                icon={<MaterialIcons name="arrow-forward" size={24} color={"white"} />}
                                title="Confirmar"
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