import { StatusDoacao, TipoAlimento, TipoArmazenamento } from "@/src/constants/enums";
import { Doacao } from "@/src/types/doacao";
import dateFormatter from "@/src/utils/dateFormatter";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type Props = {
    doacao: Doacao
}

export default function DoacaoDetalhadaCard({ doacao }: Props) {
    const empresaDoadora = doacao.empresaDoadora
    const empresaRecebedora = doacao.empresaRecebedora
    const endereco = doacao.empresaDoadora.endereco

    const getStatusStyle = (status: StatusDoacao) => {
        switch (status) {
            case StatusDoacao.DISPONIVEL:
            return { bg: "bg-yellow-100", text: "text-yellow-800", icon: "#854d0e", iconName: "hourglass-empty" }
            case StatusDoacao.ANDAMENTO:
            return { bg: "bg-blue-100", text: "text-blue-800", icon: "#1e40af", iconName: "autorenew" }
            case StatusDoacao.CONCLUIDA:
            return { bg: "bg-green-100", text: "text-green-800", icon: "#166534", iconName: "check-circle" }
            case StatusDoacao.CANCELADA:
            return { bg: "bg-red-100", text: "text-red-800", icon: "#991b1b", iconName: "cancel" }
            default:
            return { bg: "bg-gray-100", text: "text-gray-700", icon: "#374151", iconName: "help-outline" }
        }
    }

    const statusStyle = getStatusStyle(doacao.status as StatusDoacao)

    return (
        <View className="gap-4">
            <View className="bg-cover bg-green-600 rounded-2xl">
                <MaterialIcons className="m-auto" name="photo" size={256} color={"white"} />
            </View>
            <View className="flex flex-row justify-between">
                <Text className="font-extrabold text-3xl text-gray-700">{ doacao.nome }</Text>
                <Text className="font-extrabold text-3xl text-gray-700">{ doacao.quantidade } { /* doacao.unidadeMedida */ "kg"  }</Text>
            </View>
            <View>
                <View className="flex flex-row items-center gap-2">
                    <MaterialIcons name="location-pin" size={24} color={"gray"} /> 
                    <Text>{ endereco.logradouro }, { endereco.bairro }</Text>
                </View>
                <View className="flex flex-row items-center gap-2">
                    <MaterialIcons name="store" size={24} color={"gray"} /> 
                    <Text>{ empresaDoadora.nome }</Text>
                </View>
            </View>

            <View>
                <Text>
                    Validade: { dateFormatter(doacao.dataValidade) }
                </Text>
                <Text>
                    Fabricação: { dateFormatter(doacao.dataFabricacao) }
                </Text>
            </View>
            <View className={`items-center rounded-2xl p-2 shadow ${statusStyle.bg}`}>
                <MaterialIcons name={statusStyle.iconName as any} size={36} color={statusStyle.icon} />
                <Text className={`font-semibold text-center mt-2 ${statusStyle.text}`}>
                {doacao.status}
                </Text>
            </View>
            <View className="flex-row justify-around gap-4">
                <View className="flex-1 items-center bg-green-100 rounded-2xl p-2 shadow">
                    <MaterialIcons name="food-bank" size={36} color="#166534" />
                    <Text className="text-green-900 font-semibold text-center mt-2">
                    {TipoAlimento[parseInt(doacao.tipoAlimento)]}
                    </Text>
                </View>

                <View className="flex-1 items-center bg-blue-100 rounded-2xl p-2 shadow">
                    <MaterialIcons name="inventory" size={36} color="#1e3a8a" />
                    <Text className="text-blue-900 font-semibold text-center mt-2">
                    {TipoArmazenamento[parseInt(doacao.tipoArmazenamento)]}
                    </Text>
                </View>
            </View>
            
            <View>
                <Text className="text-3xl text-gray-700">Descrição:</Text>
                <Text className="text-gray-700">
                    { doacao.descricao }
                </Text>
            </View>
            <View>
                <Text className="text-3xl text-gray-700">Observações:</Text>
                <Text className="text-gray-700">
                    { doacao.observacao }
                </Text>
            </View>
        </View>
    )
}