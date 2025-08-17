import '@/global.css';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { isLoggedIn, logoutUser } = useAuth()

    return (
        <DrawerContentScrollView>
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
    const { isLoggedIn } = useAuth()

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
                        drawerIcon: ({color, size}) => <MaterialIcons name='account-circle' size={size} color={color} />
                     }} />
                </Drawer.Protected>
                <Drawer.Protected guard={isLoggedIn}>
                    <Drawer.Screen name='dashboard/index' options={{ title: "Dashboard", 
                        drawerIcon: ({color, size}) => <MaterialIcons name='dashboard' size={size} color={color} /> }} 
                    />
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