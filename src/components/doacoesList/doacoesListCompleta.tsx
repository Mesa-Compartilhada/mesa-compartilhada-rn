import { getDoacaoByFilter } from "@/src/api/services/doacaoService";
import { Doacao } from "@/src/types/doacao";
import { useEffect, useState } from "react";
import { View } from "react-native";
import DoacaoCard from "./doacaoCard";
import { ScrollView } from "react-native-gesture-handler";

export default function DoacoesListCompleta() {
    const [doacoes, setDoacoes] = useState<Doacao[] | null>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        let response
        const fetchDoacoes = async () => {
            response = await getDoacaoByFilter({ status: ["DISPONIVEL"] })
            setDoacoes(response)
        }
        fetchDoacoes()
    }, [])

    useEffect(() => {
        if(doacoes != null && doacoes) {
            setIsLoading(false)
        }
    }, [doacoes])

    if(!isLoading && doacoes && doacoes.length >= 1) {
        return (
            <ScrollView className="p-4">
                {
                    doacoes?.map((doacao, index) => (
                        <View key={index} className="items-center">
                            <DoacaoCard doacao={doacao} />
                        </View>
                    ))
                }
            </ScrollView>
        )
    }

}