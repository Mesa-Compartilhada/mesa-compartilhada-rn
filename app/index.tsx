import { Image, StyleSheet, Text, View } from "react-native"
import ButtonDefault from "@/components/buttons/buttonDefault"
import { navigate } from "expo-router/build/global-state/routing"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/constants/Colors"
import Logo from "@/assets/images/mc_logo_fruteira.svg"

export default function Home() {
    return (
        <View style={styles.container}>
            <Logo style={styles.logo} width={100} height={100} />
            <ButtonDefault icon={<MaterialIcons name="login" size={24} color={"white"} />} title="Login" onPress={() => navigate("/")} />
            <ButtonDefault icon={<MaterialCommunityIcons name="account" size={24} color={"white"} />} title="Cadastro" onPress={() => navigate("/")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 6,
        gap: 4,
        flex: 1,
        justifyContent: "center",
    },
    title: {
        color: colors.lAbobora,
        fontWeight: "bold",
        fontSize: 32
    },
    logo: {
        marginHorizontal: "auto"
    }
})