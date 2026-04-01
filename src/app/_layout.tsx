import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "../context/AuthContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }} >
            <AuthProvider>
                <PaperProvider>
                    <Stack>
                        <Stack.Screen name="(drawer)" options={ { headerShown: false } } />
                    </Stack>
                </PaperProvider>
            </AuthProvider>
        </GestureHandlerRootView>
    )
}