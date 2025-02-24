import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { useRouter } from "expo-router";
import { Colors } from "@/styles";

interface HeaderBarProps {
  links: MenuLink[];
  textColor?: string;
}

export interface MenuLink {
  label: string;
  route: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  links,
  textColor = Colors.black.primary,
}) => {
  const route = useRouter();

  const handleNavigate = (to: string) => {
    route.push(to as any);
  };

  return (
    <View style={styles.menuContainer}>
      {links.map((link, index) => (
        <Pressable
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
              { color: textColor },
              // route.name === link.route ? styles.activeMenuText : null,
            ]}
          >
            {link.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    marginLeft: 40,
  },
  menuItem: {
    marginHorizontal: 10,
    paddingVertical: 5,
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
});

export default HeaderBar;
