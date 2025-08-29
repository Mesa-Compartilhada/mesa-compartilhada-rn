import ButtonMenus from "@/src/components/buttons/buttonMenus";
import AlterarSenhaForm from "@/src/components/forms/alterarSenhaForm/alterarSenhaForm";
import { Colors } from "@/src/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import Collapsible from "react-native-collapsible"
import { SafeAreaView } from "react-native-safe-area-context";

export default function Conta() {
    const [isDadosOpen, setIsDadosOpen] = useState(false)
    const [isSenhaOpen, setIsSenhaOpen] = useState(false)

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="m-4 gap-8">
                    <ButtonMenus style={{  }} icon={
                            isDadosOpen ?
                            <MaterialIcons name="arrow-upward" size={24} color={Colors.cinza} />
                            : <MaterialIcons name="arrow-downward" size={24} color={Colors.cinza} />
                        } 
                            title="Alterar dados da conta" onPress={() => {
                        setIsDadosOpen(!isDadosOpen)
                    }} />
                    
                    <Collapsible collapsed={isDadosOpen}>
                        <AlterarSenhaForm />
                    </Collapsible>

                    <ButtonMenus icon={
                        isSenhaOpen ?
                        <MaterialIcons name="arrow-upward" size={24} color={Colors.cinza} />
                        : <MaterialIcons name="arrow-downward" size={24} color={Colors.cinza} />
                    } title="Alterar senha" onPress={() => {
                        setIsSenhaOpen(!isSenhaOpen)
                    }} />
                    <Collapsible collapsed={isSenhaOpen}>
                        <AlterarSenhaForm />
                    </Collapsible>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}