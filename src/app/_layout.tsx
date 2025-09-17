import '@/global.css';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Text, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { PaperProvider } from 'react-native-paper';
import { useRouter } from 'expo-router';

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { isLoggedIn, logoutUser, userInfo } = useAuth()
    const router = useRouter()

    return (
        <DrawerContentScrollView>
            <View className={"p-2 my-8 flex flex-row items-center gap-4"}
                onTouchEnd={() => {    
                    if(userInfo) {
                        router.push({pathname: '/perfil/[userId]', params: { userId: userInfo ? userInfo.id : undefined }})
                    }
                    else {
                        router.push({pathname: '/login'})
                    }
                }}
            >
                <View>
                    {userInfo?.fotoPerfil ? (
                        <Image
                            key={userInfo.fotoPerfil}
                            className="w-20 h-20 rounded-full"
                            source={{
                            uri: userInfo.fotoPerfil,
                            }}
                        />
                        ) : (
                        <View className="w-20 h-20 rounded-full bg-gray-600 justify-center items-center">
                            <MaterialIcons name="account-circle" size={70} color="white" />
                        </View>
                        )}
                </View>
                <Text className=''>{ userInfo ? userInfo.nome : "Acesse sua conta" }</Text>
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
                    <Drawer.Screen name="recuperar-senha/index" options={{ title: "Recuperação de senha",
                        drawerIcon: ({color, size}) => <MaterialIcons name='password' size={size} color={color} />
                    }} />
                </Drawer.Protected>
                <Drawer.Protected guard={isLoggedIn}>
                    <Drawer.Screen name='dashboard/index' options={{ title: "Dashboard", 
                        drawerIcon: ({color, size}) => <MaterialIcons name='dashboard' size={size} color={color} /> }} 
                    />
                    <Drawer.Screen name='perfil/[userId]' options={{ drawerItemStyle: { display: "none" }, title: "Perfil", 
                        drawerIcon: ({color, size}) => <MaterialIcons name='account-circle' size={size} color={color} /> }} 
                    />
                    <Drawer.Screen name='doacao/[doacao]' options={{ drawerItemStyle: { display: "none" }, title: "Doação", 
                        drawerIcon: ({color, size}) => <MaterialIcons name='account-circle' size={size} color={color} /> }} 
                    />
                    <Drawer.Screen name='conta/index' options={{ drawerItemStyle: { display: "none" }, title: "Conta", 
                        drawerIcon: ({color, size}) => <MaterialIcons name='settings' size={size} color={color} /> }} 
                    />
                    <Drawer.Screen name='configuracoes/index' options={{ title: "Configurações", 
                        drawerIcon: ({color, size}) => <MaterialIcons name='settings' size={size} color={color} /> }} 
                    />
                    <Drawer.Screen name='historico/index' options={{ title: "Historico", 
                        drawerIcon: ({color, size}) => <MaterialIcons name='history' size={size} color={color} /> }} 
                    />
                </Drawer.Protected>
                <Drawer.Protected guard={isLoggedIn && userInfo?.tipo === "RECEBEDORA"}>
                    <Drawer.Screen name="lista-doacoes/index" options={{ title: "Doações",
                    drawerIcon: ({color, size}) => <MaterialIcons name='food-bank' size={size} color={color} />
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