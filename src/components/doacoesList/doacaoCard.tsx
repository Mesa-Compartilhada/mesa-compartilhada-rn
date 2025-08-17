import { Doacao } from "@/src/types/doacao"
import { Text, View } from "react-native"

type Props = {
    doacao: Doacao
}

export default function DoacaoCard({ doacao }: Props) {
    return (
        <View>
            <Text>{ doacao.nome }</Text>
            <Text>{ doacao.descricao }</Text>
        </View>
    )
}