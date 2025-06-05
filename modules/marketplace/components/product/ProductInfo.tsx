import {
  StyleProp,
  Image,
  Text,
  View,
  ViewStyle,
  Pressable,
  Linking,
} from "react-native";
import React, { useState } from "react";
import {
  MarketBookingCartItem,
  MarketBookingOption,
} from "../../services/interfaces/booking";

import { productInfoResponsiveStyles as responsiveStyles } from "../../styles/product";
import Btn from "@/components/Btn";
import NumberInput from "@/components/NumberInput";
import { URL_IMAGE } from "@/constants";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import TextSeeMore from "@/components/TextSeeMore";
import { MarketBookingCartExtra } from "../../hooks/useMarketCartActions";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { useTranslation } from "react-i18next";
import { ThemedText } from "@/components/ThemedText";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import DiscountBadge from "@/components/DiscountBadge";

interface ProductInfoProps {
  item: MarketBookingOption; // Add the type for the item prop
  style?: StyleProp<ViewStyle>;
}
const initialAmount = 1;

const ProductInfo: React.FC<ProductInfoProps> = ({ style, item }) => {
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false); // Initialize state for favorite
  const styles = useResponsiveStyles(responsiveStyles);
  const [amount, setAmount] = useState(initialAmount);
  const { addToCart } = useShoppingCart<
    MarketBookingCartItem,
    MarketBookingCartExtra
  >();
  const { isMobile } = useBreakpoints();
  // Calculate the new price after discount
  const discount = (item.discount * 100) / item.basePrice;
  (item.discount * 100) / item.basePrice;
  const imageSize = isMobile
    ? `?width=400&height=400`
    : `?width=800&height=470`;
  const symbol = "USD"; //item.saleCurrency.symbol

  const _showImage = () => {
    Linking.openURL(URL_IMAGE + item.product.imageId + imageSize).catch((err) =>
      console.error("An error occurred", err)
    );
  };

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
  };

  return (
    <View style={[styles.container, style]}>
      {/* Make sure id is a string */}
      <Pressable
        onPress={_showImage}
        style={styles.imageContainer}
        id={item.id.toString()}
      >
        <Image
          source={{ uri: URL_IMAGE + item.product.imageId + imageSize }} // Use the product image
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />
      </Pressable>
      <View style={styles.detailsContainer}>
        <View style={styles.nameContainer}>
          <ThemedText style={styles.name}>{item.product.name}</ThemedText>
          {/* Use the product name */}
        </View>
        <View style={styles.prices}>
          <ThemedText style={styles.price}>
            {item.price.toFixed(2)} {symbol} {/* Use the currency symbol */}
          </ThemedText>
          {discount != 0 && <DiscountBadge value={discount} />}
          {item.discount != 0 && (
            <ThemedText style={styles.oldPrice}>
              {t("BEFORE")} {item.basePrice.toFixed(2)} {symbol}
            </ThemedText>
          )}
        </View>
        <TextSeeMore numberOfLines={3}>{item.description}</TextSeeMore>
        <View style={styles.actions}>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <NumberInput initialValue={initialAmount} onChange={setAmount} />
            <Btn
              style={styles.addBtn}
              size="small"
              title={t("ACTIONS.ADD")}
              onPress={_addToCart}
            />
          </View>
          {/*
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <IconButton
              style={styles.favorite}
              onPress={() => setIsFavorite(!isFavorite)}
              iconColor={isFavorite ? Colors.blue.second : Colors.black.second}
              icon={isFavorite ? 'heart' : 'heart-outline'}
            />
            <Text>Add to wish list</Text>
          </View>
            */}
        </View>
      </View>
    </View>
  );
};

export default ProductInfo;
