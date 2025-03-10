import { Text, View, Image, StyleProp, Pressable } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/styles";
import Btn from "@/components/Btn";
import { Card, IconButton } from "react-native-paper";
import {
  MarketBookingCartItem,
  MarketBookingOption,
} from "../../services/interfaces/booking";
import { ViewStyle } from "react-native";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { URL_IMAGE } from "@/constants";
import { productVertical as styles } from "../../styles/product";
import { MarketBookingCartExtra } from "../../hooks/useMarketCartActions";
import DiscountBadge from "@/components/DiscountBadge";

interface ProductItemProps {
  item: MarketBookingOption; // Add the type for the item prop
  onClick: () => void; // Callback when product is clicked
  style?: StyleProp<ViewStyle>;
}

const initialAmount = 1;

const ProductItemVertical: React.FC<ProductItemProps> = ({
  style,
  item,
  onClick,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [amount, setAmount] = useState(initialAmount);
  const { addToCart } = useShoppingCart<
    MarketBookingCartItem,
    MarketBookingCartExtra
  >();

  const discount = (item.discount * 100) / item.basePrice;

  const imageSize = `?width=150&height=150`;
  const currencySymbol = item.saleCurrency?.symbol || "USD";

  const _addToCart = () => {
    addToCart(
      {
        ...item,
        quantity: amount,
      },
      amount,
      item.price
    );
  };

  return (
    <Pressable onPress={onClick} style={[styles.container, style]}>
      <Card style={styles.productCard}>
        <View style={styles.imageContainer} id={item.id.toString()}>
          <Image
            source={{ uri: `${URL_IMAGE}${item.product.imageId}${imageSize}` }}
            style={styles.image}
            resizeMode="cover"
          />
          <IconButton
            style={styles.favorite}
            onPress={() => setIsFavorite(!isFavorite)}
            iconColor={isFavorite ? Colors.blue.second : Colors.black.second}
            icon={isFavorite ? "heart" : "heart-outline"}
          />
          {discount > 0 && (
            <DiscountBadge value={Number(`-${discount.toFixed(0)}%`)} />
          )}
        </View>
        <Card.Content>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{item.product.name}</Text>
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
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Pressable>
            <select
              id={item.id.toString()}
              style={{
                backgroundColor: "#F4F4F4",
                paddingTop: 8,
                paddingRight: 10,
                paddingLeft: 10,
                paddingBottom: 8,
                border: 0,
                borderRadius: 20,
                width: 60
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </Pressable>
          <Btn size="small" title="Añadir" onPress={() => _addToCart()} />
        </Card.Actions>
      </Card>
    </Pressable>
  );
};

export default ProductItemVertical;
