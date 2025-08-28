import { getDoacaoByFilter } from "@/src/api/services/doacaoService";
import { Doacao, DoacaoFilter } from "@/src/types/doacao";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel"
import DoacaoCard from "./doacaoCard";
import IconButton from "../buttons/iconButton";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
    filters: DoacaoFilter
}

export function DoacoesList({ filters }: Props) {
    const [doacoes, setDoacoes] = useState<Doacao[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const carouselRef = useRef<ICarouselInstance>(null)

    const { width } = Dimensions.get('window')

    useEffect(() => {
        let res: [] = []
        const fetch = async () => {
            res = await getDoacaoByFilter(filters)
            setDoacoes(res.slice(0, 3))
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
            <View>
                <Carousel
                    ref={carouselRef}
                    width={width * 0.8}
                    loop={false}
                    style={{ width: width }}
                    height={150}
                    data={doacoes}
                    renderItem={({item}) => (
                        <View>
                            <DoacaoCard doacao={item} />
                        </View>
                    )}
                />
                <View className="flex-row justify-between">
                    <IconButton icon={<MaterialIcons name="arrow-back" color="white" size={24} />} onPress={() => {
                        carouselRef.current?.prev()
                    }} />
                    <IconButton icon={<MaterialIcons name="arrow-forward" color="white" size={24} />} onPress={() => {
                        carouselRef.current?.next()
                    }} />
                </View>
            </View>
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