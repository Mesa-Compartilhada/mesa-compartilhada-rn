import { Empresa } from "@/src/types/empresa"
import { MaterialIcons } from "@expo/vector-icons"
import { Image, Text, View } from "react-native"

type Props = {
    user: Empresa
}

export default function PerfilCard({ user }: Props) {
    return (
        <View className="w-2/3 bg-white rounded-xl p-6 shadow-gray-300 shadow-md m-auto">
            <View className="flex flex-col items-center gap-4">

                <View>
                    {user?.fotoPerfil ? (
                        <Image
                            className="w-40 h-40 rounded-full"
                            source={{
                            uri: user.fotoPerfil,
                            }}
                        />
                        ) : (
                        <View className="w-40 h-40 rounded-full bg-gray-600 justify-center items-center">
                            <MaterialIcons name="account-circle" size={140} color="white" />
                        </View>
                        )}
                </View>
                
                
                <Text className="text-3xl break-words">{ user.nome }</Text>
                <Text className="text-xl">{ user.categoria.split("")[0]+user.categoria.substring(1).toLowerCase() } - { user.tipo.split("")[0]+user.tipo.substring(1).toLowerCase() }</Text>
                
                <View className="flex content-center gap-2">
                    <View className="flex flex-row gap-2">
                        <MaterialIcons name="location-pin" size={20} />
                        <Text className="cursor-pointer">{ user.endereco.bairro} </Text>
                    </View>
                    
                    <View className="flex flex-row gap-2">
                        <MaterialIcons name="mail" size={20} />
                        <Text className="cursor-pointer"> Entre em contato</Text>
                    </View>
                    
                </View>
            </View>
        </View>
    )
}