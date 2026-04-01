import { TouchableOpacity, TouchableOpacityProps, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
    title?: string,
    icon?: React.ReactElement
} & TouchableOpacityProps

export default function ButtonMenus({ title, icon, ...rest }: Props) {
    return (
        <TouchableOpacity 
            className="flex-row items-center bg-white p-5 rounded-3xl gap-5 border border-gray-100 shadow-sm mb-1" 
            onPress={rest.onPress} 
            activeOpacity={0.8} 
            { ...rest } 
        >
            <View className="p-3 bg-azul/5 rounded-2xl">
                {icon}
            </View>
            <Text className="text-xl text-azulEscuro font-bold flex-1">{ title }</Text>
            <MaterialIcons name="chevron-right" size={24} color="#62C0C0" />
        </TouchableOpacity>
    )
}
