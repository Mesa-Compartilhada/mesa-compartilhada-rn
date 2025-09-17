import ButtonDefault from "@/src/components/buttons/buttonDefault";
import ButtonMenus from "@/src/components/buttons/buttonMenus";
import { useAuth } from "@/src/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Configuracoes() {
    const { userInfo, isLoading } = useAuth()
    const router = useRouter()

    if(!isLoading && userInfo !== null) {
        return (
            <View className="gap-4 m-4">
                <ButtonMenus icon={<MaterialIcons name="account-circle" size={36} color={"gray"} />} title="Conta" onPress={() => {
                    router.navigate("/conta")
                }} />
                <ButtonMenus icon={<MaterialIcons name="password" size={36} color={"gray"} />} title="Esqueci minha senha" onPress={() => {
                    router.push({pathname: "/recuperar-senha", params: userInfo.email })
                }}/>
                <ButtonMenus icon={<MaterialIcons name="accessibility-new" size={36} color={"gray"} />} title="Acessibilidade" />
                <ButtonMenus icon={<MaterialIcons name="info" size={36} color={"gray"} />} title="Sobre e suporte" />
            </View>
        )
    }
}