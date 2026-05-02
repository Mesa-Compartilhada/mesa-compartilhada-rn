import { getDoacaoByFilter } from "@/src/api/services/doacaoService";
import { Doacao } from "@/src/types/doacao";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import DoacaoCard from "./doacaoCard";
import { ScrollView } from "react-native-gesture-handler";

export default function DoacoesListCompleta() {
    const [doacoes, setDoacoes] = useState<Doacao[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchDoacoes = async () => {
            setIsLoading(true)
            const response = await getDoacaoByFilter({ status: ["DISPONIVEL"] })
            setDoacoes(response)
            setIsLoading(false)
        }
        fetchDoacoes()
    }, [])

    if(isLoading) {
        return (
            <View className="p-10 items-center">
                <Text>Carregando doações...</Text>
            </View>
        )
    }

    if(doacoes && doacoes.length >= 1) {
        return (
            <ScrollView className="p-4" contentContainerStyle={{ paddingBottom: 32 }}>
                {
                    doacoes.map((doacao, index) => (
                        <View key={doacao.id || index} className="items-center">
                            <DoacaoCard doacao={doacao} />
                        </View>
                    ))
                }
            </ScrollView>
        )
    }

    return (
        <View className="p-10 items-center">
            <Text className="text-gray-500">Nenhuma doação disponível no momento.</Text>
        </View>
    )
}