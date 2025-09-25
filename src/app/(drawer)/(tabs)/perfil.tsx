import { getEmpresa } from "@/src/api/services/empresaServices";
import PerfilCard from "@/src/components/perfilCard";
import { useAuth } from "@/src/context/AuthContext";
import { Text, View } from "react-native";

export default function Perfil() {
    const { userInfo, isLoading } = useAuth()
    
    if(userInfo && !isLoading) {
        return (
            <View className="mt-10">
                <PerfilCard user={userInfo} />
            </View>
        )
    }
    else if(userInfo === undefined){
        return (
            <View>
                <Text>Perfil não encontrado</Text>
            </View>
        )
    }
    
}