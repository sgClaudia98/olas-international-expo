import React from "react";
import MarketplaceLeftHeader from "./MarketplaceLeftHeader";
import MarketplaceRightHeader from "./MarketplaceRightHeader";
import { View } from "react-native";
import { MenuLink } from "@/components/layout/HeaderBar";

export const header = {
  headerLeft: () => <MarketplaceLeftHeader />,
  headerRight: () => <MarketplaceRightHeader />,
  headerTitle: "",
  headerShadowVisible: false,
};

export const mobileHeader = {
  header: () => (
    <View style={{ width: "100%" }}>
      <MarketplaceLeftHeader />
    </View>
  ),
  headerTitle: "",
  headerShadowVisible: false,
  headerStyle: {
    height: "auto",
    backgroundColor: '#E9FDFF',
  },
};

export const links: MenuLink[] = [
  //{label: 'Market', route: 'Marketplace', navigation:getServiceNavigation("Marketplace") },
  {label: 'Preguntas Frecuentes', route: 'faq'},
  {label: 'Envíos', route: 'shipments'},
  {label: 'Pedidos', route: 'orders'},
];