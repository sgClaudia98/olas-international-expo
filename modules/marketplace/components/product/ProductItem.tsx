import {StyleSheet, Text, View, Image, StyleProp, Pressable} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '@/styles';
import NumberInput from '@/components/NumberInput';
import Btn from '@/components/Btn';
import {IconButton} from 'react-native-paper';
import Badge from '@/components/Badge';
import {MarketBookingCartItem, MarketBookingOption} from '../../services/interfaces/booking';
import {ViewStyle} from 'react-native';
import {useShoppingCart} from '../../context/ShoppingCartContext';
import {URL_IMAGE} from '@/constants';
import {productItemStyles as styles} from '../../styles/product';
import {MarketBookingCartExtra} from '../../hooks/useMarketCartActions';

interface ProductItemProps {
  item: MarketBookingOption; // Add the type for the item prop
  onClick: () => void; // Callback when product is clicked
  style?: StyleProp<ViewStyle>;
}

const initialAmount = 1;

const ProductItem: React.FC<ProductItemProps> = ({style, item, onClick}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [amount, setAmount] = useState(initialAmount);
  const {addToCart} = useShoppingCart<MarketBookingCartItem, MarketBookingCartExtra>();

  const discount = (item.discount * 100) / item.basePrice;

  const imageSize = `?width=200&height=200`;
  const currencySymbol = item.saleCurrency?.symbol || 'USD';

  const _addToCart = () => {
    addToCart(
      {
        ...item,
        quantity: amount,
      },
      amount,
      item.price,
    );
  };

  return (
    <Pressable
      onPress={onClick}
      style={[styles.container, style]}>
      <View>
        <View
          style={styles.imageContainer}
          id={item.id.toString()}>
          <Image
            source={{uri: `${URL_IMAGE}${item.product.imageId}${imageSize}`}}
            style={styles.image}
            resizeMode="cover"
          />
          <IconButton
            style={styles.favorite}
            onPress={() => setIsFavorite(!isFavorite)}
            iconColor={isFavorite ? Colors.blue.second : Colors.black.second}
            icon={isFavorite ? 'heart' : 'heart-outline'}
          />
          {discount > 0 && (
            <Badge
              style={styles.badge}
              text={`-${discount.toFixed(0)}%`}
            />
          )}
        </View>
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
      </View>
      <View style={styles.actions}>
        <NumberInput
          initialValue={initialAmount}
          onChange={setAmount}
        />
        <Btn
          size="small"
          title="Añadir"
          onPress={() => _addToCart()}
        />
      </View>
    </Pressable>
  );
};

export default ProductItem;
