import { getDoacaoByFilter } from "@/src/api/services/doacaoService";
import HistoricoList from "@/src/components/historico/historicoList";
import { StatusDoacao, TipoEmpresa } from "@/src/constants/enums";
import { useAuth } from "@/src/context/AuthContext";
import { Doacao } from "@/src/types/doacao";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import CustomHeader from "@/src/components/header/customHeader";

export default function Historico() {

    const { userInfo, isLoading } = useAuth()

    const [doacoes, setDoacoes] = useState<Doacao[]>([])

    useEffect(() => {
        if(!isLoading && userInfo) {
            const fetch = async() => {
                let res
                if(userInfo.tipo === TipoEmpresa.DOADORA) {
                    res = await getDoacaoByFilter({
                        status: [StatusDoacao.CONCLUIDA, StatusDoacao.CANCELADA],
                        empresaDoadoraId: userInfo.id
                    })
                }
                else {
                    res = await getDoacaoByFilter({
                        status: [StatusDoacao.CONCLUIDA, StatusDoacao.CANCELADA],
                        empresaRecebedoraId: userInfo.id
                    })
                }
                setDoacoes(res || [])
            }
            fetch()
        }
    }, [])

    return (
        <ScrollView className="flex-1 bg-branco">
            <CustomHeader icon={<MaterialIcons name="history" size={28} color="#003B5D" />} title="Histórico" />
            
            {doacoes.length > 0 ? (
                <HistoricoList doacoes={doacoes} />
            ) : (
                <View className="flex-1 items-center justify-center p-20 gap-4">
                    <View className="p-8 bg-azul/10 rounded-full">
                        <MaterialIcons name="no-food" color="#62C0C0" size={64} />
                    </View>
                    <Text className="font-extrabold text-xl text-azulEscuro text-center">Nenhuma doação encontrada</Text>
                    <Text className="text-gray-400 text-center font-medium">Seu histórico de doações concluídas ou canceladas aparecerá aqui.</Text>
                </View>
            )}
        </ScrollView>
    )
}