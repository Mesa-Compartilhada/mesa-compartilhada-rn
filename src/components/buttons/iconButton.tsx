import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

type Props = {
    icon?: React.ReactElement
} & TouchableOpacityProps

export default function IconButton({ icon, ...rest }: Props) {
    return (
        <TouchableOpacity className="bg-azul p-1 rounded-lg flex-row gap-4 items-center justify-center" onPress={rest.onPress} activeOpacity={0.7} { ...rest } >
            {icon}
        </TouchableOpacity>
    )
}