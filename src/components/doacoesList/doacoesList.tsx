import { getDoacaoByFilter } from "@/src/api/services/doacaoService";
import { Doacao, DoacaoFilter } from "@/src/types/doacao";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import DoacaoCard from "./doacaoCard";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
    filters: DoacaoFilter
}

export function DoacoesList({ filters }: Props) {
    const [doacoes, setDoacoes] = useState<Doacao[] | null>(null)
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
        if(doacoes != null && doacoes) {
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

    if(!isLoading && doacoes && doacoes.length >= 1) {
        return (
            <FlatList
                data={doacoes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className="m-4">
                        <DoacaoCard doacao={item} />
                    </View>
                )}
            >
            </FlatList>
        )
    }
    else if(!isLoading && doacoes && doacoes.length === 0) {
        return (
            <View>
                <Text>
                    Vazio
                </Text>
            </View>
        )
    }
}