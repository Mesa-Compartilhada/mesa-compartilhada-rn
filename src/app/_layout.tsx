import '@/global.css';
import { Stack } from 'expo-router';
import Logo from '@/src/assets/images/mc_logo_fruteira.svg'
import CustomHeader from '@/src/components/header/customHeader';
import { View } from 'react-native';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="login/index" options={{ title: "Login", }} />
            <Stack.Screen name="cadastro/index" options={{ title: "Cadastro" }} />
        </Stack>
    )
}