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

const links: MenuLink[] = [
  //{label: 'Market', route: 'Marketplace', navigation:getServiceNavigation("Marketplace") },
  {label: 'Preguntas Frecuentes', route: 'faq'},
  {label: 'Envíos', route: 'shipments'},
  {label: 'Pedidos', route: 'orders'},
];

export default function MarketplaceRightHeader() {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  locationDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
  },
  dropdownText: {
    fontSize: 14,
    marginRight: 5,
    color: '#000',
  },
  searchBar: {
    alignItems: 'flex-start',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  categoryText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#000',
  },
  bannerSection: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#007BFF',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  bannerButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
  },
  bannerButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  bannerImage: {
    width: '100%',
    marginTop: 10,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 2,
  },
});
