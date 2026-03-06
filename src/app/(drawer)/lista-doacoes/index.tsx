import InputDefault from "@/src/components/inputs/inputDefault";
import DoacoesListCompleta from "@/src/components/doacoesList/doacoesListCompleta";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";

export default function ListaDoacoes() {
    return (
        <SafeAreaView className="mx-12 flex-1">
            <InputDefault 
                placeholder="Encontrar novas doações"
                Icon={<MaterialIcons name="search" size={26} />}
            />
            <DoacoesListCompleta />
        </SafeAreaView>
    )
}