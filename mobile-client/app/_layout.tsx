import { Stack } from "expo-router";
import '../global.css'
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
    <StatusBar  hidden={true}/>
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="register" options={{headerShown: false}}/>
      <Stack.Screen name="login" options={{headerShown: false}}/>
    </Stack>
    </>
  )
}
