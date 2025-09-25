import { getEmpresa } from "@/src/api/services/empresaServices";
import PerfilCard from "@/src/components/perfilCard";
import { useAuth } from "@/src/context/AuthContext";
import { Empresa } from "@/src/types/empresa";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Perfil() {
    const { userInfo, isLoading } = useAuth()
    const { userId } = useLocalSearchParams()
    const [user, setUser] = useState<Empresa>()

    useEffect(() => {
        if(!isLoading && userInfo) {
            const fetch = async () => {
                const res = await getEmpresa(userId ? userId.toString() : userInfo.id)
                setUser(res)
            }
            if(userInfo && userId && userInfo.id !== userId) {
                fetch()
            }
        }
    }, [userId])
    

    if(userInfo && userInfo.id === userId) {
        return (
            <View className="mt-10">
                <PerfilCard user={userInfo} />
            </View>
        )
    }
    else if(userInfo && userId && user && userInfo.id !== userId) {
        return (
            <View className="mt-10">
                <PerfilCard user={user} />
            </View>            
        )
    }
    else if(userId === undefined){
        return (
            <View>
                <Text>Perfil não encontrado</Text>
            </View>
        )
    }
    
}