import React from "react";
import { View, Text, FlatList, Pressable, Modal } from "react-native";
import { Button } from "react-native-paper";
import { CartItem } from "../../reducers/ShoppingCartReducer";
import { cartStyles } from "../../styles/cart";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { ThemedText } from "@/components/ThemedText";
import IconSvg from "@/components/ui/IconSvg";
import { Colors } from "@/styles";
import CartSkeleton from "../skeletons/CartOverlaySkeleton";
import { useTranslation } from "react-i18next";

interface CartOverlayProps<T extends { id: number }> {
  visible: boolean;
  loadingCart: boolean;
  closeCart: () => void;
  cartItems: CartItem<T>[];
  renderItem: (item: CartItem<T>, index: number) => React.JSX.Element;
  totalAmount?: number;
  totalPrice: number;
  openPaymentForm: () => void;
}

const CartOverlay = <T extends { id: number }>({
  visible,
  loadingCart,
  closeCart,
  cartItems,
  renderItem,
  totalAmount,
  totalPrice,
  openPaymentForm,
}: CartOverlayProps<T>) => {
  const styles = useResponsiveStyles(cartStyles);
  const {t} = useTranslation(); 

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => closeCart()}
    >
      <View style={styles.overlay}>
        {loadingCart ? (
          <CartSkeleton closeCart={closeCart} />
        ) : (
          <View style={styles.cartContent}>
            <ThemedText type="defaultBold" style={styles.cartTitle}>
              {t("MARKET.CART.TITLE")}
            </ThemedText>
            <Pressable onPress={closeCart} style={styles.closeButton}>
              <IconSvg name="Close" size={10} color={Colors.black.primary} />
            </Pressable>
            {cartItems.length ? (
              <FlatList
                data={cartItems}
                renderItem={({ item, index }) => renderItem(item, index)}
              />
            ) : (
              <View style={styles.emptyCart}>

              <ThemedText style={styles.productsText}>
                {t("MARKET.CART.EMPTY")}
              </ThemedText>
              </View>
            )}
            <View style={styles.cartFooter}>
              {!!totalAmount && (
                <ThemedText style={styles.productsText}>
                  {t("PRODUCTS.TOTAL", {count: totalAmount})}
                </ThemedText>
              )}
          
              <ThemedText style={styles.totalText}>
                {t("TOTAL")} <ThemedText type="defaultBold" style={styles.totalPrice}>${totalPrice.toFixed(2)}</ThemedText>
              </ThemedText>
              {totalPrice > 0 && (
                <Button mode="contained" onPress={() => openPaymentForm()}>
                  {t("MARKET.CART.BUTTONS.PAY")}
                </Button>
              )}
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default CartOverlay;
