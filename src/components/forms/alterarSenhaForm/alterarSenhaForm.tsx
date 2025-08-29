import InputDefault from "@/components/inputs/inputDefault"
import { Colors } from "@/src/constants/Colors"
import { MaterialIcons } from "@expo/vector-icons"
import { Formik, FormikProps } from "formik"
import { useRef } from "react"
import { Text, View } from "react-native"
import * as yup from 'yup'
import ButtonDefault from "../../buttons/buttonDefault"

const schema = yup.object().shape({
    senha: yup.string()
        .required("É necessário digitar sua senha"),
    confirmaSenha: yup.string()
        .required("É necessário confirmar sua senha")
})

type updatePassword = {
    senha: string,
    confirmaSenha: string
}

export default function AlterarSenhaForm() {
    const formikRef = useRef<FormikProps<updatePassword>>(null)

    return (
        <Formik
        innerRef={formikRef}
        initialValues={{
            senha: "",
            confirmaSenha: ""
        }}
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={true}      
        onSubmit={ values => {
            console.warn(values)
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
                        <Text className="text-lg font-bolder text-gray-700">Insira sua senha:</Text>
                        <InputDefault 
                            value={values.senha}
                            onChangeText={handleChange("senha")}
                            onBlur={handleBlur("senha")}
                            Icon={
                                <MaterialIcons
                                    name="password"
                                    color={Colors.azul}
                                    size={24}
                                />
                            }
                            placeholder="********"
                            textContentType="password"
                            error={errors.senha}
                            autoCapitalize="none"
                            secureTextEntry
                            passwordRules={"minlength: 8;"}
                        />
                        <Text className="text-lg font-bolder text-gray-700">Confirme sua senha</Text>
                        <InputDefault 
                            value={values.confirmaSenha}
                            onChangeText={handleChange("confirmaSenha")}
                            onBlur={handleBlur("confirmaSenha")}
                            Icon={
                                <MaterialIcons
                                    name="password"
                                    color={Colors.azul}
                                    size={24}
                                />
                            }
                            placeholder="********"
                            textContentType="password"
                            error={errors.senha}
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
    )
}