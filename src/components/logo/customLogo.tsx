import { Text, View } from "react-native"

type Props = {
    icon: React.ReactElement,
    title: string
    direction?: "row" | "column",
}

export default function CustomLogo({ icon, title, direction = "row" }: Props) {
    return (
        <View className={`flex-${direction} items-center`}>
            { icon }
            <Text className="text-4xl font-bold">{ title }</Text>
        </View>
    )
}