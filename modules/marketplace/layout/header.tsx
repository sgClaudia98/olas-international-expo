import React from "react";
import MarketplaceLeftHeader from "./MarketplaceLeftHeader";
import MarketplaceRightHeader from "./MarketplaceRightHeader";
import { View } from "react-native";
import { MenuLink } from "@/components/layout/HeaderBar";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import headerStyles from "@/styles/header"

export const header = () =>{ 
  const styles = useResponsiveStyles(headerStyles);
  return {
  header: () => (
    <View style={styles.container}>
        <View style={{... styles.subContainer, borderColor: "transparent"}}>
          <MarketplaceLeftHeader/>
          <MarketplaceRightHeader />
        </View>
      </View>
  ),
  headerTitle: "",
  headerShadowVisible: false,
  headerStyle: {
    height: "auto",
    backgroundColor: '#E9FDFF',
  },
}};

export const links: MenuLink[] = [
  {label: 'PAGE.FAQ', route: 'faq'},
  {label: 'PAGE.ORDERS', route: '/profile/order-history'},
];