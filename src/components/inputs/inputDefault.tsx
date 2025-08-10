import { useState } from "react";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

type Props = {
    Icon?: React.ReactElement,
    placeholder?: string,
    error?: string,
    isPassword?: boolean
} & TextInputProps

export default function InputDefault({ Icon, placeholder, error, isPassword = false,...rest }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View className="gap-1">
            <View className={`flex-row items-center self-center gap-2 border-2 rounded-lg px-4 py-1
                ${error ? 'border-red-700' : ''}`}>
                
                <View className="opacity-50">
                    {Icon}
                </View>
                
                <TextInput 
                    className={`text-xl flex-1`}
                    placeholder={placeholder} 
                    secureTextEntry={isPassword && !showPassword}
                    {...rest}
                />

                {isPassword && (
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        {showPassword ? (
                            <MaterialCommunityIcons name="eye-off" size={24} color={"black"} />
                        ) : (
                            <MaterialCommunityIcons name="eye" size={24} color={"black"} />
                        )}
                    </TouchableOpacity>
                )}            
            </View>    
            <Text className="text-xs text-red-700">
                {error}
            </Text>
        </View>
    )
}