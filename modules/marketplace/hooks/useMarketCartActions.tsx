import {useEffect, useMemo, useState} from 'react';
import {
  useAddToCartMutation,
  useGetCartQuery,
  useLazyGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
} from '../services/api/BookingService';
import {
  MarketBookingCartItem,
  MarketBookingCartResponse,
  MarketBookingOption,
  Modalities,
} from '../services/interfaces/booking';
import {useLocationContext} from '@/contexts/locationContext';
import {useAppSelector} from '@/hooks/useAppDispatch';
import {CartItem} from '../reducers/ShoppingCartReducer';
import ProductItemLittle from '../components/product/ProductItemLittle';
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import { MainLayoutStateService } from '@/reducers/mainLayoutReducer';
import { DEFAULT_DESTINATION } from '@/constants';

// T as MarketBookingCartItem
export interface MarketBookingCartExtra extends MarketBookingCartItem, MarketBookingOption {}

interface CartActions {
  addToCart: (product: MarketBookingCartExtra, quantity: number) => Promise<any>;
  updateQuantity: (productId: number, quantity: number, modalities?: Modalities) => Promise<any>;
  removeFromCart: (productId: number) => Promise<any>;
  renderItem: (item: CartItem<MarketBookingCartItem>, index: number) => React.JSX.Element;
  refreshCart: () => Promise<any>;
  data: CartItem<MarketBookingCartItem>[];
  loadingCart: boolean;
}

const mapItem = (i: MarketBookingCartItem) => {
  return {data: i, quantity: i.quantity, price: i.price, id: i.product.id};
};
const mapItems = (items?: MarketBookingCartItem[]): CartItem<MarketBookingCartItem>[] => {
  return items ? items.map(mapItem) : [];
};

export const useMarketCartActions = (): CartActions => {
  const token = useAppSelector(state => state.auth.token);
  const navigation = useNavigation();
  const {activeDestination} = useLocationContext();

  // Mutations para interactuar con la API (por ejemplo, usando Redux Toolkit Query o React Query)
  const [addToCartAPI] = useAddToCartMutation();
  const [updateCartItemAPI] = useUpdateCartItemMutation();
  const [removeFromCartAPI] = useRemoveFromCartMutation();

  const {data: cartData, refetch: fetchCart, isLoading: loadingCart} = useGetCartQuery();
  const [data, setData] = useState(mapItems(cartData?.bookingCart.items));


  // Agregar al carrito
  const addToCart = async (option: MarketBookingOption, quantity: number) => {
    if (!token) {
      console.error('No hay sesión activa');
      MainLayoutStateService.setIsModalVisible(true);
      // TODO: save the product to add later
      return Promise.reject();
    }
    if (!option.searchId || !option.id) {
      console.error('El producto no tiene searchId u optionId válidos', option);
      return Promise.reject();
    }
    return addToCartAPI({searchId: option.searchId, optionId: option.id, quantity})
      .unwrap()
      .then(fetchCart);
  };

  // Actualizar la cantidad del producto en el carrito
  const updateQuantity = async (productId: number, quantity: number) => {
    return updateCartItemAPI({
      item: {productId, quantity},
      destinationId: activeDestination?.id || DEFAULT_DESTINATION,
    })
      .unwrap()
      .then(fetchCart);
  };

  // Eliminar del carrito
  const removeFromCart = async (productId: number) => {
    console.log('Removing from cart:', productId);
    return removeFromCartAPI({productId}).unwrap().then(fetchCart);
  };

  const renderItem = (item: CartItem<MarketBookingCartItem>) => (
    <ProductItemLittle
      key={`${item.id}-${item.data.product.id}`}
      item={item}
    />
  );

  useEffect(() => {
    console.debug('Cart data updated:', cartData?.bookingCart.items);
    setData(mapItems(cartData?.bookingCart.items));
  }, [cartData]);

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, []);

  // Retornar las acciones que usarás en el contexto
  return {
    addToCart,
    updateQuantity,
    removeFromCart,
    data,
    renderItem,
    refreshCart: fetchCart,
    loadingCart,  
  };
};
