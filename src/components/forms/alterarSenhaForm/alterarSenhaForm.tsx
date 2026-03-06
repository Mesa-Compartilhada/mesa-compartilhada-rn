import InputDefault from "@/src/components/inputs/inputDefault"
import { Colors } from "@/src/constants/Colors"
import { MaterialIcons } from "@expo/vector-icons"
import { Formik, FormikProps } from "formik"
import { useRef, useState } from "react"
import { Text, View } from "react-native"
import * as yup from 'yup'
import ButtonDefault from "../../buttons/buttonDefault"
import { Snackbar } from "react-native-paper"
import { updatePassword } from "@/src/api/services/authService"

const schema = yup.object().shape({
    senhaAtual: yup.string()
        .required("É necessário digitar sua senha"),
    senhaNova: yup.string()
        .required("É necessário confirmar sua senha")
})

type updatePassword = {
    senhaAtual: string,
    senhaNova: string
}

export default function AlterarSenhaForm() {
    const formikRef = useRef<FormikProps<updatePassword>>(null)
    const [msg, setMsg] = useState("")

    return (
        <View>
            <Formik
            innerRef={formikRef}
            initialValues={{
                senhaAtual: "",
                senhaNova: ""
            }}
            validationSchema={schema}
            validateOnChange={false}
            validateOnBlur={true}   
            onSubmit={ (values, { resetForm }) => {
                const update = async () => {
                    const res = await updatePassword(values)
                    setMsg(res.message)
                    if(res.status) {
                        resetForm()
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
                        <View className="my-2">
                            <Text className="text-lg font-bolder text-gray-700">Insira sua senha atual:</Text>
                            <InputDefault 
                                value={values.senhaAtual}
                                onChangeText={handleChange("senhaAtual")}
                                onBlur={handleBlur("senhaAtual")}
                                Icon={
                                    <MaterialIcons
                                        name="password"
                                        color={Colors.azul}
                                        size={24}
                                    />
                                }
                                placeholder="********"
                                textContentType="password"
                                error={errors.senhaAtual}
                                autoCapitalize="none"
                                secureTextEntry
                                passwordRules={"minlength: 8;"}
                            />
                            <Text className="text-lg font-bolder text-gray-700">Insira sua senha nova</Text>
                            <InputDefault 
                                value={values.senhaNova}
                                onChangeText={handleChange("senhaNova")}
                                onBlur={handleBlur("senhaNova")}
                                Icon={
                                    <MaterialIcons
                                        name="password"
                                        color={Colors.azul}
                                        size={24}
                                    />
                                }
                                placeholder="********"
                                textContentType="password"
                                error={errors.senhaNova}
                                autoCapitalize="none"
                                secureTextEntry
                                passwordRules={"minlength: 8;"}
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