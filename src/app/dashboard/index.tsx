import { getMe } from "@/src/api/services/empresaServices";
import { getUser } from "@/src/storage/secureStore";
import { EmpresaAdd } from "@/src/types/empresa";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function Dashboard() {

    const [user, setUser] = useState<EmpresaAdd>()

    useEffect(() => {
        const fetchUser = async () => {
            await getMe()
            const response = await getUser()
            if(response) {
                setUser(response)
            }
        }
        fetchUser()
    }, [])

    return (
        <Text>
            Olá, { user?.nome }
        </Text>
    )
}