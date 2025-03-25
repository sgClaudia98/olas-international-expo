import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/styles";
import { Link, usePathname } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, Pressable } from "react-native";

export interface ProfileSideMenuItem {
  label: string;
  route: string;
  exact?: boolean;
  icon: string;
}

const ProfileSideMenu: React.FC<{ items: ProfileSideMenuItem[] }> = ({
  items,
}) => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const activeColor = Colors.black.primary;
  const color = Colors.black.second;

  const handleLogout = () => {

  }

  return (
    <View style={styles.container}>
      <ThemedText style={styles.headerText}>{t("PROFILE_SETTINGS")}</ThemedText>

      <View style={styles.line} />
      <View style={styles.menu}>
        {items.map((i, index) => (
          <Link key={index} href={i.route as any} style={styles.menuItem}>
            <Text style={styles.icon}>{"[ico]"}</Text>
            <ThemedText
              style={{
                ...styles.menuText,
                color: (i.exact && pathname == i.route || !i.exact && pathname.startsWith(i.route)) ? activeColor : color,
              }}
            >
              {t(i.label)}
            </ThemedText>
          </Link>
        ))}
      </View>

      <View style={styles.line} />
      <Pressable style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
        <Text style={styles.icon}>icon</Text>
        <ThemedText style={{ ...styles.menuText, color }}>
          {t("LOGOUT")}
        </ThemedText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerText: {
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: 0.2,
    fontWeight: "bold",
    marginBottom: 15,
  },
  menu: {
    marginVertical: 32,
    gap: 23,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  logoutItem: {
    marginVertical: 32,
  },
  icon: {
    marginRight: 16,
    fontSize: 16,
  },
  menuText: {
    fontSize: 18,
    lineHeight: 26,
  },

  line: {
    height: 1,
    backgroundColor: Colors.black.third,
  },
});

export default ProfileSideMenu;
