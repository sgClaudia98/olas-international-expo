import React from "react";
import MarketplaceLeftHeader from "./MarketplaceLeftHeader";
import MarketplaceRightHeader from "./MarketplaceRightHeader";
import { View } from "react-native";

export const header = {
  headerLeft: () => <MarketplaceLeftHeader />,
  headerRight: () => <MarketplaceRightHeader />,
  headerTitle: "",
  headerShadowVisible: false,
};

export const mobileHeader = {
  header: () => (
    <View style={{ width: "100%" }}>
      <MarketplaceRightHeader />
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
