import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {MarketplaceStackParamList} from '../layout/MarketplaceStack';
import ProductInfo from '../components/product/ProductInfo';
import {useGetProductsQuery} from '../services/api/BookingService';
import {useLocationContext} from '@/contexts/locationContext';
import Page from '@/layout/Page';
import BackArrow from '@/components/BackArrow/BackArrow';

type ProductDetailRouteProp = RouteProp<MarketplaceStackParamList, 'ProductsDetail'>;

const ProductDetail = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation();
  const {id} = route.params;
  const {activeDestination} = useLocationContext();

  const {data, error, isLoading} = useGetProductsQuery({
    productId: +id,
    destinationId: activeDestination?.id,
  });
  const goToProducts = () => {
    navigation.navigate('MainLayout', {
      screen: 'Services',
      params: {
        screen: 'Marketplace',
        params: {
          screen: 'Products',
        },
      },
    });
  };
  return (
    <Page>
      <BackArrow fallback={goToProducts} />
      {data && <ProductInfo item={data.option} />}
    </Page>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
