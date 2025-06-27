import { TextInput, TextInputProps, View } from "react-native"

type Props = {
    Icon?: React.ReactElement,
    placeholder?: string
} & TextInputProps

export default function InputDefault({ Icon, placeholder, ...rest }: Props) {
    return (
        <View className="flex-row items-center self-center gap-2">
            <TextInput 
                className="text-2xl w-2/3" 
                placeholder={placeholder} 
                { ...rest }
            />
            <View>
                {Icon && Icon}
            </View>
        </View>
    )
}