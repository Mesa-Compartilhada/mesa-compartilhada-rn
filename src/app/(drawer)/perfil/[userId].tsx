import { getEmpresa } from "@/src/api/services/empresaServices";
import PerfilCard from "@/src/components/perfilCard";
import { useAuth } from "@/src/context/AuthContext";
import { Empresa } from "@/src/types/empresa";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import CustomHeader from "@/src/components/header/customHeader";
import { MaterialIcons } from "@expo/vector-icons";

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
    

    const displayUser = userInfo?.id === userId ? userInfo : user;

    return (
        <ScrollView className="flex-1 bg-branco">
            <CustomHeader 
                icon={<MaterialIcons name="account-circle" size={28} color="#003B5D" />} 
                title={userInfo?.id === userId ? "Meu Perfil" : "Perfil"} 
            />
            
            <View className="py-10">
                {displayUser ? (
                    <PerfilCard user={displayUser} />
                ) : (
                    <View className="flex-1 items-center justify-center p-20">
                        <Text className="text-gray-400 font-bold">Carregando perfil...</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}