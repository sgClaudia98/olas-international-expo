import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Pressable, ScrollView, Modal} from 'react-native';
import {Button} from 'react-native-paper';
import {CartItem} from '../../reducers/ShoppingCartReducer';
import PaymentForm from '../payment/PaymentForm';
import {CloseIcon} from '@/assets/icons/CloseIcon';
import {cartStyles as styles} from '../../styles/cart';
import {useLocationContext} from '@/contexts/locationContext';

interface CartOverlayProps<T extends {id: number}> {
  visible: boolean;
  closeCart: () => void;
  cartItems: CartItem<T>[];
  renderItem: (item: CartItem<T>, index: number) => React.JSX.Element;
  totalAmount: number;
}

const CartOverlay = <T extends {id: number}>({
  visible,
  closeCart,
  cartItems,
  renderItem,
  totalAmount,
}: CartOverlayProps<T>) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const {activeDestination, destinationCountry} = useLocationContext();

  const handleOpenPaymentForm = () => {
    if (!activeDestination) {
      alert('Necesitas seleccionar una localidad.');
      return;
    }
    console.log(activeDestination, destinationCountry);
    setShowPaymentModal(true);
  };

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
                onPress={() => handleOpenPaymentForm()}>
                Proceed to Pay
              </Button>
            )}
          </View>
        </View>

        {activeDestination && destinationCountry && (
          <Modal
            visible={showPaymentModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setShowPaymentModal(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <PaymentForm
                  cartItems={cartItems}
                  province={activeDestination.name}
                  destinationCountry={destinationCountry?.code ?? ''}
                />
                <Button
                  mode="contained"
                  onPress={() => setShowPaymentModal(false)}
                  style={styles.closeModalButton}>
                  <CloseIcon />
                </Button>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );
};

export default CartOverlay;
