import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

export default function PromosScreen() {
  const router = useRouter();
  const navigationState = useRootNavigationState(); // Check if navigation is ready

  useEffect(() => {
    if (Platform.OS === "web" && navigationState?.key) {
      // @ts-ignore
      router.push("/non-existent-route");
    }
  }, [navigationState?.key]); // Wait for navigation to be ready

  if (Platform.OS == "web") {
    return null;
  }

  return (
    <ThemedView>
      <ThemedText type="title">Promos</ThemedText>
      <ThemedText>This is a new screen</ThemedText>
    </ThemedView>
  );
}
