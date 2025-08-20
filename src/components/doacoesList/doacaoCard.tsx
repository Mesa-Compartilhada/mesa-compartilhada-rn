import { Doacao } from "@/src/types/doacao"
import { Text, View } from "react-native"
import ButtonDefault from "../buttons/buttonDefault"
import { useRouter } from "expo-router"

type Props = {
    doacao: Doacao
}

export default function DoacaoCard({ doacao }: Props) {
    const router = useRouter()

    return (
        <View>
            <Text>{ doacao.nome }</Text>
            <Text>{ doacao.descricao }</Text>
            <ButtonDefault
  onPress={() => {
    router.push({
      pathname: "/perfil/[userId]",
      params: { userId: doacao.empresaDoadora.id }
    })
  }}
  title={doacao.empresaDoadora.nome}
/>

        </View>
    )
}