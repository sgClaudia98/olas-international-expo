import React from "react";
import { Colors } from "@/styles";
import { Slot } from "expo-router";
import Page from "@/components/layout/Page";

export default function ProfileLayout() {
  return (
    <Page backgroundColor={Colors.black.fifth}>
      <Slot />
    </Page>
  );
}
