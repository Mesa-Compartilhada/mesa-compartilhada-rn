import { CategoriaEstabelecimento, CategoriaInstituicao, TipoEmpresa } from "@/src/constants/enums"
import { Empresa } from "@/src/types/empresa"
import { MaterialIcons } from "@expo/vector-icons"
import { Image, Text, View } from "react-native"

type Props = {
    user: Empresa
}

export default function PerfilCard({ user }: Props) {
    return (
        <View className="w-[90%] bg-white rounded-3xl p-8 shadow-sm border border-gray-100 m-auto">
            <View className="flex flex-col items-center gap-6">

                <View className="shadow-lg">
                    {user?.fotoPerfil ? (
                        <Image
                            className="w-48 h-48 rounded-3xl border-4 border-white"
                            source={{
                            uri: user.fotoPerfil,
                            }}
                        />
                        ) : (
                        <View className="w-48 h-48 rounded-3xl bg-azul justify-center items-center border-4 border-white">
                            <MaterialIcons name="account-circle" size={120} color="white" />
                        </View>
                        )}
                </View>
                
                <View className="items-center gap-1">
                    <Text className="text-3xl font-black text-azulEscuro text-center leading-tight">{ user.nome }</Text>
                    <View className="px-4 py-1.5 bg-azul/10 rounded-full">
                        <Text className="text-azul font-bold uppercase text-xs tracking-widest">
                            {TipoEmpresa[user.tipo] === 'DOADORA' ? 'Doador' : 'Instituição'} • {
                                (TipoEmpresa[user.tipo] === 'DOADORA' ?
                                CategoriaEstabelecimento[user.categoria] :
                                CategoriaInstituicao[user.categoria])
                            }
                        </Text>
                    </View>
                </View>
                
                <View className="w-full bg-gray-50 p-6 rounded-2xl gap-4">
                    <View className="flex flex-row items-center gap-4">
                        <View className="p-2 bg-white rounded-xl shadow-sm">
                            <MaterialIcons name="location-on" size={24} color="#62C0C0" />
                        </View>
                        <View>
                            <Text className="text-gray-400 text-xs font-bold uppercase">Localização</Text>
                            <Text className="text-azulEscuro font-semibold">{ user.endereco.bairro}, {user.endereco.cidade}</Text>
                        </View>
                    </View>
                    
                    <View className="flex flex-row items-center gap-4">
                        <View className="p-2 bg-white rounded-xl shadow-sm">
                            <MaterialIcons name="email" size={24} color="#FF6600" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-400 text-xs font-bold uppercase">Contato</Text>
                            <Text className="text-azulEscuro font-semibold">{user.email}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}