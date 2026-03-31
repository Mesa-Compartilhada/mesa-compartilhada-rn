import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Sou o assistente do Mesa Compartilhada. Como posso ajudar você hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulando resposta da IA
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Entendi sua dúvida. Como sou um modelo de IA em treinamento, estou aqui para ajudar você a entender melhor como o Mesa Compartilhada funciona!",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  useEffect(() => {
    // Scroll para o final quando houver novas mensagens
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === "user";

    return (
      <View
        className={`flex-row mb-4 ${
          isUser ? "justify-end" : "justify-start"
        }`}
      >
        {!isUser && (
          <View className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center mr-2 mt-auto">
             <MaterialIcons name="smart-toy" size={20} color={Colors.azul} />
          </View>
        )}
        <View
          style={{
            backgroundColor: isUser ? Colors.azul : "#E5E7EB",
            maxWidth: "75%",
            borderRadius: 15,
            borderBottomRightRadius: isUser ? 2 : 15,
            borderBottomLeftRadius: isUser ? 15 : 2,
          }}
          className="p-3 shadow-sm"
        >
          <Text
            style={{ color: isUser ? "white" : "#1F2937" }}
            className="text-base"
          >
            {item.text}
          </Text>
          <Text
            style={{ color: isUser ? "#E5E7EB" : "#6B7280" }}
            className="text-xs mt-1 text-right"
          >
            {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      className="flex-1"
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      />

      <View className="flex-row items-center p-2 border-t border-gray-100 bg-white">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-base max-h-24"
          placeholder="Digite sua dúvida..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          onPress={sendMessage}
          disabled={inputText.trim().length === 0}
          className="ml-2 w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: inputText.trim().length > 0 ? Colors.azul : "#D1D5DB" }}
        >
          <MaterialIcons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
