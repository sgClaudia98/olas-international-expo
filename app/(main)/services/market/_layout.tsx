import PaymentWrapper from "@/modules/marketplace/components/payment/PaymentWrapper";
import { SearchProvider } from "@/modules/marketplace/context/SearchContext";
import { ShoppingCartProvider } from "@/modules/marketplace/context/ShoppingCartContext";
import { header, mobileHeader } from "@/modules/marketplace/layout/header";

import { useMarketCartActions } from "@/modules/marketplace/hooks/useMarketCartActions";
import { Stack } from "expo-router";
import React, { useContext, useEffect } from "react";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { MainLayoutcontext } from "@/contexts/mainLayoutContext";
import { links } from "@/modules/marketplace/layout/header";

export default function MarketplaceLayout() {
  const { isMobile } = useBreakpoints();
  const { setServiceMenu } = useContext(MainLayoutcontext);
  const marketCartActions = useMarketCartActions(); // Get the actions for the market cart

  const updateServiceMenu = () => setServiceMenu(isMobile ? links : []);

  useEffect(() => {
    updateServiceMenu();
  }, []);

  useEffect(() => {
    updateServiceMenu();
  }, [isMobile]);

  return (
    <SearchProvider>
      <ShoppingCartProvider
        actions={marketCartActions}
        renderPaymentForm={(closeModal) => (
          <PaymentWrapper onClose={closeModal} />
        )}
      >
        <Stack screenOptions={isMobile ? mobileHeader : header} />
      </ShoppingCartProvider>
    </SearchProvider>
  );
}
