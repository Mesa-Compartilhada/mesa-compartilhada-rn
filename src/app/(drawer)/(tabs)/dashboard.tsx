import { getDoacaoByFilter } from "@/src/api/services/doacaoService";
import ButtonDefault from "@/src/components/buttons/buttonDefault";
import DoacaoCard from "@/src/components/doacoesList/doacaoCard";
import { DoacoesList } from "@/src/components/doacoesList/doacoesList";
import { TipoEmpresa } from "@/src/constants/enums";
import { useAuth } from "@/src/context/AuthContext";
import { Doacao } from "@/src/types/doacao";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Dashboard() {

    const { isLoggedIn, userInfo, isLoading } = useAuth()
    const [doacoes, setDoacoes] = useState<Doacao[]>()
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const router = useRouter()

    const fetchDoacoes = useCallback(async () => {
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
        setRefreshTrigger(prev => prev + 1)
    }, [isLoggedIn, userInfo, isLoading])

    useFocusEffect(
        useCallback(() => {
            fetchDoacoes()
        }, [fetchDoacoes])
    )

    if(isLoggedIn && userInfo && userInfo.tipo === TipoEmpresa.DOADORA) {
        return (
            <ScrollView className="flex-1 bg-branco">
                <View className="p-6 gap-8">
                    <View>
                        <Text className="text-3xl font-extrabold text-azulEscuro mb-2">Olá, {userInfo.nome}! 👋</Text>
                        <Text className="text-gray-500 text-lg">Aqui está um resumo das suas doações:</Text>
                    </View>

                    {
                        doacoes && doacoes.length > 0
                        &&
                        <View className="gap-3">
                            <Text className="text-xl font-bold text-azulEscuro">Sua doação mais recente:</Text>
                            <View className="items-center">
                                <DoacaoCard doacao={ doacoes[doacoes.length - 1] } />
                            </View>
                        </View>
                    }

                    <View className="gap-4">
                        <Text className="text-xl font-bold text-azulEscuro">Suas doações em andamento:</Text>
                        <DoacoesList filters={ { status: [ "ANDAMENTO" ], empresaDoadoraId: userInfo.id } } refreshTrigger={refreshTrigger} />
                    </View>

                    <View className="gap-4">
                        <Text className="text-xl font-bold text-azulEscuro">Suas doações disponíveis:</Text>
                        <DoacoesList filters={ { status: [ "DISPONIVEL" ], empresaDoadoraId: userInfo.id } } refreshTrigger={refreshTrigger} />
                    </View>

                    <View className="mt-4">
                        <ButtonDefault 
                            title="Criar Nova Doação" 
                            icon={<MaterialIcons name="add-circle" color="white" size={24} />} 
                            onPress={() => {
                                router.push({ pathname: '/criar-doacao' })
                            }}
                        />
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
                        <DoacoesList filters={ { status: [ "ANDAMENTO" ], empresaRecebedoraId: userInfo.id } } refreshTrigger={refreshTrigger} />    
                    </View>
                    
                    <View className="gap-4">
                        <Text className="text-xl font-bold text-azulEscuro">Doações Disponíveis:</Text>
                        <DoacoesList filters={ { status: [ "DISPONIVEL" ] } } refreshTrigger={refreshTrigger} />
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
    return null;
}