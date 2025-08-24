import { Doacao } from "@/src/types/doacao"
import { Text, View } from "react-native"
import { useRouter } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import IconButton from "../buttons/iconButton"

type Props = {
    doacao: Doacao
}

export default function DoacaoCard({ doacao }: Props) {
    const router = useRouter()

    return (
        <View className="min-w-64 max-w-64 bg-white rounded-xl p-2 shadow-gray-300 shadow-md my-6">
            <Text numberOfLines={1} className="text-xl font-bold">{ doacao.nome }</Text>
            <Text numberOfLines={1}>Descrição: { doacao.descricao }</Text>
            <View className="flex flex-row gap-2 justify-between">
              <Text
                className="btnText w-48"
                numberOfLines={1}
                ellipsizeMode="tail"
                onPress={() => {
                  router.push({
                    pathname: "/perfil/[userId]",
                    params: { userId: doacao.empresaDoadora.id }
                  })
                }}
              >
                {doacao.empresaDoadora ? doacao.empresaDoadora.nome : ""}
              </Text>
              <IconButton
                onPress={() => {
                  
                }}
                icon={<MaterialIcons name="search" size={20} color={"white"}/>}
              />
            </View>
            <Text
              className="btnText"
              onPress={() => {
                router.push({
                  pathname: "/perfil/[userId]",
                  params: { userId: doacao.empresaRecebedora.id }
                })
              }}
            >
              {doacao.empresaRecebedora ? doacao.empresaRecebedora.nome : ""}
            </Text>
        </View>
    )
}