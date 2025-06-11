import Button from "@/components/Button";
import Input from "@/components/Input";
import { UseAuth } from "@/hooks/useAuth";
import { registerSchema, RegisterSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";

const Register = () => {
  const { status, mutate, isPending } = UseAuth(
    process.env.EXPO_PUBLIC_API_REGISTER
  );

  const HandleRegister = (data: RegisterSchema) => {
    mutate(data);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (status.success) {
      reset();
    }
  }, [status]);

  return (
    <SafeAreaView className="bg-dark-300 flex-1">
      <TouchableOpacity onPress={() => router.push("/")} className="p-3 ml-2">
        <Icon name="arrowleft" size={30} color="#fff" />
      </TouchableOpacity>
      <View className="w-screen h-[80vh] flex-col justify-center items-center">
        <View className="w-full flex flex-col justify-center items-center">
          <Text className="text-2xl text-white font-bold">Registrar</Text>
          <Text className="text-grey">Crie uma conta para começar.</Text>
        </View>
        <View className="mt-3 w-[80%] mx-auto">
          <Input
            placeholder="E-mail"
            name="email"
            control={control}
            error={errors?.email?.message}
          />
          <Input
            placeholder="Usuario"
            name="user"
            control={control}
            error={errors?.user?.message}
          />
          <Input
            placeholder="Senha"
            name="password"
            password={true}
            control={control}
            error={errors?.password?.message}
          />
          <View className="text-white text-sm font-thin h-10 text-center flex justify-center items-center">
            {isPending ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-white text-md text-center">
                {status.message}
              </Text>
            )}
          </View>
          <Button text="Registrar" onPress={handleSubmit(HandleRegister)} />
          <View className="flex flex-row mt-5 w-full justify-center">
            <Text className="text-grey px-2">Já possui uma conta?</Text>
            <Link href="/Login">
              <Text className="text-theme">Entre</Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
