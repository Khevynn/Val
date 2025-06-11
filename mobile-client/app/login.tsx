import Button from "@/components/Button";
import Input from "@/components/Input";
import { UseAuth } from "@/hooks/useAuth";
import { loginSchema, LoginSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";

const Login = () => {
  const { status, mutate, isPending } = UseAuth(
    process.env.EXPO_PUBLIC_API_AUTH
  );

  const HandleLogin = (data: LoginSchema) => {
    mutate(data);
  };
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  
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
          {/* Email */}
          <Input
            placeholder="E-mail"
            control={control}
            name="email"
            error={errors?.email?.message}
          />

          {/* Password */}
          <Input
            placeholder="Senha"
            password={true}
            control={control}
            name="password"
            error={errors?.password?.message}
          />
          {/* Warnings */}
          <View className="h-10 text-center flex justify-center items-center">
            {isPending ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-white text-md text-center">
                {status.message}
              </Text>
            )}
          </View>

          <Button text="Entrar" onPress={handleSubmit(HandleLogin)} />
          <View className="flex flex-row mt-5 w-full justify-center">
            <Text className="text-grey px-2">Ainda não tem uma conta?</Text>
            <Link href="/Register">
              <Text className="text-theme text-center">Registre-se</Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
