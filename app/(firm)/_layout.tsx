import { Stack } from "expo-router";

export default function FirmLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="generate-qr" />
    </Stack>
  );
}