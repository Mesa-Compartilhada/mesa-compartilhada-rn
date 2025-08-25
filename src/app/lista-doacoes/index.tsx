import InputDefault from "@/components/inputs/inputDefault";
import DoacoesListCompleta from "@/src/components/doacoesList/doacoesListCompleta";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

export default function ListaDoacoes() {
    return (
        <View className="mx-12">
            <InputDefault 
                placeholder="Encontrar novas doações"
                Icon={<MaterialIcons name="search" size={26} />}
            />
            <DoacoesListCompleta />
        </View>
    )
}