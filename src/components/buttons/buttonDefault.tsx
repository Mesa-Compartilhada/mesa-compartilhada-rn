import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

type Props = {
    title?: string,
    icon?: React.ReactElement
} & TouchableOpacityProps

export default function ButtonDefault({ title, icon, ...rest }: Props) {
    return (
        <TouchableOpacity className={`bg-azul p-3 rounded-lg flex-row gap-4 items-center justify-center`} onPress={rest.onPress} activeOpacity={0.7} { ...rest } >
            <Text className="text-2xl text-white font-medium text-center">{ title }</Text>
            {icon}
        </TouchableOpacity>
    )
}