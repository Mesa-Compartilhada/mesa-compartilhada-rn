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
        <View className="gap-1.5 w-full">
            <View className={`flex-row items-center gap-3 border rounded-xl px-4 py-3 bg-white
                ${error ? 'border-red-500' : 'border-gray-200'}`}>
                
                <View className="opacity-60">
                    {Icon}
                </View>
                
                <TextInput 
                    className="text-base flex-1 text-azulEscuro font-medium"
                    placeholder={placeholder} 
                    placeholderTextColor="#94a3b8"
                    secureTextEntry={isPassword && !showPassword}
                    {...rest}
                />

                {isPassword && (
                    <TouchableOpacity onPress={togglePasswordVisibility} activeOpacity={0.6}>
                        {showPassword ? (
                            <MaterialCommunityIcons name="eye-off" size={22} color="#64748b" />
                        ) : (
                            <MaterialCommunityIcons name="eye" size={22} color="#64748b" />
                        )}
                    </TouchableOpacity>
                )}            
            </View>    
            {error && (
                <Text className="text-xs text-red-500 ml-1 font-medium">
                    {error}
                </Text>
            )}
        </View>
    )
}