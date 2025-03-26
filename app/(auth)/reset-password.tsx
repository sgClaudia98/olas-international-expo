import Page from "@/components/layout/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ForgotPassword from "@/modules/auth/pages/ForgotPassword";
import { Colors } from "@/styles";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function ResetPasswordScreen() {
  const { email, token } = useLocalSearchParams<{email:string, token:string}>();

  return (
    <Page backgroundColor={Colors.black.fifth}>
      <ForgotPassword  email={email as string} token={token as string} />
    </Page>
  );
}
