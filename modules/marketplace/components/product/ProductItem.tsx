import { Text, View, Image, StyleProp, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/styles";
import NumberInput from "@/components/NumberInput";
import Btn from "@/components/Btn";
import { Card, IconButton } from "react-native-paper";
import {
  MarketBookingCartItem,
  MarketBookingOption,
} from "../../services/interfaces/booking";
import { ViewStyle } from "react-native";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { URL_IMAGE } from "@/constants";
import { productItemStyles as responsiveStyles } from "../../styles/product";
import { MarketBookingCartExtra } from "../../hooks/useMarketCartActions";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import DiscountBadge from "@/components/DiscountBadge";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import DropdownSelect from "@/components/DropdownSelect";
import DropdownMenuSelect from "@/components/DropdownMenuSelect";
import NumberSelect from "@/components/NumberSelect";
import { Toast } from "toastify-react-native";
import { useTranslation } from "react-i18next";

interface ProductItemProps {
  item: MarketBookingOption; // Add the type for the item prop
  onClick: () => void; // Callback when product is clicked
  style?: StyleProp<ViewStyle>;
}

const initialAmount = 1;

const ProductItem: React.FC<ProductItemProps> = ({ style, item, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [amount, setAmount] = useState(initialAmount);
  const { addToCart } = useShoppingCart<
    MarketBookingCartItem,
    MarketBookingCartExtra
  >();
  const { isMobile } = useBreakpoints();
  const styles = useResponsiveStyles(responsiveStyles);

  const discount = (item.discount * 100) / item.basePrice;

  const imageSize = `?width=200&height=200`;
  const currencySymbol = item.saleCurrency?.symbol || "USD";
  
  const { t } = useTranslation();

  const _addToCart = () => {
    addToCart(
      {
        ...item,
        quantity: amount,
      },
      amount,
      item.price,
      item.product.id
    );
    Toast.success(t("CART_NOTIFICATION_ADD_TO_CART"))
  };

  return (
    <Pressable onPress={onClick} style={style}>
      <View style={[styles.container, styles.productCard]}>
        <View style={styles.imageContainer} id={item.id.toString()}>
          <Image
            source={{ uri: `${URL_IMAGE}${item.product.imageId}${imageSize}` }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
          <IconButton
            style={styles.favorite}
            onPress={() => setIsFavorite(!isFavorite)}
            iconColor={isFavorite ? Colors.blue.second : Colors.black.second}
            icon={isFavorite ? "heart" : "heart-outline"}
          />

          {discount > 0 && (
            <DiscountBadge
              value={discount}
              variant={isMobile ? "right" : "left"}
            />
          )}
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
              {item.product.name}
            </Text>
          </View>
          <View style={styles.prices}>
            <Text style={styles.price}>
              {item.price ? item.price.toFixed(2) : item.price} {currencySymbol}
            </Text>
            {item.discount !== 0 && (
              <Text style={styles.oldPrice}>
                {item.basePrice.toFixed(2)} {currencySymbol}
              </Text>
            )}
          </View>
          <View style={styles.actions}>
            <Pressable style={{ marginStart: 0, justifyContent: "flex-start" }}>
              {isMobile ? (
                <NumberSelect
                  length={item.maxQuantity}
                  value={amount}
                  onSelect={setAmount}
                />
              ) : (
                <NumberInput
                  initialValue={initialAmount}
                  onChange={setAmount}
                />
              )}
            </Pressable>
            <Btn
              style={styles.addBtn}
              size="small"
              title="Añadir"
              onPress={() => _addToCart()}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductItem;
