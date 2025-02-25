import {StyleSheet, Text, View} from 'react-native';
import React, { FC } from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import ProductInfo from '../components/product/ProductInfo';
import {useGetProductsQuery} from '../services/api/BookingService';
import {useLocationContext} from '@/contexts/locationContext';
import Page from '@/components/layout/Page';
import BackArrow from '@/components/layout/BackArrow';

const ProductDetail: FC<{id: string}> = ({id}) => {
  
  const {activeDestination} = useLocationContext();

  const {data, error, isLoading} = useGetProductsQuery({
    productId: +id,
    destinationId: activeDestination?.id,
  });
  const goToProducts = () => {
    /*
    navigation.navigate('MainLayout', {
      screen: 'Services',
      params: {
        screen: 'Marketplace',
        params: {
          screen: 'Products',
        },
      },
    });
    */
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
