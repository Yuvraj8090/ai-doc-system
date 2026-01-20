import { Redirect } from "expo-router";

export default function Index() {
  // In the future, we will check for a stored token here.
  // For now, redirect straight to login.
  return <Redirect href="/(auth)/login" />;
}