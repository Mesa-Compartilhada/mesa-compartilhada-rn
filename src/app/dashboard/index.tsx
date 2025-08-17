import { DoacoesList } from "@/src/components/doacoesList/doacoesList";
import { useAuth } from "@/src/context/AuthContext";
import { Text, View } from "react-native";

export default function Dashboard() {

    const { userInfo } = useAuth()

    return (
        <View>
            <Text>Olá, { userInfo?.nome }</Text>    
            <DoacoesList filters={ { status: [ "DISPONIVEL" ] } } />
        </View>
        
    )
}