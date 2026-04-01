import { Colors } from "@/src/constants/Colors";
import { useAuth } from "@/src/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    const { userInfo, isLoggedIn, isLoading } = useAuth()

    return (
        <Tabs screenOptions={{
            headerLeft: () => <DrawerToggleButton />,
            tabBarActiveTintColor: Colors.azulEscuro,
            tabBarInactiveTintColor: Colors.azul + '80',
            tabBarStyle: {
                backgroundColor: Colors.branco,
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
                height: 60,
                paddingBottom: 8
            },
            tabBarLabelStyle: {
                fontWeight: 'bold',
                fontSize: 12
            }
        }}>
            <Tabs.Screen name="dashboard" options={{ 
                title: "Dashboard",
                tabBarIcon: ({ color, size }) => <MaterialIcons name="dashboard" size={24} color={color} />
                }} />
            <Tabs.Screen name="perfil" options={{ 
                title: "Perfil",
                tabBarIcon: ({ color, size }) => <MaterialIcons name="account-circle" size={24} color={color} />
                }} initialParams={{userId: userInfo?.id}} />
            <Tabs.Screen name="mapa" options={{ 
                title: "Mapa",
                tabBarIcon: ({ color, size }) => <MaterialIcons name="explore" size={24} color={color} />
                }} initialParams={{userId: userInfo?.id}} />
        </Tabs>
    )
}