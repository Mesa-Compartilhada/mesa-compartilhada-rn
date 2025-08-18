import { Picker } from "@react-native-picker/picker"
import React, { useState } from "react"

type Props = {
    values: { key: string, value: string }[],
    onChange: (key: string) => void
}

export default function PickerDefault({ values, onChange }: Props) {
    const [selectedValue, setSelectedValue] = useState<{ key: string, value: string }>(values[0])
    return (
        <Picker
            selectedValue={selectedValue.key}
            onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(values[itemIndex])
                onChange(itemValue)
            }}
        >
            {
                values.map((item, index) => (
                    <Picker.Item key={index} label={item.value} value={item.key} />
                ))
            }
        </Picker>
    )
}