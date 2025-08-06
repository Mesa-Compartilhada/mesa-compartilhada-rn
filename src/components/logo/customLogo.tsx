import { Text, View } from "react-native"
import Logo from "@/src/assets/images/mc_logo_fruteira.svg"

type Props = {
    title?: string
    direction?: "row" | "column",
}

export default function CustomLogo({title, direction = "row" }: Props) {
    return (
        <View className={`flex-${direction} items-center`}>
            <Logo />            
            <Text className="text-4xl font-bold">{ title }</Text>
        </View>
    )
}