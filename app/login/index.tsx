import InputDefault from "@/components/inputs/inputDefault";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import Logo from "@/assets/images/mc_logo_fruteira.svg"
import ButtonDefault from "@/components/buttons/buttonDefault";

export default function Login() {
    return (
        <View className="flex-1 self-center justify-center gap-6">
            <View className="self-center">
                <Logo width={150} />
            </View>
            <InputDefault 
                Icon={ 
                    <MaterialIcons 
                    name="email" 
                    color={Colors.azul} 
                size={24} />} 
                placeholder="Email" />
            <InputDefault 
                Icon={
                    <MaterialIcons 
                    name="password" 
                    color={Colors.azul} 
                size={24} />} 
                placeholder="Senha" 
                secureTextEntry={true}
                />
            <View className="mr-auto">
                <ButtonDefault 
                    icon={<MaterialIcons name="login" size={24} color={"white"} />}
                    title="Entrar"
                    onPress={() => {
                        
                    }}
                />
            </View>
        </View>
    )
}