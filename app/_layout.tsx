import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { Platform } from "react-native";
import { screenHeaderLogoOption } from "@/components/layout";
import { AppProviders } from "@/contexts/AppContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppProviders>
      <Stack
        screenOptions={({ route }) =>
          route.path != "/promos"
            ? {
                ...screenHeaderLogoOption,
                headerStyle: { backgroundColor: "white" },
              }
            : { headerShown: false }
        }
      />
      <StatusBar style="auto" />
    </AppProviders>
  );
}
