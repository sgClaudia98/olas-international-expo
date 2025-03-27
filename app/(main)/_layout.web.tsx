import { Stack, Tabs } from "expo-router";
import React, { useEffect } from "react";
import * as SystemUI from 'expo-system-ui';
import { IconSymbol } from "@/components/ui/IconSymbol";
import { AuthRequestModal } from "@/components/layout/AuthRequestModal";

export default function TabLayout() {
  useEffect(() => {

    SystemUI.setBackgroundColorAsync("#fffff");
  }, [])
  return (
    <>
      <Stack
        screenOptions={({ route }) => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="explore"
          options={{ headerShown: false, title: "EXPLORE" }}
        />
        <Stack.Screen name="profile" options={{}} />
        <Stack.Screen name="information" options={{}} />
        <Stack.Screen name="settings" options={{}} />
      </Stack>
      <AuthRequestModal />
    </>
  );
}
