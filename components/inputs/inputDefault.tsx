import { Text, TextInput, TextInputProps, View } from "react-native"

type Props = {
    Icon?: React.ReactElement,
    placeholder?: string,
    error?: string
} & TextInputProps

export default function InputDefault({ Icon, placeholder, error, ...rest }: Props) {
    return (
        <View className="gap-1">
            <View className="flex-row items-center self-center gap-2">
                <TextInput 
                    className={`text-xl flex-1 px-2 border-2 border-azul rounded-lg ${error && "border-red-700"}`}
                    placeholder={placeholder} 
                    { ...rest }
                />
                <View>
                    { Icon }
                </View>
            </View>    
            <Text className="text-xs text-red-700 mx-1">
                { error }
            </Text>
        </View>
    )
}