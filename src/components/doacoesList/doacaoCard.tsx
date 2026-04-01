import { Doacao } from "@/src/types/doacao"
import { ImageBackground, Pressable, Text, View } from "react-native"
import { useRouter } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"

type Props = {
    doacao: Doacao
}

export default function DoacaoCard({ doacao }: Props) {
    const router = useRouter()

    if(doacao) {
      return (
        <View className="min-w-[280px] max-w-[280px] bg-white rounded-3xl shadow-sm border border-gray-100 my-4 overflow-hidden">
          <Pressable 
            onPress={ () => router.push({
              pathname: '/doacao/[doacao]',
              params: { doacao: JSON.stringify(doacao) }
            }) }
            activeOpacity={0.9}
          >
            {
              doacao && doacao.imagemCapa && doacao.imagemCapa.length > 0
                ? (
                    <ImageBackground className="w-full h-48 rounded-t-3xl" source={{ uri: doacao.imagemCapa }} />
                )
                : (
                    <View className="w-full h-48 bg-lPessego/30 items-center justify-center">
                        <MaterialIcons name="no-photography" size={60} color="#62C0C0" />
                    </View>
                )
            }
          </Pressable>
          
          <View className="p-4 gap-2">
            <Text numberOfLines={1} className="text-xl font-bold text-azulEscuro">{ doacao.nome }</Text>
            
            <View className="flex-row items-center gap-1">
              <MaterialIcons name="business" size={16} color="#62C0C0" />
              <Text
                  className="text-azul font-semibold text-sm flex-1"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  onPress={() => {
                    router.push({
                      pathname: "/(drawer)/perfil/[userId]",
                      params: { userId: doacao.empresaDoadora.id }
                    })
                  }}
                >
                  {doacao.empresaDoadora ? doacao.empresaDoadora.nome : "Doador desconhecido"}
                </Text>
            </View>

            {doacao.empresaRecebedora && (
              <View className="flex-row items-center gap-1">
                <MaterialIcons name="handshake" size={16} color="#FF6600" />
                <Text
                  className="text-lAbobora font-semibold text-sm flex-1"
                  numberOfLines={1}
                  onPress={() => {
                    router.push({
                      pathname: "/(drawer)/perfil/[userId]",
                      params: { userId: doacao.empresaRecebedora.id }
                    })
                  }}
                >
                  {doacao.empresaRecebedora.nome}
                </Text>
              </View>
            )}
          </View>
        </View>
      )
    }
}