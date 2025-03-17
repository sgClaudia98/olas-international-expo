import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { useRouter } from "expo-router";
import { Colors } from "@/styles";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import responsiveStyle from "../../styles/headerBar";

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
  const styles = useResponsiveStyles(responsiveStyle);
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


export default HeaderBar;
