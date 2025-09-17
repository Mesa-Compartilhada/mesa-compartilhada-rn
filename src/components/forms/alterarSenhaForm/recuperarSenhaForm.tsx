import InputDefault from "@/components/inputs/inputDefault"
import { Colors } from "@/src/constants/Colors"
import { MaterialIcons } from "@expo/vector-icons"
import { Formik, FormikProps } from "formik"
import { useRef, useState } from "react"
import { Text, View } from "react-native"
import * as yup from 'yup'
import ButtonDefault from "../../buttons/buttonDefault"
import { Snackbar } from "react-native-paper"
import { sendToken, updatePassword } from "@/src/api/services/authService"
import { Empresa } from "@/src/types/empresa"

const schemaEmail = yup.object().shape({
    email: yup.string()
        .email()
        .required("Insira seu email")
})

const schemaSenha = yup.object().shape({
    senhaNova: yup.string()
        .required("Insira sua nova senha")
})

const schemaToken = yup.object().shape({
    token: yup.string()
        .min(6, "O token deve ter exatamente 6 caracteres")
        .max(6, "O token deve ter exatamente 6 caracteres")
        .required("Insira o token enviado")
})

type Props = {
    user: Empresa | undefined
}

export default function RecuperarSenhaForm({ user }: Props) {
    const formikRef = useRef(null)
    const [msg, setMsg] = useState("")
    const [page, setPage] = useState(1)

    return (
        <View>
            {
                page === 1
                &&
                <Formik
                innerRef={formikRef}
                initialValues={{
                    email: user?.email
                }}
                validationSchema={schemaEmail}
                validateOnChange={false}
                validateOnBlur={true}   
                onSubmit={ (values, { resetForm }) => {
                    const update = async () => {
                        if(values.email) {
                            let res = await sendToken(values.email)
                            if(res.status) {
                                console.warn(res)
                                setPage(2)
                            }
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
                        handleBlur
                    }) => (
                        <View className="m-4">
                            <Text className="text-lg font-bolder text-gray-700">Insira seu email: </Text>
                            <InputDefault 
                                value={values.email}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                Icon={<MaterialIcons name="email" size={24} color={Colors.azul} />} 
                                defaultValue={user ? user.email : ""}
                                placeholder={"exemplo@email.com"}
                                error={errors.email}
                                autoCapitalize="none"
                            />
                            <ButtonDefault title="Enviar email" 
                                onPress={handleSubmit as any}
                            />
                        </View>
                    )
                    }
                </Formik>
            }
            {
                page === 2
                &&
                <Formik
                innerRef={formikRef}
                initialValues={{
                    token: ""
                }}
                validationSchema={schemaToken}
                validateOnChange={false}
                validateOnBlur={true}   
                onSubmit={ (values, { resetForm }) => {
                    const update = async () => {
                        
                        setPage(3)
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
                        handleBlur
                    }) => (
                        <View className="m-4">
                            <Text className="text-lg font-bolder text-gray-700">Insira o token enviado: </Text>
                            <InputDefault 
                                value={values.token}
                                onChangeText={handleChange("token")}
                                onBlur={handleBlur("token")}
                                Icon={<MaterialIcons name="password" size={24} color={Colors.azul} />}
                                placeholder={"000000"}
                                error={errors.token}
                                autoCapitalize="none"
                            />
                            <View className="flex-row">
                                <ButtonDefault title="Voltar" onPress={() => setPage(1)} />
                                <ButtonDefault title="Avançar" 
                                    onPress={handleSubmit as any}
                                />
                            </View>
                        </View>
                    )
                    }
                </Formik>
            }
            {
                page === 3
                &&
                <Formik
                innerRef={formikRef}
                initialValues={{
                    senhaNova: ""
                }}
                validationSchema={schemaToken}
                validateOnChange={false}
                validateOnBlur={true}   
                onSubmit={ (values, { resetForm }) => {
                    const update = async () => {
                        
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
                        handleBlur
                    }) => (
                        <View className="m-4">
                            <Text className="text-lg font-bolder text-gray-700">Insira sua nova senha: </Text>
                            <InputDefault 
                                value={values.senhaNova}
                                onChangeText={handleChange("senhaNova")}
                                onBlur={handleBlur("senhaNova")}
                                Icon={<MaterialIcons name="password" size={24} color={Colors.azul} />}
                                placeholder={"********"}
                                error={errors.senhaNova}
                                autoCapitalize="none"
                            />
                            <View className="flex-row">
                                <ButtonDefault title="Voltar" onPress={() => setPage(2)} />
                                <ButtonDefault title="Avançar" 
                                    onPress={handleSubmit as any}
                                />
                            </View>
                        </View>
                    )
                    }
                </Formik>
            }
            <Snackbar children={msg} visible={msg.length >= 1} onDismiss={() => { setMsg("") }} duration={2000} />
        </View>
    )
}