import { getDoacaoByFilter } from "@/src/api/services/doacaoService";
import { Doacao, DoacaoFilter } from "@/src/types/doacao";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel"
import DoacaoCard from "./doacaoCard";
import ButtonDefault from "../buttons/buttonDefault";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Props = {
    filters: DoacaoFilter
}

export function DoacoesList({ filters }: Props) {
    const [doacoes, setDoacoes] = useState<Doacao[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const carouselData = doacoes ? [...doacoes, null] : [];

    const carouselRef = useRef<ICarouselInstance>(null)

    const { width } = Dimensions.get('window')

    const router = useRouter()

    useEffect(() => {
        let res: [] = []
        const fetch = async () => {
            res = await getDoacaoByFilter(filters)
            setDoacoes(res.slice(0, 5))
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
            <View className="items-center">
                <Carousel
                    ref={carouselRef}
                    width={width * 0.8}
                    loop={false}
                    style={{ width: width }}
                    height={300}
                    data={carouselData}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 1,
                        parallaxScrollingOffset: 50
                    }}
                    renderItem={({item}) => {
                        if(!item) {
                            return (
                                <View className="items-center justify-center h-full">
                                    <ButtonDefault title="Mais doações" icon={<MaterialIcons name="arrow-forward" color={"white"} size={24} />}
                                    onPress={() => {
                                        router.push("/lista-doacoes")
                                    }}
                                    />
                                </View>
                            )
                        }
                        return (
                            <View className="items-center">
                                <DoacaoCard doacao={item} />
                            </View>
                        )
                    }}
                />
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