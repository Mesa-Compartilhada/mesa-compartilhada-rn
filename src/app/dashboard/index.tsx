import InputDefault from "@/components/inputs/inputDefault";
import { getDoacaoByFilter } from "@/src/api/services/doacaoService";
import ButtonDefault from "@/src/components/buttons/buttonDefault";
import DoacaoCard from "@/src/components/doacoesList/doacaoCard";
import { DoacoesList } from "@/src/components/doacoesList/doacoesList";
import DoacoesListCompleta from "@/src/components/doacoesList/doacoesListCompleta";
import { useAuth } from "@/src/context/AuthContext";
import { Doacao } from "@/src/types/doacao";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Dashboard() {

    const { isLoggedIn, userInfo } = useAuth()
    const [doacoes, setDoacoes] = useState<Doacao[]>()
    const router = useRouter()

    useEffect(() => {
        const fetchDoacoes = async () => {
            let response
            if(userInfo) {
                if(userInfo?.tipo === "DOADORA") {
                    response = await getDoacaoByFilter({ empresaDoadoraId: userInfo.id })
                }
                else {
                    response = await getDoacaoByFilter({ empresaRecebedoraId: userInfo.id })
                }
            }
            setDoacoes(response)
        }
        fetchDoacoes()
    }, [])

    if(isLoggedIn && userInfo && userInfo.tipo === "DOADORA") {
        return (
            <ScrollView className="flex p-12 gap-16">
                <View>
                    {
                        doacoes
                        &&
                        <>
                            <Text className="text-2xl">Sua doação mais recente</Text>
                            <DoacaoCard doacao={ doacoes[0] } />   
                        </>
                    }
                </View>

                <View>
                    <Text className="text-2xl">Suas doações em andamento</Text>
                    <DoacoesList filters={ { status: [ "ANDAMENTO" ], empresaDoadoraId: userInfo.id } } />
                </View>
            </ScrollView>
        )
    }
    else if(isLoggedIn && userInfo && userInfo.tipo === "RECEBEDORA") {
        return (
            <ScrollView>
                <View className="flex p-12 gap-16">
                    <View>
                        {
                            doacoes
                            &&
                            <>
                                <Text className="text-2xl">Acompanhe sua última solicitação:</Text>
                                <DoacaoCard doacao={ doacoes[0] } />   
                            </>
                        }
                    </View>
                    
                    <View>
                        <Text className="text-2xl">Doação que você solicitou:</Text>
                        <DoacoesList filters={ { status: [ "ANDAMENTO" ], empresaRecebedoraId: userInfo.id } } />    
                    </View>
                    
                    <View>
                        <Text className="text-2xl">Doação para você solicitar:</Text>
                        <DoacoesList filters={ { status: [ "DISPONIVEL" ] } } />
                    </View>
                
                <View className="ml-auto">
                    <ButtonDefault 
                        title="Encontrar mais doações" 
                        icon={<MaterialIcons name="arrow-circle-right" color={"white"} 
                        size={24} />} 
                        onPress={() => {
                            router.push({ pathname: '/lista-doacoes' })
                        }}
                        />
                </View>
                </View>
            </ScrollView>
        )
    }
}