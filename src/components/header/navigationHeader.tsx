import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

type HeaderProps = DrawerHeaderProps | BottomTabHeaderProps;

export default function NavigationHeader({ navigation, route, options }: HeaderProps) {
    const title = options.title || route.name;

    return (
        <View className="flex-row items-center px-6 py-4 pt-12 gap-4 bg-branco border-b border-gray-100 shadow-sm">
            <TouchableOpacity 
                className="p-3 bg-azulEscuro/5 rounded-2xl"
                onPress={() => (navigation as any).openDrawer?.()}
            >
                <MaterialIcons name="menu" size={28} color={Colors.azul} />
            </TouchableOpacity>
            <View className="flex-1">
                <Text className="text-2xl font-extrabold text-azulEscuro tracking-tight leading-7">{ title }</Text>
                <View className="h-1 w-8 bg-lAbobora rounded-full mt-1" />
            </View>
        </View>
    );
}
