import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Pressable, ScrollView, Modal} from 'react-native';
import {Button} from 'react-native-paper';
import {CartItem} from '../../reducers/ShoppingCartReducer';
import {cartStyles} from '../../styles/cart';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';

interface CartOverlayProps<T extends {id: number}> {
  visible: boolean;
  closeCart: () => void;
  cartItems: CartItem<T>[];
  renderItem: (item: CartItem<T>, index: number) => React.JSX.Element;
  totalAmount: number;
  openPaymentForm: () => void;
}

const CartOverlay = <T extends {id: number}>({
  visible,
  closeCart,
  cartItems,
  renderItem,
  totalAmount,
  openPaymentForm,
}: CartOverlayProps<T>) => {

  const styles = useResponsiveStyles(cartStyles)
  
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => closeCart()}>
      <View style={styles.overlay}>
        <View style={styles.cartContent}>
          <Text style={styles.cartTitle}>Shopping Cart</Text>
          <Pressable
            onPress={closeCart}
            style={styles.closeButton}>
            <Text style={styles.closeText}>&times;</Text>
          </Pressable>
          <FlatList
            data={cartItems}
            renderItem={({item, index}) => renderItem(item, index)}
          />
          <View style={styles.cartFooter}>
            <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
            {totalAmount > 0 && (
              <Button
                mode="contained"
                onPress={() => openPaymentForm()}>
                Proceed to Pay
              </Button>
            )}
          </View>
        </View>

        
      </View>
    </Modal>
  );
};

export default CartOverlay;
