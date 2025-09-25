import ButtonMenus from "@/src/components/buttons/buttonMenus";
import AlterarDadosForms from "@/src/components/forms/alterarDados/alterarDadosForm";
import AlterarSenhaForm from "@/src/components/forms/alterarSenhaForm/alterarSenhaForm";
import { Colors } from "@/src/constants/Colors";
import { useAuth } from "@/src/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import Collapsible from "react-native-collapsible"
import { SafeAreaView } from "react-native-safe-area-context";

export default function Conta() {
    const { userInfo } = useAuth()

    const [isDadosOpen, setIsDadosOpen] = useState(true)
    const [isSenhaOpen, setIsSenhaOpen] = useState(true)

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
                        {
                            userInfo && <AlterarDadosForms empresa={userInfo} />
                        }
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