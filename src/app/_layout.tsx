import '@/global.css';
import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="login/index" options={{ title: "Login", }} />
            <Stack.Screen name="cadastro/index" options={{ title: "Cadastro" }} />
        </Stack>
    )
}