import PerfilCard from "@/src/components/perfilCard";
import BaseSkeleton from "@/src/components/skeletons/CustomLoader";
import { useAuth } from "@/src/context/AuthContext";
import { Text, View } from "react-native";

export default function Perfil() {
    const { userInfo, isLoading } = useAuth()
    
    if(isLoading) {
        return (
            <View className="gap-2 items-center mt-auto mb-auto">
                <BaseSkeleton w="50" h="50" />
                <BaseSkeleton w="150" h="100" />
                <BaseSkeleton w="150" h="50" />
            </View>
        )
    }

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