import { Text, View } from "react-native"

type Props = {
    icon: React.ReactElement,
    title: string
}

export default function CustomHeader({ icon, title }: Props) {
    return (
        <View className="flex-row items-center h-32 gap-2">
            { icon }
            <Text className="text-xl font-bold">{ title }</Text>
        </View>
    )
}