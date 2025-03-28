import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React, { FC, useContext } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { appLinks, links } from "./links";
import { useRouter } from "expo-router";
import { Colors } from "@/styles";
import DestinationSelector from "../DestinationSelector";
import { Button, Divider, Icon, IconButton } from "react-native-paper";
import Logo from "../Logo";
import { MainLayoutcontext } from "@/contexts/mainLayoutContext";
import { ThemedText } from "../ThemedText";
import { useTranslation } from "react-i18next";

const SidePanel: FC<DrawerContentComponentProps> = ({}) => {
  const route = useRouter();
  const {t} = useTranslation();
  const {serviceMenu} = useContext(MainLayoutcontext);

  const handleNavigate = (to: string) => {
    route.push(to as any);
  };
  const _links = Platform.OS == "web" ? links : appLinks;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />

        <DestinationSelector />
      </View>
      <View style={styles.menuContainer}>
        {_links.map((link, index) => (
          <Button
            key={`hb-${index}`}
            onPress={() => handleNavigate(link.route)}
            style={[
              styles.menuItem,
              // route.name === link.route ? styles.activeMenuItem : null,
            ]}
          >
            <Text
              style={[
                styles.menuText,
                { color: Colors.black.primary },
                // route.name === link.route ? styles.activeMenuText : null,
              ]}
            >
              {link.label}
            </Text>
          </Button>
        ))}
        <Button
          key={`hb-profile`}
          onPress={() => handleNavigate("/(main)/profile")}
          style={[
            styles.menuItem,
            // route.name === link.route ? styles.activeMenuItem : null,
          ]}
        >
          <Text
            style={[
              styles.menuText,
              { color: Colors.black.primary },
              // route.name === link.route ? styles.activeMenuText : null,
            ]}
          >
            Profile
          </Text>
        </Button>
        <Divider style={{width: "100%"}} bold />
        {serviceMenu.map((link, index) => (
          <Button
            key={`hb-${index}`}
            onPress={() => handleNavigate(link.route)}
            style={[
              styles.menuItem,
              // route.name === link.route ? styles.activeMenuItem : null,
            ]}
          >
            <ThemedText
              style={[
                styles.menuText,
                { color: Colors.black.primary },
                // route.name === link.route ? styles.activeMenuText : null,
              ]}
            >
              {t(link.label)}
            </ThemedText>
          </Button>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 20,
  },
  menuContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  menuItem: {
    marginVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeMenuItem: {
    borderBottomColor: "#007BFF",
  },
  menuText: {
    fontSize: 16,
  },
  activeMenuText: {
    fontWeight: "bold",
    color: "#007BFF",
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#007BFF",
  },
});

export default SidePanel;
