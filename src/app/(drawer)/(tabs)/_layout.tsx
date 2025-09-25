import { Colors } from "@/src/constants/Colors";
import { useAuth } from "@/src/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    const { userInfo, isLoggedIn, isLoading } = useAuth()

    return (
        <Tabs screenOptions={{
            headerLeft: () => <DrawerToggleButton />
        }}>
            <Tabs.Screen name="dashboard" options={{ 
                title: "Dashboard",
                tabBarIcon: ({ color, size }) => <MaterialIcons name="dashboard" size={24} color={Colors.azul} />
                }} />
            <Tabs.Screen name="perfil" options={{ 
                title: "Perfil",
                tabBarIcon: ({ color, size }) => <MaterialIcons name="account-circle" size={24} color={Colors.azul} />
                }} initialParams={{userId: userInfo?.id}} />
        </Tabs>
    )
}