import Page from "@/components/layout/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ProductsWrapper from "@/modules/marketplace/pages/ProductsWrapper";
import React from "react";

export default function NewScreen() {
  return (
    <Page>
      <ProductsWrapper/>
    </Page>
  );
}
