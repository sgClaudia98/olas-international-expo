import React from "react";
import Page from "@/components/layout/Page";
import { Profile } from "@/modules/auth/pages/Profile";
import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/styles";
import Breadcrumb from "@/components/Breadcrumb";
import { homeBreadcrumItem } from "@/modules/marketplace/utils/breadcrumbBuild";
import { useTranslation } from "react-i18next";
import ProfileSideMenu, {
  ProfileSideMenuItem,
} from "@/modules/auth/components/ProfileSideMenu";
import { breadcrumbContainer } from "@/styles/page";

export default function ProfileLayout() {
  const { t } = useTranslation();
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
    <Page backgroundColor={Colors.black.fifth}>
      <View style={styles.breadcrumbContainer}>
        <Breadcrumb items={[homeBreadcrumItem, { label: t("PAGE.PROFILE") }]} />
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
  );
}

const styles = StyleSheet.create({
  breadcrumbContainer,
  container: {
    marginTop: 40,
    flexDirection: "row",
    flexWrap: 'wrap',
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
