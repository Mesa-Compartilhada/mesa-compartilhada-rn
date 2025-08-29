import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

type Props = {
    title?: string,
    icon?: React.ReactElement
} & TouchableOpacityProps

export default function ButtonMenus({ title, icon, ...rest }: Props) {
    return (
        <TouchableOpacity className={`flex-row gap-4 items-center`} onPress={rest.onPress} activeOpacity={0.7} { ...rest } >
            {icon}
            <Text className="text-2xl dark:text-white text-gray-700 font-medium text-center">{ title }</Text>
        </TouchableOpacity>
    )
}