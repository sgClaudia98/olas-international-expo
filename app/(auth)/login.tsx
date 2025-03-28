import React from "react";
import Page from "@/components/layout/Page";
import Login from "@/modules/auth/pages/Login";
import { Colors } from "@/styles";
import Breadcrumb from "@/components/Breadcrumb";
import { homeBreadcrumItem } from "@/modules/marketplace/utils/breadcrumbBuild";
import { breadcrumbContainer } from "@/styles/page";
import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
  const { t } = useTranslation();
  return (
    <>
      <View style={styles.breadcrumbContainer}>
        <Breadcrumb items={[homeBreadcrumItem, { label: t("PAGE.LOGIN") }]} />
      </View>
      <Login />
    </>
  );
}

const styles = StyleSheet.create({
  breadcrumbContainer,
});
