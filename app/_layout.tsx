import React from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import '@/i18n'; 

import { Text, View } from "react-native";
import { screenHeaderLogoOption } from "@/components/layout";
import { AppProviders } from "@/contexts/AppContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { BREAKPOINTS, useBreakpoints } from "@/hooks/useBreakpoints";
import SidePanel from "@/components/layout/SidePanel";
import { OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from "@expo-google-fonts/open-sans";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { Toast } from "toastify-react-native";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    OpenSansRegular: OpenSans_400Regular,
    OpenSansSemiBold: OpenSans_600SemiBold,
    OpenSansBold: OpenSans_700Bold,
    Font: OpenSans_400Regular
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
                    headerShadowVisible: false,
                    drawerType: "back",   
                    initialRouteName: "/(main)/services/market",
                    headerStyle: { backgroundColor: "white" },
                  }
                : { headerShown: false }
            }
          />
        </GestureHandlerRootView>
     
      <StatusBar style="auto" />
    </AppProviders>
  );
}
