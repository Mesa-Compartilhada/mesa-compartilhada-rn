import { colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, Text } from "react-native";

type Props = {
    title: string,
    onPress: () => void,
    icon: React.ReactElement
} & TouchableOpacityProps

export default function ButtonDefault({ title, onPress, icon, ...rest }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.7} >
            {icon}
            <Text style={styles.text}>{ title }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.azul,
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        gap: 4,
        alignItems: "center"
    },
    text: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    }
})