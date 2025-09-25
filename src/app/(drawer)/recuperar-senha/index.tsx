import RecuperarSenhaForm from "@/src/components/forms/alterarSenhaForm/recuperarSenhaForm";
import { useAuth } from "@/src/context/AuthContext";
import { View } from "react-native";

export default function RecuperarSenha() {
    const { userInfo, isLoading } = useAuth()

    if(!isLoading)
    return (
        <View>
            <RecuperarSenhaForm user={userInfo ? userInfo : undefined} />
        </View>
    )
}