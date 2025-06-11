import React from "react";
import { TextInput, View } from "react-native";

interface InputProps {
  placeholder: string,
  password?: boolean
}

const Input = ({ placeholder, password }: InputProps) => {
  return (
    <View className="mt-3 mx-auto bg-dark-200 rounded-xl px-5 py-4 w-full">
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#4B4C54"
        className="text-grey"
        secureTextEntry={password}
      />
    </View>
  );
};

export default Input;
