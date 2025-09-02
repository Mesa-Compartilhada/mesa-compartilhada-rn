import { useState } from "react";
import { Image, View } from "react-native";
import { launchImageLibraryAsync } from 'expo-image-picker'
import IconButton from "./iconButton";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
    callback: (base64: string) => void
}

export default function ImagePickerButton({ callback }: Props) {

    async function pickImage() {
        let result = await launchImageLibraryAsync({
            mediaTypes: ['images'],
            base64: true,
            quality: 1
        })
        
        if(!result.canceled && result.assets[0]) {
            let base64 = result.assets[0].base64
            if(base64) {
                callback(base64)
            }
        }
        else {
            // console.warn("Cancelado")
        }
    }

    return (
        <View>
            <IconButton icon={<MaterialIcons name="photo-camera" size={24} color={"white"} />} onPress={pickImage} />
        </View>
    )
}