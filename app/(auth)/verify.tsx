import Breadcrumb from "@/components/Breadcrumb";
import Page from "@/components/layout/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Verify from "@/modules/auth/pages/Verify";
import { homeBreadcrumItem } from "@/modules/marketplace/utils/breadcrumbBuild";
import { Colors } from "@/styles";
import { breadcrumbContainer } from "@/styles/page";
import { useLocalSearchParams } from "expo-router";
import { t } from "i18next";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function VerifyScreen() {
  const { email, token } = useLocalSearchParams();

  return (
    <>
      <View style={styles.breadcrumbContainer}>
        <Breadcrumb items={[homeBreadcrumItem, { label: t("PAGE.VERIFY") }]} />
      </View>
      <Verify email={email as string} token={token as string}></Verify>
    </>
  );
}

const styles = StyleSheet.create({
  breadcrumbContainer,
});
