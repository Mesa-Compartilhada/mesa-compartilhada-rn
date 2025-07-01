import '@/global.css';
import { Stack } from 'expo-router';
import Logo from '@/assets/images/mc_logo_fruteira.svg'
import CustomHeader from '@/components/header/customHeader';
import { View } from 'react-native';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" 
                options={{header: () => 
                <View className='px-2'>
                    <CustomHeader 
                        icon={<Logo width={50} />}
                        title='Mesa Compartilhada'
                    />
                </View>
                }}
            />
            <Stack.Screen name="login/index" options={{ title: "Login" }} />
            <Stack.Screen name="cadastro/index" options={{ title: "Cadastro" }} />
        </Stack>
    )
}