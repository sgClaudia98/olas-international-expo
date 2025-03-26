import Breadcrumb from "@/components/Breadcrumb";
import Page from "@/components/layout/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ForgotPassword from "@/modules/auth/pages/ForgotPassword";
import { homeBreadcrumItem } from "@/modules/marketplace/utils/breadcrumbBuild";
import { Colors } from "@/styles";
import { breadcrumbContainer } from "@/styles/page";
import { useLocalSearchParams } from "expo-router";
import { t } from "i18next";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function ResetPasswordScreen() {
  const { email, token } = useLocalSearchParams<{
    email: string;
    token: string;
  }>();

  return (
    <Page backgroundColor={Colors.black.fifth}>
      <View style={styles.breadcrumbContainer}>
        <Breadcrumb
          items={[homeBreadcrumItem, { label: t("PAGE.RESET_PASSWORD") }]}
        />
      </View>
      <ForgotPassword email={email as string} token={token as string} />
    </Page>
  );
}

const styles = StyleSheet.create({
  breadcrumbContainer,
});
