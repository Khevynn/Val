import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface ButtonProps {
    text: string,
    onPress?: () => void
}

const Button = ({text, onPress}: ButtonProps) => {
  return (
    <TouchableOpacity className="bg-theme w-full rounded-lg py-6 mt-5" onPress={onPress}>
        <Text className="text-white font-bold text-center">{text}</Text>
    </TouchableOpacity>
  )
}

export default Button