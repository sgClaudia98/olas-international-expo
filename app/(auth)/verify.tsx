import Page from "@/components/layout/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Verify from "@/modules/auth/pages/Verify";
import { Colors } from "@/styles";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function VerifyScreen() {
  const { email, token } = useLocalSearchParams();

  return (
    <Page backgroundColor={Colors.black.fifth}>
      <Verify email={email as string} token={token as string}></Verify>
    </Page>
  );
}
