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
        <View className="min-w-64 max-w-64 bg-white rounded-xl shadow-gray-300 shadow-md my-6">
          <Pressable onPress={ () => router.push({
                    pathname: '/doacao/[doacao]',
                    params: { doacao: JSON.stringify(doacao) }
                  }) }>
          {
            doacao
            && doacao.imagemCapa
            && doacao.imagemCapa.length > 0
                  ? (
                      <ImageBackground className="w-full h-52 rounded-xl" source={{ uri: doacao.imagemCapa }} />
                  )
                  : (
                      <View className="w-52 h-52 m-auto">
                          <MaterialIcons className="m-auto" name="no-photography" size={100} color={"black"} />
                      </View>
                  )
          }
        </Pressable>
        <View className="my-2">
          <Text numberOfLines={1} className="text-xl font-bold text-center">{ doacao.nome }</Text>
          <Text
              className="btnText text-center"
              numberOfLines={1}
              ellipsizeMode="tail"
              onPress={() => {
                router.push({
                    pathname: "/(drawer)/perfil/[userId]",
                  params: { userId: doacao.empresaDoadora.id }
                })
              }}
            >
              {doacao.empresaDoadora ? doacao.empresaDoadora.nome : ""}
            </Text>
          <Text
            className="btnText text-center"
            onPress={() => {
              router.push({
                pathname: "/(drawer)/perfil/[userId]",
                params: { userId: doacao.empresaRecebedora.id }
              })
            }}
          >
            {doacao.empresaRecebedora ? doacao.empresaRecebedora.nome : ""}
          </Text>
        </View>
      </View>
    )
    }
}