import { StatusDoacao, TipoAlimento, TipoArmazenamento, TipoEmpresa, UnidadeMedida } from "@/src/constants/enums";
import { useAuth } from "@/src/context/AuthContext";
import { Doacao } from "@/src/types/doacao";
import dateFormatter from "@/src/utils/dateFormatter";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, View, Pressable } from "react-native";
import ButtonDefault from "../buttons/buttonDefault";
import { getDoacaoById, updateStateDoacao } from "@/src/api/services/doacaoService";
import { useEffect, useState } from "react";
import { useSnackBar } from "@/src/context/SnackBarContext";

type Props = {
    d: Doacao
}

export default function DoacaoDetalhadaCard({ d }: Props) {
    const { showSnackbar } = useSnackBar()
    const [doacao, setDoacao] = useState(d)
    const empresaDoadora = doacao?.empresaDoadora
    const router = useRouter()
    const { userInfo } = useAuth()

    useEffect(() => {
        if (d) {
            setDoacao(d)
            updateDoacao()
        }
    }, [d])

    const updateDoacao = async () => {
        if (!d?.id) return
        try {
            const result = await getDoacaoById(d.id)
            if (result) {
                const finalData = (result as any).data || result;
                if (finalData && (finalData.id || finalData.nome)) {
                    setDoacao(finalData)
                }
            }
        } catch (error) {
            showSnackbar("Erro ao atualizar doação: " + error)
            console.error("Erro ao atualizar doação: ", error)
        }
    }

    if (!doacao) {
        return (
            <View className="flex-1 items-center justify-center p-10 bg-branco">
                <Text className="text-azul font-bold">Carregando detalhes...</Text>
            </View>
        )
    }

    const getStatusStyle = (status: StatusDoacao) => {
        if (!status) return { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-500", icon: "#4b5563", iconName: "help-outline", label: "Desconhecido" }
        switch (status) {
            case StatusDoacao.DISPONIVEL:
            return { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500", icon: "#d97706", iconName: "hourglass-empty", label: "Disponível" }
            case StatusDoacao.ANDAMENTO:
            return { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500", icon: "#2563eb", iconName: "autorenew", label: "Em Andamento" }
            case StatusDoacao.CONCLUIDA:
            return { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-500", icon: "#059669", iconName: "check-circle", label: "Concluída" }
            case StatusDoacao.CANCELADA:
            return { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500", icon: "#dc2626", iconName: "cancel", label: "Cancelada" }
            default:
            return { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-500", icon: "#4b5563", iconName: "help-outline", label: status }
        }
    }

    const statusStyle = getStatusStyle(doacao.status as StatusDoacao)

    return (
        <View className="gap-6 px-6 pt-4">
            <View className="rounded-[40px] overflow-hidden shadow-lg bg-white border border-gray-100">
                {
                    doacao.imagemCapa
                    ? (
                        <Image className="w-full h-80" source={{ uri: doacao.imagemCapa }} resizeMode="cover" />
                    ) : (
                        <View className="w-full h-80 bg-azul/5 items-center justify-center">
                            <MaterialIcons name="no-photography" size={100} color="#62C0C0" />
                        </View>
                    )
                }
                <View className={`absolute top-4 right-4 px-4 py-2 rounded-2xl ${statusStyle.bg} flex-row items-center gap-2 shadow-sm`}>
                    <View className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                    <Text className={`font-bold text-xs uppercase tracking-widest ${statusStyle.text}`}>
                        {statusStyle.label}
                    </Text>
                </View>
            </View>

            <View className="gap-2">
                <View className="flex-row justify-between items-start">
                    <Text className="font-black text-3xl text-azulEscuro flex-1 leading-tight">{ doacao.nome }</Text>
                    <View className="bg-lAbobora/10 px-4 py-2 rounded-2xl">
                        <Text className="font-black text-xl text-lAbobora">{ doacao.quantidade } { UnidadeMedida[doacao.unidadeMedida] }</Text>
                    </View>
                </View>
                
                <View className="flex-row items-center gap-2 mt-2">
                    <View className="p-1.5 bg-azul/10 rounded-lg">
                        <MaterialIcons name="location-pin" size={18} color="#62C0C0" /> 
                    </View>
                    <Text className="text-gray-500 font-medium flex-1">
                        { empresaDoadora?.endereco?.logradouro || "Endereço não informado" }{ empresaDoadora?.endereco?.bairro ? `, ${empresaDoadora.endereco.bairro}` : "" }
                    </Text>
                </View>

                <Pressable 
                    className="flex-row items-center gap-2"
                    onPress={() => { 
                        if (empresaDoadora?.id) {
                            router.navigate({ pathname: "/(drawer)/perfil/[userId]", params: { userId: empresaDoadora.id } }) 
                        }
                    }}
                >
                    <View className="p-1.5 bg-azul/10 rounded-lg">
                        <MaterialIcons name="store" size={18} color="#62C0C0" /> 
                    </View>
                    <Text className="text-azul font-bold">{ empresaDoadora?.nome || "Doador desconhecido" }</Text>
                </Pressable>
            </View>

            <View className="flex-row gap-4">
                <View className="flex-1 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm items-center gap-2">
                    <MaterialIcons name="restaurant" size={24} color="#62C0C0" />
                    <Text className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Alimento</Text>
                    <Text className="text-azulEscuro font-bold text-center">{TipoAlimento[doacao.tipoAlimento]}</Text>
                </View>

                <View className="flex-1 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm items-center gap-2">
                    <MaterialIcons name="inventory" size={24} color="#003B5D" />
                    <Text className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Estocagem</Text>
                    <Text className="text-azulEscuro font-bold text-center">{TipoArmazenamento[doacao.tipoArmazenamento]}</Text>
                </View>
            </View>

            <View className="bg-azulEscuro/5 p-6 rounded-[32px] gap-4 border border-azulEscuro/5">
                <View className="flex-row justify-between border-b border-azulEscuro/10 pb-4">
                    <View className="gap-1">
                        <Text className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Fabricação</Text>
                        <Text className="text-azulEscuro font-bold">{ dateFormatter(doacao.dataFabricacao) }</Text>
                    </View>
                    <View className="gap-1 items-end">
                        <Text className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Validade</Text>
                        <Text className="text-lAbobora font-bold">{ dateFormatter(doacao.dataValidade) }</Text>
                    </View>
                </View>
                
                <View className="gap-1">
                    <Text className="text-lg font-bold text-azulEscuro">Descrição</Text>
                    <Text className="text-gray-500 leading-6 font-medium">
                        { doacao.descricao }
                    </Text>
                </View>

                {doacao.observacao && (
                    <View className="gap-1">
                        <Text className="text-lg font-bold text-azulEscuro">Observações</Text>
                        <Text className="text-gray-500 leading-6 font-medium italic">
                            "{ doacao.observacao }"
                        </Text>
                    </View>
                )}

                {
                    doacao.status === StatusDoacao.ANDAMENTO
                    &&
                    <View className="gap-1">
                        <Text className="text-lg font-bold text-azulEscuro">Confirmações</Text>
                        <Text className="text-gray-500 leading-6 font-medium">
                            Doadora: { doacao.empresaDoadoraConcluida ? <MaterialIcons name="check" /> : <MaterialIcons name="cancel" /> }
                        </Text>
                        <Text className="text-gray-500 leading-6 font-medium">
                            Recebedora: { doacao.empresaRecebedoraConcluida ? <MaterialIcons name="check" /> : <MaterialIcons name="cancel" /> }
                        </Text>
                    </View>
                }
            </View>

            <View className="gap-4 mt-2">
                {
                    userInfo?.tipo === TipoEmpresa.RECEBEDORA
                    && doacao.status === StatusDoacao.DISPONIVEL
                    && 
                    <ButtonDefault 
                        title="Solicitar Doação"
                        icon={<MaterialIcons name="add-circle" size={24} color="white" />}
                        onPress={async () => {
                            await updateStateDoacao(doacao.id, 
                                {
                                    status: StatusDoacao.ANDAMENTO,
                                    empresaRecebedoraId: userInfo.id,
                                    empresaSolicitanteId: userInfo.id
                                }
                            )
                            await updateDoacao()
                            showSnackbar("Doação solicitada")
                            router.navigate({ pathname: "/dashboard" })
                        }}
                    />
                }
                {
                    userInfo?.tipo === TipoEmpresa.RECEBEDORA
                    && doacao.status === StatusDoacao.ANDAMENTO
                    && doacao.empresaRecebedora && doacao.empresaRecebedora.id === userInfo.id
                    && 
                    <View className="gap-3">
                        {
                            !doacao.empresaRecebedoraConcluida
                            ?
                            <ButtonDefault 
                                title="Confirmar Recebimento"
                                icon={<MaterialIcons name="check-circle" size={24} color="white" />}
                                onPress={async () => {
                                    await updateStateDoacao(doacao.id, 
                                        {
                                            status: StatusDoacao.CONCLUIDA,
                                            empresaRecebedoraId: userInfo.id,
                                            empresaSolicitanteId: userInfo.id
                                        }
                                    )
                                    await updateDoacao()
                                    showSnackbar("Recebimento confirmado")
                                    router.navigate({ pathname: "/dashboard" })
                                }}
                            />
                            :
                            <ButtonDefault 
                                title="Ainda não recebi"
                                onPress={async () => {
                                    await updateStateDoacao(doacao.id, 
                                        {
                                            status: StatusDoacao.CONCLUIDA,
                                            empresaRecebedoraId: userInfo.id,
                                            empresaSolicitanteId: userInfo.id
                                        }
                                    )
                                    await updateDoacao()
                                    showSnackbar("Recebimento não confirmado")
                                    router.navigate({ pathname: "/dashboard" })
                                }}
                            />
                        }
                        
                        <ButtonDefault 
                            title="Cancelar Solicitação"
                            className="bg-red-500 p-4 rounded-2xl items-center justify-center border border-red-100"
                            onPress={async () => {
                                await updateStateDoacao(doacao.id, 
                                    {
                                        status: StatusDoacao.DISPONIVEL,
                                        empresaRecebedoraId: userInfo.id,
                                        empresaSolicitanteId: userInfo.id
                                    }
                                )
                                await updateDoacao()
                                showSnackbar("Solicitação cancelada")
                                router.navigate({ pathname: "/dashboard" })
                            }}
                        >
                        </ButtonDefault>
                    </View>
                }
                {
                    userInfo?.tipo === TipoEmpresa.DOADORA
                    && doacao.status === StatusDoacao.ANDAMENTO
                    && 
                    <View>
                        {
                            !doacao.empresaDoadoraConcluida
                            ?
                            <ButtonDefault 
                                title="Confirmar Entrega"
                                icon={<MaterialIcons name="verified" size={24} color="white" />}
                                onPress={async () => {
                                    await updateStateDoacao(doacao.id, 
                                        {
                                            status: StatusDoacao.CONCLUIDA,
                                            empresaRecebedoraId: doacao.empresaRecebedora?.id,
                                            empresaSolicitanteId: userInfo.id
                                        }
                                    )
                                    await updateDoacao()
                                    showSnackbar("Entrega confirmada")
                                    router.navigate({ pathname: "/dashboard" })
                                }}
                            />
                            :
                            <ButtonDefault 
                                title="Ainda não entreguei"
                                icon={<MaterialIcons name="verified" size={24} color="white" />}
                                onPress={async () => {
                                    await updateStateDoacao(doacao.id, 
                                        {
                                            status: StatusDoacao.CONCLUIDA,
                                            empresaRecebedoraId: doacao.empresaRecebedora?.id,
                                            empresaSolicitanteId: userInfo.id
                                        }
                                    )
                                    await updateDoacao()
                                    showSnackbar("Entrega não confirmada")
                                    router.navigate({ pathname: "/dashboard" })
                                }}
                            />
                        }
                    </View>
                }
            </View>
        </View>
    )
}