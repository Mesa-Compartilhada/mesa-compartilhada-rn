import '@/global.css';
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

function ProtectedLayout() {
    const { isLoggedIn } = useAuth()

    return (
        <GestureHandlerRootView>
            <Drawer>
                <Drawer.Protected guard={!isLoggedIn}>
                    <Drawer.Screen name="index" />
                    <Drawer.Screen name="login/index" options={{ title: "Login", }} />
                    <Drawer.Screen name="cadastro/index" options={{ title: "Cadastro" }} />
                </Drawer.Protected>
                <Drawer.Protected guard={isLoggedIn}>
                    <Drawer.Screen name='dashboard/index' options={{ title: "Dashboard" }} />
                </Drawer.Protected>
            </Drawer>
            
        </GestureHandlerRootView>
    )
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <ProtectedLayout />
        </AuthProvider>
    )
}