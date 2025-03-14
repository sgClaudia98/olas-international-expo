import {Colors} from '@/styles';
import React, {useEffect} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet, Image, Platform} from 'react-native';
import {Badge, IconButton} from 'react-native-paper';
import {useShoppingCart} from '../context/ShoppingCartContext';
import {MarketBookingCartItem, MarketBookingOption} from '../services/interfaces/booking';
import {MarketBookingCartExtra} from '../hooks/useMarketCartActions';

import {useNavigation} from '@react-navigation/core';
import {MainLayoutStateService} from '@/reducers/mainLayoutReducer';
import HeaderBar, { MenuLink } from '@/components/layout/HeaderBar';
import { useAppSelector } from '@/hooks/useAppDispatch';
import {rightStyles as responsiveStyle} from '../styles/header';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';

const links: MenuLink[] = [
  //{label: 'Market', route: 'Marketplace', navigation:getServiceNavigation("Marketplace") },
  {label: 'Preguntas Frecuentes', route: 'faq'},
  {label: 'Envíos', route: 'shipments'},
  {label: 'Pedidos', route: 'orders'},
];

export default function MarketplaceRightHeader() {
  const styles = useResponsiveStyles(responsiveStyle);
  const {setCartVisible, state} = useShoppingCart<MarketBookingCartItem, MarketBookingCartExtra>();
  const {token} = useAppSelector(state => state.auth);
  const openCart = () => {
    if (!token) {
      MainLayoutStateService.setIsModalVisible(true);
      return;
    }
    setCartVisible(true);
  };

  const total = state.items.length;
  
  return (
    <View style={styles.container}>
      <HeaderBar
        links={links}
        textColor={Colors.black.second}
      />
      <View>
        <IconButton
          icon="cart-outline"
          iconColor={Colors.black.second}
          onPress={openCart}
        />
        <Badge
          visible={total > 0}
          style={[styles.badge]}>
          {total}
        </Badge>
      </View>
    </View>
  );
}

