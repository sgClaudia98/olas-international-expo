import { Stack, Tabs } from "expo-router";
import React from "react";
import { AuthRequestModal } from "@/components/layout/AuthRequestModal";

export default function TabLayout() {
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
