import React from "react";
import PaymentWrapper from "@/modules/marketplace/components/payment/PaymentWrapper";
import { SearchProvider } from "@/modules/marketplace/context/SearchContext";
import { ShoppingCartProvider } from "@/modules/marketplace/context/ShoppingCartContext";
import { useMarketCartActions } from "@/modules/marketplace/hooks/useMarketCartActions";
import MarketplaceLeftHeader from "@/modules/marketplace/layout/MarketplaceLeftHeader";
import MarketplaceRightHeader from "@/modules/marketplace/layout/MarketplaceRightHeader";
import { Stack } from "expo-router";

export default function MarketplaceLayout() {
  const marketCartActions = useMarketCartActions(); // Get the actions for the market cart

  return (
    <SearchProvider >
      <ShoppingCartProvider actions={marketCartActions} 
      renderPaymentForm={(closeModal) => <PaymentWrapper onClose={closeModal}/>}>
      <Stack
        screenOptions={{
          headerLeft: () => <MarketplaceLeftHeader />,
          headerRight: () => <MarketplaceRightHeader />,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />
      </ShoppingCartProvider>
    </SearchProvider>
  );
}
