import React from "react";
import { View, FlatList, Pressable } from "react-native";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { cartStyles } from "../../styles/cart"; // adjust path as needed
import Skeleton from "@/components/Skeleton";
import IconSvg from "@/components/ui/IconSvg";
import { Colors } from "@/styles";

const CartSkeleton = ({ closeCart }) => {
  const styles = useResponsiveStyles(cartStyles);

  const fakeItems = Array.from({ length: 4 }); // fake cart items for loading

  const renderSkeletonItem = ({
    item,
    index,
  }: {
    item: unknown;
    index: number;
  }) => (
    <View key={index} style={styles.cartItem}>
      <Skeleton width={"100%"} height={80} style={{ marginBottom: 8 }} />
    </View>
  );

  return (
    <View style={styles.cartContent}>
      <View style={styles.cartTitle}>
        <Skeleton width={150} height={24} style={{}} />
      </View>

      <Pressable onPress={closeCart} style={styles.closeButton}>
        <IconSvg name="Close" size={10} color={Colors.black.primary} />
      </Pressable>

      <FlatList
        data={fakeItems}
        renderItem={renderSkeletonItem}
        keyExtractor={(_, index) => index.toString()}
      />

      <View style={styles.cartFooter}>
        <Skeleton width={"40%"} height={20} style={{ marginBottom: 10 }} />
        <Skeleton width={"100%"} height={45} style={{ borderRadius: 6 }} />
      </View>
    </View>
  );
};

export default CartSkeleton;
