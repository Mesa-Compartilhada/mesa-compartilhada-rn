import DoacaoDetalhadaCard from "@/src/components/doacoesList/doacaoDetalhadaCard"
import { useLocalSearchParams } from "expo-router"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CustomHeader from "@/src/components/header/customHeader"
import { MaterialIcons } from "@expo/vector-icons"

export default function DoacaoDetalhada() {
    const { doacao } = useLocalSearchParams()
    const parsedDoacao = doacao ? JSON.parse(doacao as string) : null

    return (
        <SafeAreaView className="flex-1 bg-branco" edges={['bottom']}>
            <CustomHeader 
                icon={<MaterialIcons name="volunteer-activism" size={28} color="#003B5D" />} 
                title="Detalhes da Doação" 
            />
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
                <DoacaoDetalhadaCard d={parsedDoacao} />
            </ScrollView>
        </SafeAreaView>
    )
}