import { Tabs } from "expo-router";
import React from "react";
import { AuthRequestModal } from "@/components/layout/AuthRequestModal";
import IconSvg from "@/components/ui/IconSvg";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarPosition: "bottom",
          headerShown: true,
        })}
      >
        <Tabs.Screen
          name="explore"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSvg size={28} name="Home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            animation: "shift",
            tabBarIcon: ({ color }) => (
              <IconSvg size={28} name="User" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="information"
          options={{
            animation: "shift",
            tabBarIcon: ({ color }) => (
              <IconSvg size={28} name="Help" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            animation: "shift",
            tabBarIcon: ({ color }) => (
              <IconSvg size={28} name="Settings" color={color} />
            ),
          }}
        />
      </Tabs>
      <AuthRequestModal />
    </>
  );
}
