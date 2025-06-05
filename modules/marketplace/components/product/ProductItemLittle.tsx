import React from "react";
import { View, Text, Image } from "react-native";
import {
  MarketBookingCartItem,
  MarketBookingOption,
} from "../../services/interfaces/booking";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { productInShoppingCartStyles as styles } from "../../styles/product";
import { CartItem } from "../../reducers/ShoppingCartReducer";
import { URL_IMAGE } from "@/constants";
import NumberInput from "@/components/NumberInput";
import TrashIcon from "@/assets/icons/TrashIcon";
import DiscountBadge from "@/components/DiscountBadge";
import { MarketBookingCartExtra } from "../../hooks/useMarketCartActions";
import { Toast } from "toastify-react-native";
import { useTranslation } from "react-i18next";
import IconSvg from "@/components/ui/IconSvg";
import { Colors } from "@/styles";
import { ThemedText } from "@/components/ThemedText";

interface ProductItemLittleProps {
  item: CartItem<MarketBookingCartItem>;
}

const ProductItemLittle: React.FC<ProductItemLittleProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useShoppingCart<
    MarketBookingCartItem,
    MarketBookingCartExtra
  >();

  const discount = (item.data.discount * 100) / item.data.basePrice;
  const currencySymbol = item.data.saleCurrency?.symbol || "$";

  const currentTotal = item.data.price * item.quantity;

  const [total, setTotal] = React.useState(currentTotal);

  const { t } = useTranslation();

  const _handleQuantityChange = (quantity: number) => {
    updateQuantity(item.data.product.id, quantity);
    setTotal(item.data.price * quantity);
    Toast.success(t("CART_NOTIFICATION_MOD_QTY"));
  };

  const _handleRemoveFromCart = () => {
    removeFromCart(item.data.product.id);
    Toast.success(t("CART_NOTIFICATION_REMOVE_FROM_CART"));
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageAndDetailsContainer}>
        <View style={styles.imageContainer}>
          <View>
            <Image
              source={{ uri: `${URL_IMAGE}${item.data.product.imageId}` }}
              width={80}
              height={80}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.imageOverlay} />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <ThemedText type="defaultSemiBold" style={styles.title}>
              {item.data.product.name}
            </ThemedText>
          </View>
          <View style={styles.prices}>
            <ThemedText type="defaultBold" style={styles.priceText}>
              {currencySymbol}
              {item.data.price ? item.data.price.toFixed(2) : item.data.price}
            </ThemedText>
            {item.data.discount !== 0 && (
              <View style={styles.discountBadge}>
                <DiscountBadge value={discount} />
              </View>
            )}
          </View>
        </View>
        <View style={styles.trashIcon}>
          <IconSvg
            name="Trash"
            height={16}
            width={16}
            color={Colors.blue.second}
            onPress={() => _handleRemoveFromCart()}
          />
        </View>
      </View>

      <View style={styles.quantityAndTotalContainer}>
        <View style={styles.amountContainer}>
          <NumberInput
            initialValue={item.quantity}
            onChange={_handleQuantityChange}
            size="small"
          />
        </View>
        <View>
          <ThemedText style={styles.totalText}>
            Total
            <ThemedText type="defaultBold" style={styles.priceText2}>
              {currencySymbol}
              {Number(total).toFixed(2)}
            </ThemedText>
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

export default ProductItemLittle;
