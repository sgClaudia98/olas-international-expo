import React, { useEffect } from "react";
import Page from "@/components/layout/Page";
import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import { Colors } from "@/styles";
import Breadcrumb from "@/components/Breadcrumb";
import { homeBreadcrumItem } from "@/modules/marketplace/utils/breadcrumbBuild";
import { useTranslation } from "react-i18next";
import ProfileSideMenu, {
  ProfileSideMenuItem,
} from "@/modules/auth/components/ProfileSideMenu";
import { breadcrumbContainer } from "@/styles/page";
import { useAuth } from "@/modules/auth/context/AuthContext";
import ProtectedRoute from "@/modules/auth/components/ProtectedRoute";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";

export default function ProfileLayout() {
  const { t } = useTranslation();
  const styles = useResponsiveStyles(responsiveStyles);
  const items: ProfileSideMenuItem[] = [
    {
      label: "PAGE.PROFILE",
      route: "/profile",
      icon: "User",
      exact: true,
    },
    {
      label: "PAGE.ORDER_HISTORY",
      route: "/profile/order-history",
      icon: "History",
    },
  ];

  return (
    <ProtectedRoute>
      <Page backgroundColor={Colors.black.fifth}>
        <View style={styles.breadcrumbContainer}>
          <Breadcrumb
            items={[homeBreadcrumItem, { label: t("PAGE.PROFILE") }]}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.sideMenu}>
            <ProfileSideMenu items={items} />
          </View>
          <View style={styles.pageContent}>
            <Slot />
          </View>
        </View>
      </Page>
    </ProtectedRoute>
  );
}

const desktop = StyleSheet.create({
  breadcrumbContainer,
  container: {
    marginTop: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sideMenu: {},
  pageContent: {
    marginLeft: 70,
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
});

const responsiveStyles = {  
  mobile: StyleSheet.create({
    ...desktop,
    container: {
      ...desktop.container,
      flexDirection: "column",
    },
    pageContent: {
      ...desktop.pageContent,
      marginLeft: 0,
    },
  }),
  desktop: StyleSheet.create({
    ...desktop,
  }),
};