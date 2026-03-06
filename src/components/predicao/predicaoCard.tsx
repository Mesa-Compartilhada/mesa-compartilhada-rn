import { preverStatusFinal } from "@/src/api/services/mlService"
import { useEffect, useState } from "react"
import { Button, Text, View } from "react-native"
import ButtonDefault from "../buttons/buttonDefault"

export default function PredicaoCard() {
    const [result, setResult] = useState<string>()

    const predict = async () => {
        const response = await preverStatusFinal({
            "dataValidade": "2026-01-12T00:00:00.000+00:00",
            "dataCriada": "2025-02-12T00:00:00.000+00:00",
            "dataMaxRetirada": "2025-06-11T00:00:00.000+00:00",
            "quantidade": 157,
            "tipoAlimento": 3
        })
        setResult(response)
    }

    return (
        <View>
            <ButtonDefault title="Prever Status Final" onPress={() => predict()}></ButtonDefault>
            <Text>{ result }</Text>
        </View>
    )
}