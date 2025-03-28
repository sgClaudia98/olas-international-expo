import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { usePathname, useRouter } from "expo-router";
import { Colors } from "@/styles";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import responsiveStyle from "../../styles/headerBar";
import { ThemedText } from "../ThemedText";
import { useTranslation } from "react-i18next";
import IconSvg from "../ui/IconSvg";

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
  const { t } = useTranslation();
  const styles = useResponsiveStyles(responsiveStyle);
  const route = useRouter();
  const pathname = usePathname();

  const handleNavigate = (to: string) => {
    route.push(to as any);
  };
  return (
    <View style={styles.menuContainer}>
      {links.map((link, index) => {
        const active = pathname.startsWith(link.route);
        return (
          <Pressable
            key={`hb-${index}`}
            onPress={() => handleNavigate(link.route)}
            style={[
              styles.menuItem,
              // route.name === link.route ? styles.activeMenuItem : null,
            ]}
          >
            {active && (
              <IconSvg name={"Dot"} size={5} color={Colors.blue.second} />
            )}
            <ThemedText
              type={active ? "defaultBold" : "default"}
              style={[styles.menuText, { color: textColor, marginStart: 10 }]}
            >
              {t(link.label)}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
};

export default HeaderBar;
