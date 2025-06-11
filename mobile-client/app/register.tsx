import Button from "@/components/Button";
import Input from "@/components/Input";
import { Link, router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";

const register = () => {
  return (
    <SafeAreaView className="bg-dark-300 flex-1">
      <TouchableOpacity
        onPress={() => router.push("/")}
        className="p-3 ml-2"
      >
        <Icon name="arrowleft" size={30} color="#fff" />
      </TouchableOpacity>
      <View className="w-screen h-[80vh] flex-col justify-center items-center">
        <View className="w-full flex flex-col justify-center items-center">
          <Text className="text-2xl text-white font-bold">Registrar</Text>
          <Text className="text-grey">Crie uma conta para começar.</Text>
        </View>
        <View className="mt-3 w-[80%] mx-auto">
          <Input placeholder="E-mail" />
          <Input placeholder="Usuario" />
          <Input placeholder="Senha" password={true}/>
          <Button text="Registrar" />
          <View className="flex flex-row mt-5 w-full justify-center">
            <Text className="text-grey px-2">Já possui uma conta?</Text>
            <Link href="/login">
              <Text className="text-theme">Entre</Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default register;
