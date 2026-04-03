import DoacaoDetalhadaCard from "@/src/components/doacoesList/doacaoDetalhadaCard"
import { useLocalSearchParams } from "expo-router"
import { ScrollView, View } from "react-native"

export default function DoacaoDetalhada() {
    const { doacao } = useLocalSearchParams()
    const parsedDoacao = doacao ? JSON.parse(doacao as string) : null

    return (
        <View className="flex-1 bg-branco">
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
                <DoacaoDetalhadaCard d={parsedDoacao} />
            </ScrollView>
        </View>
    )
}