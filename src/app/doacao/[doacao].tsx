import DoacaoDetalhadaCard from "@/src/components/doacoesList/doacaoDetalhadaCard"
import { useLocalSearchParams } from "expo-router"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

export default function DoacaoDetalhada() {
    const { doacao } = useLocalSearchParams()
    const parsedDoacao = doacao ? JSON.parse(doacao as string) : null

    return (
        <SafeAreaView className="flex-1">
            <ScrollView className="p-4" contentContainerStyle={{ paddingBottom: 32 }}>
                <DoacaoDetalhadaCard doacao={parsedDoacao} />
            </ScrollView>
        </SafeAreaView>
    )
}