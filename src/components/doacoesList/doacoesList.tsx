import { getDoacaoByFilter } from "@/src/api/services/doacaoService";
import { Doacao, DoacaoFilter } from "@/src/types/doacao";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import DoacaoCard from "./doacaoCard";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
    filters: DoacaoFilter
}

export function DoacoesList({ filters }: Props) {
    const [doacoes, setDoacoes] = useState<Doacao[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let res: [] = []
        const fetch = async () => {
            res = await getDoacaoByFilter(filters)
            setDoacoes(res)
        }
        fetch()
    }, [])

    useEffect(() => {
        if(doacoes && doacoes.length >= 1) {
            setIsLoading(false)
        }
    }, [doacoes])

    if(isLoading) {
        return (
            <View>
                <Text>
                    Carregando...
                </Text>
            </View>
        )
    }

    if(!isLoading && doacoes.length >= 1) {
        return (
            <ScrollView className="h-[35%]">
                {
                    doacoes.length >= 1
                    &&
                    doacoes.map((item, index) => (
                        <View key={index} className="m-4">
                            <DoacaoCard doacao={item} />
                        </View>
                    ))
                }
            </ScrollView>
        )
    }
    else if(!isLoading && doacoes.length === 0) {
        return (
            <View>
                <Text>
                    Vazio
                </Text>
            </View>
        )
    }
}