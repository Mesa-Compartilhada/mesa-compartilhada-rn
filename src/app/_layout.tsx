import '@/global.css';
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';

function ProtectedLayout() {
    const { isLoggedIn } = useAuth()

    return (
        <Stack>
            <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="index" options={{headerShown: false}} />
                <Stack.Screen name="login/index" options={{ title: "Login", }} />
                <Stack.Screen name="cadastro/index" options={{ title: "Cadastro" }} />
            </Stack.Protected>
            <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name='dashboard/index' options={{ title: "Dashboard" }} />
            </Stack.Protected>
        </Stack>
    )
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <ProtectedLayout />
        </AuthProvider>
    )
}