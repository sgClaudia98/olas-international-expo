import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { OrderDetail } from "@/modules/marketplace/pages/OrderDetail";

export default function OrdersScreen() {
  const { id } = useLocalSearchParams();
  
  if (typeof id !== "string") {
    return <ThemedText>Invalid order ID</ThemedText>; // Handle the case where id is not a string
  }
  
  return <OrderDetail id={id}/>
}
