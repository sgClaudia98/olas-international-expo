import { Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { AuthRequestModal } from '@/components/layout/AuthRequestModal';

export default function TabLayout() {

  return (
    <>
     <Tabs
      screenOptions={({ route }) => ({
        tabBarPosition: 'bottom',
        headerShown: true,
      })}
    >
      <Tabs.Screen name="explore" options={{ headerShown: false, title: "Home",   tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />}} />
      <Tabs.Screen name="new" options={{ animation: "shift",   tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />, }} />
      <Tabs.Screen name="information" options={{ animation: "shift",   tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />, }} />
      <Tabs.Screen name="settings" options={{ animation: "shift",   tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />, }} />
    </Tabs>
      <AuthRequestModal />
      </>
  );
}
