import { Text, View } from "react-native"

type Props = {
    icon: React.ReactElement,
    title: string
}

export default function CustomHeader({ icon, title }: Props) {
    return (
        <View className="flex-row items-center px-6 py-6 gap-4 bg-branco border-b border-gray-100 shadow-sm">
            <View className="p-3 bg-azulEscuro/5 rounded-2xl">
                { icon }
            </View>
            <View className="flex-1">
                <Text className="text-2xl font-extrabold text-azulEscuro tracking-tight leading-7">{ title }</Text>
                <View className="h-1 w-8 bg-lAbobora rounded-full mt-1" />
            </View>
        </View>
    )
}