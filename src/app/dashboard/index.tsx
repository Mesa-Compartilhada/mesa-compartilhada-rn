import { useAuth } from "@/src/context/AuthContext";
import { Text } from "react-native";

export default function Dashboard() {

    const { userInfo } = useAuth()
    console.warn(userInfo)

    return (
        <Text>
            Olá, { userInfo?.nome }
        </Text>
    )
}