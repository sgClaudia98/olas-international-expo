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
  data: CartItem<MarketBookingCartItem>[];
  price: number;
}

const mapItem = (i: MarketBookingCartItem) => {
  return {data: i, quantity: i.quantity, price: i.price};
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

  const {data: cartData, refetch: fetchCart} = useGetCartQuery();
  const [data, setData] = useState(mapItems(cartData?.bookingCart.items));
  const [price, setPrice] = useState(cartData?.bookingCart.price || 0);

  const _handleActionResponse = (data: MarketBookingCartResponse) => {
    setData(mapItems(data.bookingCart.items));
    setPrice(data.bookingCart.price);
  };

  // Agregar al carrito
  const addToCart = async (option: MarketBookingOption, quantity: number) => {
    if (!token) {
      console.error('No hay sesión activa');
      MainLayoutStateService.setIsModalVisible(true);
      
      return Promise.reject();
    }
    if (!option.searchId || !option.id) {
      console.error('El producto no tiene searchId u optionId válidos', option);
      return Promise.reject();
    }
    return addToCartAPI({searchId: option.searchId, optionId: option.id, quantity})
      .unwrap()
      .then(_handleActionResponse);
  };

  // Actualizar la cantidad del producto en el carrito
  const updateQuantity = async (productId: number, quantity: number) => {
    return updateCartItemAPI({
      item: {productId, quantity},
      destinationId: activeDestination?.id || DEFAULT_DESTINATION,
    })
      .unwrap()
      .then(_handleActionResponse);
  };

  // Eliminar del carrito
  const removeFromCart = async (productId: number) => {
    return removeFromCartAPI({productId}).unwrap().then(_handleActionResponse);
  };

  const renderItem = (item: CartItem<MarketBookingCartItem>) => (
    <ProductItemLittle
      key={`${item.data.id}-${item.data.product.id}`}
      item={item}
    />
  );

  useEffect(() => {
    setData(mapItems(cartData?.bookingCart.items));
  }, [cartData]);

  useEffect(() => {
    if (token) {
      console.debug('Fetch cart');
      fetchCart();
    }
  }, []);

  // Retornar las acciones que usarás en el contexto
  return {
    addToCart,
    updateQuantity,
    removeFromCart,
    data,
    price,
    renderItem,
  };
};
