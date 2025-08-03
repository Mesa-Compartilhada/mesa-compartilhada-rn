import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

type Props = {
    title: string,
    icon: React.ReactElement
} & TouchableOpacityProps

export default function ButtonDefault({ title, icon, ...rest }: Props) {
    return (
        <TouchableOpacity className="bg-azul p-4 rounded-md flex-row gap-4 items-center" onPress={rest.onPress} activeOpacity={0.7} { ...rest } >
            {icon}
            <Text className="text-2xl text-white font-bold">{ title }</Text>
        </TouchableOpacity>
    )
}