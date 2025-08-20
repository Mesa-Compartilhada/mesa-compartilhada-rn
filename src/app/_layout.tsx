import '@/global.css';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { PaperProvider } from 'react-native-paper';
import { useRouter } from 'expo-router';

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { isLoggedIn, logoutUser, userInfo } = useAuth()
    const router = useRouter()

    return (
        <DrawerContentScrollView>
            <View className='bg-purple-400 rounded-lg p-2 my-8 flex flex-row items-center gap-4'
                onTouchEnd={() => {    
                    if(userInfo) {
                        router.push({pathname: '/perfil/[userId]', params: { userId: userInfo ? userInfo.id : undefined }})
                    }
                    else {
                        router.push({pathname: '/login'})
                    }
                }}
            >
                <MaterialIcons name='account-circle' size={75} color={"white"} />
                <Text className='text-white'>{ userInfo ? userInfo.nome : "Acesse sua conta" }</Text>
            </View>
            <DrawerItemList {...props} />
            {
                isLoggedIn
                &&
                <View>
                    <DrawerItem 
                        label="Sair"
                        onPress={() => logoutUser()}
                        icon={({ color, size }) => <MaterialIcons  
                            name='logout'
                            size={size}
                            color={color}
                        /> }
                    />
                </View>
            }
        </DrawerContentScrollView>
    )
}

function ProtectedLayout() {
    const { isLoggedIn, userInfo } = useAuth()

    return (
        <GestureHandlerRootView>
            <Drawer
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Protected guard={!isLoggedIn}>
                    <Drawer.Screen name="index" options={{ title: "Bem-vindo",
                        drawerIcon: ({color, size}) => <MaterialIcons name='home' size={size} color={color} />
                    }} />
                    <Drawer.Screen name="login/index" options={{ title: "Login", 
                        drawerIcon: ({color, size}) => <MaterialIcons name='login' size={size} color={color} />
                    }} />
                    <Drawer.Screen name="cadastro/index" options={{ title: "Cadastro",
                        drawerIcon: ({color, size}) => <MaterialIcons name='app-registration' size={size} color={color} />
                     }} />
                </Drawer.Protected>
                <Drawer.Protected guard={isLoggedIn}>
                    <Drawer.Screen name='dashboard/index' options={{ title: "Dashboard", 
                        drawerIcon: ({color, size}) => <MaterialIcons name='dashboard' size={size} color={color} /> }} 
                    />
                    <Drawer.Screen name='perfil/[userId]' initialParams={{ userId: userInfo ? userInfo.id : undefined }} options={{ title: "Meu Perfil", 
                        drawerIcon: (({color, size}) => <MaterialIcons name='account-circle' size={size} color={color} />)
                    }} />
                </Drawer.Protected>
            </Drawer>
            
        </GestureHandlerRootView>
    )
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <PaperProvider>
                <ProtectedLayout />
            </PaperProvider>
        </AuthProvider>
    )
}