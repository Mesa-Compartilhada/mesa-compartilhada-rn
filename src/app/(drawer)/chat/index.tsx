import { View } from "react-native";
import Chat from "@/src/components/chatbot/chat";
import React from "react";

export default function ChatPage() {
    return (
        <View className="flex-1 bg-white p-4">
            <View className="flex-1">
                <Chat />
            </View>
        </View>
    );
}
