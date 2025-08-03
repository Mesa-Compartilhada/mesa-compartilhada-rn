import { Text, View } from "react-native"
import ButtonDefault from "@/src/components/buttons/buttonDefault"
import { navigate } from "expo-router/build/global-state/routing"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import  CustomLogo from "@/src/components/logo/customLogo"
import Logo from "@/src/assets/images/mc_logo_fruteira.svg"
export default function Home() {
    return (
        <View className="p-6 gap-4 justify-center flex-1">
            <CustomLogo icon={<Logo />} title="Mesa Compartilhada" direction="column"/>
            <Text className="text-lg text-center">Faça login ou crie uma conta para continuar</Text>
            <ButtonDefault 
                icon={<MaterialIcons
                    name="login" size={24}
                    color={"white"} />}
                title="Entrar"
                onPress={() => navigate("/login")}  />
            <ButtonDefault icon={<MaterialCommunityIcons name="account" size={24} color={"white"} />} title="Criar conta" onPress={() => navigate("/cadastro")} />
            
        </View>
    )
}