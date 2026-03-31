import { View, SafeAreaView } from "react-native";
import Chat from "@/src/components/chatbot/chat";
import CustomHeader from "@/src/components/header/customHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";
import React from "react";

export default function ChatPage() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 p-4">
                <CustomHeader 
                    icon={<MaterialIcons name="chat" size={32} color={Colors.azul} />} 
                    title="Assistente IA" 
                />
                <View className="flex-1">
                    <Chat />
                </View>
            </View>
        </SafeAreaView>
    );
}
