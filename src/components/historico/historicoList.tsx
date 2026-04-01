import { Doacao } from "@/src/types/doacao";
import dateFormatter from "@/src/utils/dateFormatter";
import { useRouter } from "expo-router";
import { Text, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
    doacoes: Doacao[]
}

const getStatusConfig = (status: string) => {
    switch (status) {
        case 'CONCLUIDA':
            return {
                label: 'Concluída',
                bgColor: 'bg-emerald-50',
                textColor: 'text-emerald-600',
                dotColor: 'bg-emerald-500',
                icon: 'check-circle'
            };
        case 'CANCELADA':
            return {
                label: 'Cancelada',
                bgColor: 'bg-red-50',
                textColor: 'text-red-600',
                dotColor: 'bg-red-500',
                icon: 'cancel'
            };
        case 'ANDAMENTO':
            return {
                label: 'Em Andamento',
                bgColor: 'bg-amber-50',
                textColor: 'text-amber-600',
                dotColor: 'bg-amber-500',
                icon: 'pending'
            };
        default:
            return {
                label: status,
                bgColor: 'bg-gray-50',
                textColor: 'text-gray-600',
                dotColor: 'bg-gray-400',
                icon: 'info'
            };
    }
};

export default function HistoricoList({ doacoes }: Props) {
    const router = useRouter()

    return (
        <View className="gap-4 px-6 py-4">
            {
                doacoes.map(doacao => {
                    const statusConfig = getStatusConfig(doacao.status);
                    return (
                        <Pressable 
                            key={doacao.id} 
                            onPress={() => {
                                router.push({
                                    pathname: '/doacao/[doacao]',
                                    params: { doacao: JSON.stringify(doacao) }
                                })
                            }}
                            className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex-row items-center gap-4"
                        >
                            <View className={`w-12 h-12 rounded-2xl items-center justify-center ${statusConfig.bgColor}`}>
                                <MaterialIcons 
                                    name={statusConfig.icon as any} 
                                    size={28} 
                                    color={statusConfig.textColor.replace('text-', '') === 'emerald-600' ? '#059669' : 
                                           statusConfig.textColor.replace('text-', '') === 'red-600' ? '#dc2626' : 
                                           statusConfig.textColor.replace('text-', '') === 'amber-600' ? '#d97706' : '#64748b'} 
                                />
                            </View>

                            <View className="flex-1 gap-1">
                                <Text className="text-lg font-bold text-azulEscuro" numberOfLines={1}>{doacao.nome}</Text>
                                <View className="flex-row items-center gap-1">
                                    <MaterialIcons name="event-available" size={14} color="#94a3b8" />
                                    <Text className="text-gray-400 text-xs font-medium">Finalizado em {dateFormatter(doacao.dataEncerrada)}</Text>
                                </View>
                            </View>

                            <View className={`px-3 py-1 rounded-full ${statusConfig.bgColor} flex-row items-center gap-1.5`}>
                                <View className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`} />
                                <Text className={`text-[11px] font-bold uppercase tracking-tight ${statusConfig.textColor}`}>
                                    {statusConfig.label}
                                </Text>
                            </View>
                        </Pressable>
                    );
                })
            }
        </View>
    )
}