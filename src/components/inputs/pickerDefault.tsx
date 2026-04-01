import { Picker } from "@react-native-picker/picker"
import React, { useState } from "react"
import { View } from "react-native"

type Props = {
    values: { key: number, value: string }[],
    onChange: (key: number) => void
}

export default function PickerDefault({ values, onChange }: Props) {
    const [selectedValue, setSelectedValue] = useState<{ key: number, value: string }>(values[0])
    return (
        <View className="border-2 border-azul rounded-2xl bg-white overflow-hidden px-2">
            <Picker
                selectedValue={selectedValue?.key}
                onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(values[itemIndex])
                    onChange(itemValue)
                }}
                dropdownIconColor="#62C0C0"
                style={{ height: 60 }}
            >
                {
                    values.map((item, index) => (
                        <Picker.Item 
                            key={index} 
                            label={item.value} 
                            value={item.key} 
                            style={{ fontSize: 18, color: '#003B5D' }}
                        />
                    ))
                }
            </Picker>
        </View>
    )
}
