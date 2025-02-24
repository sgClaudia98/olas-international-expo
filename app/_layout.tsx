import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack, useRouter } from "expo-router";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { screenHeaderLogoOption } from "@/components/layout/header";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
      {Platform.OS !== 'web' && (
            <Stack.Screen
              name="promos"
              options={{headerShown: false}}
            />
          )}
          <Stack.Screen
            name="(main)"
            options={{...screenHeaderLogoOption, headerStyle: {backgroundColor: "white",}}}
          />
          <Stack.Screen
            name="(auth)"
            options={{...screenHeaderLogoOption}}
          />
          </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
