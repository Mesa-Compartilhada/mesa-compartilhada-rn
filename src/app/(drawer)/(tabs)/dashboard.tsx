import { getDoacaoByFilter } from "@/src/api/services/doacaoService";
import ButtonDefault from "@/src/components/buttons/buttonDefault";
import DoacaoCard from "@/src/components/doacoesList/doacaoCard";
import { DoacoesList } from "@/src/components/doacoesList/doacoesList";
import { TipoEmpresa } from "@/src/constants/enums";
import { useAuth } from "@/src/context/AuthContext";
import { Doacao } from "@/src/types/doacao";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Dashboard() {

    const { isLoggedIn, userInfo, isLoading } = useAuth()
    const [doacoes, setDoacoes] = useState<Doacao[]>()
    const router = useRouter()

    useEffect(() => {
        const fetchDoacoes = async () => {
            let response: Doacao[] = []
            if(isLoggedIn && userInfo && !isLoading) {
                if(userInfo?.tipo === TipoEmpresa.DOADORA ) {
                    response = await getDoacaoByFilter({ empresaDoadoraId: userInfo.id })
                }
                else {
                    response = await getDoacaoByFilter({ empresaRecebedoraId: userInfo.id })
                }
            }
            setDoacoes(response)
        }
        fetchDoacoes()
    }, [userInfo])

    if(isLoggedIn && userInfo && userInfo.tipo === TipoEmpresa.DOADORA) {
        return (
            <ScrollView className="flex-1 bg-branco">
                <View className="p-6 gap-8">
                    <View>
                        <Text className="text-3xl font-extrabold text-azulEscuro mb-2">Dashboard</Text>
                        <Text className="text-gray-500 text-lg">Olá, {userInfo.nome}! 👋</Text>
                    </View>

                    {
                        doacoes && doacoes.length > 0
                        &&
                        <View className="gap-3">
                            <Text className="text-xl font-bold text-azulEscuro">Sua doação mais recente:</Text>
                            <View className="items-center">
                                <DoacaoCard doacao={ doacoes[0] } />
                            </View>
                        </View>
                    }

                    <View className="gap-4">
                        <Text className="text-xl font-bold text-azulEscuro">Suas doações em andamento:</Text>
                        <DoacoesList filters={ { status: [ "ANDAMENTO" ], empresaDoadoraId: userInfo.id } } />
                    </View>
                </View>
            </ScrollView>
        )
    }
    else if(isLoggedIn && userInfo && userInfo.tipo === TipoEmpresa.RECEBEDORA) {
        return (
            <ScrollView className="flex-1 bg-branco">
                <View className="p-6 gap-8">
                    <View>
                        <Text className="text-3xl font-extrabold text-azulEscuro mb-2">Dashboard</Text>
                        <Text className="text-gray-500 text-lg">Olá, {userInfo.nome}! 👋</Text>
                    </View>

                    {
                        doacoes && doacoes.length > 0
                        &&
                        <View className="gap-3 items-center">
                            <Text className="text-xl font-bold text-azulEscuro self-start">Acompanhe sua última solicitação:</Text>
                            <DoacaoCard doacao={ doacoes[0] } />   
                        </View>
                    }
                    
                    <View className="gap-4">
                        <Text className="text-xl font-bold text-azulEscuro">Doação que você solicitou:</Text>
                        <DoacoesList filters={ { status: [ "ANDAMENTO" ], empresaRecebedoraId: userInfo.id } } />    
                    </View>
                    
                    <View className="gap-4">
                        <Text className="text-xl font-bold text-azulEscuro">Doações Disponíveis:</Text>
                        <DoacoesList filters={ { status: [ "DISPONIVEL" ] } } />
                    </View>
                
                    <View className="mt-4">
                        <ButtonDefault 
                            title="Encontrar mais doações" 
                            icon={<MaterialIcons name="explore" color="white" size={24} />} 
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