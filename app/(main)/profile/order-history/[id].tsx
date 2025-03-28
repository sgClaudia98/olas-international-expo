import React from "react";
import { Profile } from "@/modules/auth/pages/Profile";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { OrderHistory } from "@/modules/marketplace/pages/OrderHistory";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { OrderDetail } from "@/modules/marketplace/pages/OrderDetail";

export default function OrdersScreen() {
  const { id } = useLocalSearchParams();
  
  if (typeof id !== "string") {
    return <ThemedText>Invalid order ID</ThemedText>; // Handle the case where id is not a string
  }
  
  return <OrderDetail id={id}/>
}
