import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../global.css";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <>
      <StatusBar hidden={true} />
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Register" options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </>
  );
}
