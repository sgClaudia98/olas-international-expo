import React from "react";
import Page from "@/components/layout/Page";
import Login from "@/modules/auth/pages/Login";
import { Colors } from "@/styles";

export default function LoginScreen() {
  return (
    <Page backgroundColor={Colors.black.fifth}>
      <Login />
    </Page>
  );
}
