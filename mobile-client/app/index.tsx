import Button from "@/components/Button";
import { images } from "@/constants/images";
import { Link, router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-dark-300">
      <View className="flex-1 justify-center items-center">
        <Image source={images.logo} className="w-10 h-10" />
        <Text className="text-white text-2xl mt-3"> Bem-vindo </Text>
        <Text className="text-grey">Mantenha-se conectado</Text>
        <View className="w-[80%]">
          <Button text="Entrar" onPress={() => router.push("/Login")} />
        </View>
        <View className="flex flex-row mt-5">
          <Text className="text-grey px-2">Ainda não tem uma conta?</Text>
          <Link href="/Register">
            <Text className="text-theme ">Registre-se</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
