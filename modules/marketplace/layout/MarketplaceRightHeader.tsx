import { Colors } from "@/styles";
import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { Badge, IconButton } from "react-native-paper";
import { useShoppingCart } from "../context/ShoppingCartContext";
import {
  MarketBookingCartItem,
  MarketBookingOption,
} from "../services/interfaces/booking";
import { MarketBookingCartExtra } from "../hooks/useMarketCartActions";

import { useNavigation } from "@react-navigation/core";
import { MainLayoutStateService } from "@/reducers/mainLayoutReducer";
import HeaderBar, { MenuLink } from "@/components/layout/HeaderBar";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { rightStyles as responsiveStyle } from "../styles/header";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { links } from "./header";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import IconSvg from "@/components/ui/IconSvg";

export default function MarketplaceRightHeader() {
  const styles = useResponsiveStyles(responsiveStyle);
  const { lessThan } = useBreakpoints();
  const { t } = useTranslation();
  const { setCartVisible, state } = useShoppingCart<
    MarketBookingCartItem,
    MarketBookingCartExtra
  >();
  const { token } = useAppSelector((state) => state.auth);
  const openCart = () => {
    if (!token) {
      MainLayoutStateService.setIsModalVisible(true);
      return;
    }
    setCartVisible(true);
  };

  const total = state.items.length;

  return (
    <View style={{...styles.containerRight, marginRight: 14}}>
      {!lessThan.mid && (
        <HeaderBar
          links={links.map((v) => ({ ...v, label: t(v.label) }))}
          textColor={Colors.black.second}
        />
      )}
      <Pressable onPress={openCart}>
        <IconSvg size={20} name="ShoppingCart" color={Colors.black.second} />
        <Badge visible={total > 0} style={[styles.badge]}>
          {total}
        </Badge>
      </Pressable>
    </View>
  );
}
