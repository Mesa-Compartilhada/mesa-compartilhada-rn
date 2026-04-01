import '@/global.css';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Text, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { PaperProvider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { TipoEmpresa } from '../../constants/enums';
import { Colors } from '../../constants/Colors';
import React from 'react';

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { isLoggedIn, logoutUser, userInfo } = useAuth()
    const router = useRouter()

    return (
        <DrawerContentScrollView className="bg-branco">
            <View className="px-6 py-10 mb-4 bg-azul/5 rounded-b-3xl gap-4"
                onTouchEnd={() => {    
                    if(userInfo && userInfo.id) {
                        router.push({pathname: '/(drawer)/perfil/[userId]', params: { userId: userInfo.id }})
                    }
                    else {
                        router.push({pathname: '/login'})
                    }
                }}
            >
                <View className="shadow-sm">
                    {userInfo?.fotoPerfil ? (
                        <Image
                            key={userInfo.fotoPerfil}
                            className="w-20 h-20 rounded-2xl border-2 border-white"
                            source={{
                            uri: userInfo.fotoPerfil,
                            }}
                        />
                        ) : (
                        <View className="w-20 h-20 rounded-2xl bg-azul justify-center items-center border-2 border-white">
                            <MaterialIcons name="account-circle" size={50} color="white" />
                        </View>
                        )}
                </View>
                <View>
                    <Text className='text-xl font-extrabold text-azulEscuro'>{ userInfo ? userInfo.nome : "Acesse sua conta" }</Text>
                    {userInfo && <Text className="text-azul text-xs font-semibold uppercase tracking-wider">{userInfo.tipo === TipoEmpresa.DOADORA ? "Doador" : "Instituição"}</Text>}
                </View>
            </View>
            <DrawerItemList {...props} />
            {
                isLoggedIn
                &&
                <View className="mt-4 pt-4 border-t border-gray-100">
                    <DrawerItem 
                        label="Sair"
                        labelStyle={{ color: '#FF6600', fontWeight: 'bold' }}
                        onPress={() => logoutUser()}
                        icon={({ color, size }) => <MaterialIcons  
                            name='logout'
                            size={size}
                            color="#FF6600"
                        /> }
                    />
                </View>
            }
        </DrawerContentScrollView>
    )
}

export default function ProtectedLayout() {
    const { isLoggedIn, userInfo } = useAuth()

    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: Colors.branco,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f3f4f6',
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    color: Colors.azulEscuro,
                },
                headerTintColor: Colors.azul,
                drawerActiveBackgroundColor: Colors.azul + '10',
                drawerActiveTintColor: Colors.azulEscuro,
                drawerInactiveTintColor: Colors.azul + '90',
                drawerLabelStyle: {
                    fontWeight: '700',
                },
                drawerStyle: {
                    width: '80%',
                },
                drawerItemStyle: {
                    borderRadius: 16,
                    marginHorizontal: 12,
                    paddingHorizontal: 8,
                }
            }}
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
            <Drawer.Screen name="chat/index" options={{ title: "Chat",
                drawerIcon: ({color, size}) => <MaterialIcons name='chat' size={size} color={color} />
                }} />
            <Drawer.Protected guard={isLoggedIn}>
                <Drawer.Screen name="(tabs)" options={{ title: "Início", headerShown: false, drawerIcon: ({color, size}) => <MaterialIcons name='house' size={size} color={color} /> }} />
                <Drawer.Screen name="perfil/[userId]" options={{ drawerItemStyle: { display: "none" } }} />
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
            <Drawer.Protected guard={isLoggedIn && userInfo?.tipo === TipoEmpresa.RECEBEDORA}>
                <Drawer.Screen name="lista-doacoes/index" options={{ title: "Doações",
                drawerIcon: ({color, size}) => <MaterialIcons name='food-bank' size={size} color={color} />
                }} />
            </Drawer.Protected>
            <Drawer.Protected guard={isLoggedIn && userInfo?.tipo === TipoEmpresa.DOADORA}>
                <Drawer.Screen name="criar-doacao/index" options={{ title: "Criar doações",
                drawerIcon: ({color, size}) => <MaterialIcons name='add' size={size} color={color} />
                }} />
            </Drawer.Protected>
            <Drawer.Screen name="recuperar-senha/index" options={{ title: "Recuperação de senha",
                drawerIcon: ({color, size}) => <MaterialIcons name='password' size={size} color={color} />
            }} />
        </Drawer>
    )
}