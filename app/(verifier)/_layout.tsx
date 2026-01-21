import { Stack } from "expo-router";

export default function VerifierLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="scan-qr" />
      <Stack.Screen name="result" options={{ presentation: 'modal' }} />
      <Stack.Screen name="history" />
    </Stack>
  );
}