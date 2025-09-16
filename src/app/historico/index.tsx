import { getDoacaoByFilter } from "@/src/api/services/doacaoService";
import HistoricoList from "@/src/components/historico/historicoList";
import { StatusDoacao } from "@/src/constants/enums";
import { useAuth } from "@/src/context/AuthContext";
import { Doacao } from "@/src/types/doacao";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Historico() {

    const { userInfo, isLoading } = useAuth()

    const [doacoes, setDoacoes] = useState<Doacao[]>([])

    useEffect(() => {
        if(!isLoading && userInfo) {
            const fetch = async() => {
                let res
                if(userInfo.tipo === "DOADORA") {
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
                setDoacoes(res)
            }
            fetch()
        }
    }, [])

    if(doacoes.length > 0) {
        return (
            <View>
                <HistoricoList doacoes={doacoes} />
            </View>
        )
    }
    else if(doacoes.length <= 0) {
        return (
            <View>
                <MaterialIcons name="no-food" color={"white"} size={24} />
                <Text className="font-bold text-center">Não há doações</Text>
            </View>
        )
    }
}