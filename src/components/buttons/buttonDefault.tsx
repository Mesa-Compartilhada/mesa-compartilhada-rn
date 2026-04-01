import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

type Props = {
    title?: string,
    icon?: React.ReactElement
} & TouchableOpacityProps

export default function ButtonDefault({ title, icon, ...rest }: Props) {
    return (
        <TouchableOpacity 
            className="bg-lAbobora p-4 rounded-2xl flex-row gap-3 items-center justify-center shadow-sm" 
            onPress={rest.onPress} 
            activeOpacity={0.8} 
            { ...rest } 
        >
            <Text className="text-xl text-white font-bold text-center tracking-wide">{ title }</Text>
            {icon}
        </TouchableOpacity>
    )
}