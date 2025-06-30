import InputDefault from "@/components/inputs/inputDefault";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import Logo from "@/assets/images/mc_logo_fruteira.svg"
import ButtonDefault from "@/components/buttons/buttonDefault";

import { Formik } from "formik"
import * as yup from "yup"

const schema = yup.object().shape({
    email: yup.string()
        .email("Deve ser um email válido")
        .required("É necessário digitar seu email"),
    senha: yup.string()
        .required("É necessário digitar sua senha")
})

export default function Login() {
    function login(email: string, senha: string) {
        console.log(email, senha)
    }

    return (
        <Formik
        initialValues={{
            email: "",
            senha: ""
        }}
        validationSchema={schema}
        onSubmit={ values => {
            login(values.email, values.senha)
        }}>
            {({ 
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit
            }) => (
                <View className="flex-1 self-center justify-center gap-4">        
                    <View className="self-center">
                        <Logo width={150} />
                    </View>
                    <InputDefault 
                        value={values.email}
                        onChangeText={handleChange("email")}
                        Icon={ 
                            <MaterialIcons 
                            name="email" 
                            color={Colors.azul} 
                        size={24} />} 
                        placeholder="exemplo@gmail.com"
                        autoCapitalize="none" 
                        />
                    <Text className="text-xs text-red-700">
                        { errors.email }
                    </Text>
                    <InputDefault 
                        value={values.senha}
                        onChangeText={handleChange("senha")}
                        Icon={
                            <MaterialIcons 
                            name="password" 
                            color={Colors.azul} 
                        size={24} />} 
                        placeholder="******" 
                        secureTextEntry={true}
                        autoCapitalize="none"
                        />
                    <Text className="text-xs text-red-700">
                        { errors.senha }
                    </Text>
                    <View className="mr-auto">
                        <ButtonDefault 
                            icon={<MaterialIcons name="login" size={24} color={"white"} />}
                            title="Entrar"
                            onPress={handleSubmit as any} // handleSubmit sem 'as any' causa um erro de tipagem, apesar de não afetar o funcionamento
                        />
                    </View>
                </View>
            )
            }
        </Formik>
    )
}