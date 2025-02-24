// I need this to wrap in one file all the providers of the app
import React from "react";
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

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <LocationProvider>{children}</LocationProvider>
        </Provider>
      </PaperProvider>
    </ThemeProvider>
  );
};
