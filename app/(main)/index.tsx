import { ThemedText } from "@/components/ThemedText";
import Constants from "expo-constants";
import { Redirect, Slot, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

export default function NewScreen() {
  return <Redirect href="/(main)/services/market" />;
}
