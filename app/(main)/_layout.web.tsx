import { Stack, Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabLayout() {

  return (
     <Stack
      screenOptions={({ route }) => ({
        tabBarPosition: 'bottom',
        headerShown: true,
      })}
    >
      <Stack.Screen name="explore" options={{ headerShown: false, title: "EXPLORE"}} />
      <Stack.Screen name="new" options={{ }} />
      <Stack.Screen name="information" options={{ }} />
      <Stack.Screen name="settings" options={{  }} />
    </Stack>
  );
}
