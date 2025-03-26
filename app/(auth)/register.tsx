import Breadcrumb from "@/components/Breadcrumb";
import Page from "@/components/layout/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Register from "@/modules/auth/pages/Register";
import { homeBreadcrumItem } from "@/modules/marketplace/utils/breadcrumbBuild";
import { Colors } from "@/styles";
import { breadcrumbContainer } from "@/styles/page";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";

export default function RegisterScreen() {
  const { t } = useTranslation();
  return (
    <Page backgroundColor={Colors.black.fifth}>
      <View style={styles.breadcrumbContainer}>
        <Breadcrumb
          items={[homeBreadcrumItem, { label: t("PAGE.REGISTER") }]}
        />
      </View>
      <Register />
    </Page>
  );
}

const styles = StyleSheet.create({
  breadcrumbContainer,
});
