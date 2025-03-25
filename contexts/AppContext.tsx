// I need this to wrap in one file all the providers of the app
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../state";
import { LocationProvider } from "./locationContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import theme from "@/styles/paperTheme";
import { MainLayoutProvider } from "./mainLayoutContext";
import ToastManager from "toastify-react-native";
import Fonts from "@/styles/fonts";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <LocationProvider>
            <ToastManager textStyle={{
              fontFamily: Fonts.regular,
              fontSize: 16,
            }} animationInTiming={500} animationOutTiming={500} height={"auto"} duration={20000} animationStyle={"upInUpOut"} position={"top"} positionValue={2}/>
            <MainLayoutProvider>{children}</MainLayoutProvider>
          </LocationProvider>
        </Provider>
      </PaperProvider>
    </ThemeProvider>
  );
};
