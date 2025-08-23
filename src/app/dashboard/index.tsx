import { DoacoesList } from "@/src/components/doacoesList/doacoesList";
import { useAuth } from "@/src/context/AuthContext";
import { Text, View } from "react-native";

export default function Dashboard() {

    const { isLoggedIn, userInfo } = useAuth()

    if(isLoggedIn && userInfo && userInfo.tipo === "DOADORA") {
        return (
            <View className="p-2">
                <Text className="text-2xl">Suas doações em andamento</Text>
                <DoacoesList filters={ { status: [ "ANDAMENTO" ], empresaDoadoraId: userInfo.id } } />
            </View>
        )
    }
    else if(isLoggedIn && userInfo && userInfo.tipo === "RECEBEDORA") {
        return (
            <View className="p-2">
                <Text className="text-2xl">Doação que você solicitou</Text>
                <DoacoesList filters={ { status: [ "ANDAMENTO" ], empresaRecebedoraId: userInfo.id } } />
                <Text className="text-2xl">Doação para você solicitar</Text>
                <DoacoesList filters={ { status: [ "DISPONIVEL" ] } } />
            </View>
        )
    }
}