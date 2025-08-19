import { Empresa } from "@/src/types/empresa"
import { MaterialIcons } from "@expo/vector-icons"
import { Text, View } from "react-native"

type Props = {
    user: Empresa
}

export default function PerfilCard({ user }: Props) {
    return (
        <View className="w-fit bg-white rounded-xl p-6 shadow-gray-300 shadow-md m-auto">
            <View className="flex flex-col items-center gap-2">
                <View className="">{ <MaterialIcons name="account-circle" size={100} color={"gray"} /> }</View>
                <Text>{ user.nome }</Text>
                <Text>{ user.categoria.split("")[0]+user.categoria.substring(1).toLowerCase() } - { user.tipo.split("")[0]+user.tipo.substring(1).toLowerCase() }</Text>
                
                <View className="flex content-center gap-2">
                    {/* { <MapPin size={20} /> } <span className="cursor-pointer" title={empresa.endereco.cep}>{ empresa.endereco.bairro} </span>
                    { <Envelope size={20} /> }<span className="cursor-pointer" title={empresa.email}> Entre em contato</span> */}
                </View>
                {/* {
                    <View className="bg-green-500 text-white p-2 rounded-lg">
                        <Text>{ doacoesRecentes.length > 0 ? doacoesRecentes.length : 0 } doações concluídas</Text>
                    </View>
                } */}
            </View>
        </View>
    )
}