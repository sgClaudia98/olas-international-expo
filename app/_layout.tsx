import React from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { Text, View } from "react-native";
import { screenHeaderLogoOption } from "@/components/layout";
import { AppProviders } from "@/contexts/AppContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import SidePanel from "@/components/layout/SidePanel";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isMobile } = useBreakpoints();
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

  console.debug("isMobile", isMobile);
  return (
    <AppProviders>
      {isMobile ? (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            drawerContent={(props) => {
              return <SidePanel {...props} />;
            }}
            screenOptions={({ route, navigation }) =>
              route.path != "/promos"
                ? {
                    ...screenHeaderLogoOption({ navigation }),
                    drawerPosition: "right",
                    drawerType: "back",
                    headerStyle: { backgroundColor: "white" },
                  }
                : { headerShown: false }
            }
          />
        </GestureHandlerRootView>
      ) : (
        <Stack
          screenOptions={({ route, navigation }) =>
            route.path != "/promos"
              ? {
                  ...screenHeaderLogoOption({ navigation }),
                  headerStyle: { backgroundColor: "white" },
                }
              : { headerShown: false }
          }
        />
      )}
      <StatusBar style="auto" />
    </AppProviders>
  );
}
