import { Colors } from "@/src/constants/Colors";
import { useAuth } from "@/src/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import NavigationHeader from "@/src/components/header/navigationHeader";

export default function TabsLayout() {
    const { userInfo } = useAuth()

    const getTabOptions = (title: string, iconName: React.ComponentProps<typeof MaterialIcons>['name']) => ({
        headerShown: true,
        header: (props: any) => <NavigationHeader {...props} />,
        title,
        tabBarIcon: ({ color }: { color: string }) => <MaterialIcons name={iconName} size={24} color={color} />
    });

    return (
        <Tabs screenOptions={{
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
                fontSize: 12,
                color: Colors.azulEscuro,
            }
        }}>
            <Tabs.Screen 
                name="dashboard" 
                options={getTabOptions("Dashboard", "dashboard")} 
            />
            <Tabs.Screen 
                name="perfil" 
                options={getTabOptions("Perfil", "account-circle")} 
                initialParams={{ userId: userInfo?.id }} 
            />
            <Tabs.Screen 
                name="mapa" 
                options={getTabOptions("Mapa", "explore")} 
                initialParams={{ userId: userInfo?.id }} 
            />
        </Tabs>
    )
}