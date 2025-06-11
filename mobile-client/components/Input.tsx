import React from "react";
import { Control, Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

interface InputProps {
  placeholder: string;
  password?: boolean;
  control?: any;
  name: string,
  error?: string
}

const Input = ({ placeholder, password, control, name, error }: InputProps) => {
  return (
    <View className={`mt-3 mx-auto bg-dark-200 rounded-xl px-5 py-4 w-full ${error && 'border border-red-500'}`}>
      <Controller
        name = {name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor="#4B4C54"
            className="text-grey"
            secureTextEntry={password}
          />
        )}
      />
      <Text className="text-sm text-red-500">{error}</Text>
    </View>
  );
};

export default Input;
