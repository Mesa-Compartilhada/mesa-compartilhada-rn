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
            <View className="flex-1 bg-branco px-6 py-8 gap-4">
                <Text className="text-sm font-bold text-azul uppercase tracking-widest ml-1 mb-2">Preferências</Text>
                
                <ButtonMenus 
                    icon={<MaterialIcons name="account-circle" size={24} color="#003B5D" />} 
                    title="Dados da Conta" 
                    onPress={() => {
                        router.navigate("/conta")
                    }} 
                />
                
                <ButtonMenus 
                    icon={<MaterialIcons name="lock" size={24} color="#003B5D" />} 
                    title="Segurança e Senha" 
                    onPress={() => {
                        router.push({pathname: "/recuperar-senha", params: userInfo.email as any })
                    }}
                />
                
                <View className="mt-6 mb-2">
                    <Text className="text-sm font-bold text-azul uppercase tracking-widest ml-1">Geral</Text>
                </View>

                <ButtonMenus 
                    icon={<MaterialIcons name="accessibility-new" size={24} color="#003B5D" />} 
                    title="Acessibilidade" 
                />
                
                <ButtonMenus 
                    icon={<MaterialIcons name="info" size={24} color="#003B5D" />} 
                    title="Sobre e Suporte" 
                />
            </View>
        )
    }
}