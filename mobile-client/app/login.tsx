import Button from "@/components/Button";
import Input from "@/components/Input";
import { Link, router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";

const login = () => {
  return (
    <SafeAreaView className="bg-dark-300 flex-1">
      <TouchableOpacity onPress={() => router.push("/")} className="p-3 ml-2">
        <Icon name="arrowleft" size={30} color="#fff" />
      </TouchableOpacity>
      <View className="w-screen h-[80vh] flex-col justify-center items-center">
        <View className="w-full flex flex-col justify-center items-center">
          <Text className="text-2xl text-white font-bold">Entrar</Text>
          <Text className="text-grey">Insira seus dados para continuar</Text>
        </View>
        <View className="mt-3 w-[80%] mx-auto">
          <Input placeholder="E-mail" />
          <Input placeholder="Senha" password={true}/>
          <Button text="Entrar" />
          <View className="flex flex-row mt-5 w-full justify-center">
            <Text className="text-grey px-2">Ainda não tem uma conta?</Text>
            <Link href="/register">
              <Text className="text-theme text-center">Registre-se</Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default login;
