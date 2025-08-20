import { Doacao } from "@/src/types/doacao"
import { Text, View } from "react-native"
import ButtonDefault from "../buttons/buttonDefault"
import { useRouter } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import IconButton from "../buttons/iconButton"

type Props = {
    doacao: Doacao
}

export default function DoacaoCard({ doacao }: Props) {
    const router = useRouter()

    return (
        <View className="flex gap-2">
            <Text className="text-xl font-bold">{ doacao.nome }</Text>
            <Text>Descrição: { doacao.descricao }</Text>
            <View className="flex flex-row gap-2 justify-between">
              <Text
                className="btnText"
                onPress={() => {
                  router.push({
                    pathname: "/perfil/[userId]",
                    params: { userId: doacao.empresaDoadora.id }
                  })
                }}
              >
                {doacao.empresaDoadora.nome}
              </Text>
              <IconButton
                onPress={() => {
                  
                }}
                icon={<MaterialIcons name="search" size={20} color={"white"}/>}
              />
            </View>
            

        </View>
    )
}