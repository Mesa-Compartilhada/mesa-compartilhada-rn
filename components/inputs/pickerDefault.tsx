import { Picker } from "@react-native-picker/picker"
import React, { useState } from "react"

type Props = {
    values: string[]
}

export default function PickerDefault({ values }: Props) {
    const [selectedValue, setSelectedValue] = useState()
    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue)
            }}
        >
            {
                values.map((item) => (
                    <Picker.Item label={item} value={item} />
                ))
            }
        </Picker>
    )
}