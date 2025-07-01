import { View } from "react-native"
import ButtonDefault from "@/components/buttons/buttonDefault"
import { navigate } from "expo-router/build/global-state/routing"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import Logo from "@/assets/images/mc_logo_fruteira.svg"

export default function Home() {
    return (
        <View className="p-6 gap-4 justify-center flex-1">
            <Logo className="my-auto" width={100} height={100} />
            <ButtonDefault 
                icon={<MaterialIcons 
                name="login" size={24} 
                color={"white"} />} 
                title="Login" 
                onPress={() => navigate("/login")} />
            <ButtonDefault icon={<MaterialCommunityIcons name="account" size={24} color={"white"} />} title="Cadastro" onPress={() => navigate("/cadastro")} />
        </View>
    )
}