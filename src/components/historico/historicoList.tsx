import { Doacao } from "@/src/types/doacao";
import dateFormatter from "@/src/utils/dateFormatter";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

type Props = {
    doacoes: Doacao[]
}

export default function HistoricoList({ doacoes }: Props) {
    const router = useRouter()

    return (
        <View className="border border-gray-300 rounded-lg overflow-hidden">
            <View className="flex-row bg-gray-200 border-b border-gray-300">
                <Text className="flex-1 p-2 font-bold text-center">Nome</Text>
                <Text className="flex-1 p-2 font-bold text-center">Status</Text>
                <Text className="flex-1 p-2 font-bold text-center">Data Encerrada</Text>
            </View>
            {
                doacoes.map(doacao => (
                    <View key={doacao.id} className="flex-row justify-between">
                        <Text className="flex-1 p-2 text-center" onPress={() => {
                            router.push({
                                pathname: '/doacao/[doacao]',
                                params: { doacao: JSON.stringify(doacao) }
                            })
                        }}>{doacao.nome}</Text>
                        <Text className="flex-1 p-2 text-center">{doacao.status}</Text>
                        <Text className="flex-1 p-2 text-center">{dateFormatter(doacao.dataEncerrada)}</Text>
                    </View>
                ))
            }
        </View>
    )
}