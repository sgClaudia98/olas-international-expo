import {StyleProp, Image, Text, View, ViewStyle, Pressable, Linking} from 'react-native';
import React, {useState} from 'react';
import {MarketBookingCartItem, MarketBookingOption} from '../../services/interfaces/booking';

import {productInfoStyles as styles} from '../../styles/product';
import Btn from '@/components/Btn';
import NumberInput from '@/components/NumberInput/NumberInput';
import {URL_IMAGE} from '@/config';
import {Colors} from '@/styles';
import {IconButton} from 'react-native-paper';
import Badge from '@/components/Badge/Badge';
import {useShoppingCart} from '../../context/ShoppingCartContext';
import TextSeeMore from '@/components/Text/TextSeeMore';
import { MarketBookingCartExtra } from '../../hooks/useMarketCartActions';

interface ProductInfoProps {
  item: MarketBookingOption; // Add the type for the item prop
  style?: StyleProp<ViewStyle>;
}
const initialAmount = 1;

const ProductInfo: React.FC<ProductInfoProps> = ({style, item}) => {
  const [isFavorite, setIsFavorite] = useState(false); // Initialize state for favorite

  const [amount, setAmount] = useState(initialAmount);
  const {addToCart} = useShoppingCart<MarketBookingCartItem, MarketBookingCartExtra>();

  // Calculate the new price after discount
  const discount = (item.discount * 100) / item.basePrice;
  (item.discount * 100) / item.basePrice;
  const imageSize = `?width=800&height=470`;
  const symbol = 'USD'; //item.saleCurrency.symbol

  const _showImage = () => {
    Linking.openURL(URL_IMAGE + item.product.imageId + imageSize).catch(err =>
      console.error('An error occurred', err),
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
    );
  };
  
  return (
    <View style={[styles.container, style]}>
      <View
        style={{
          flex: 1,
          position: 'relative',
        }}
        id={item.id.toString()}>
        {/* Make sure id is a string */}
        <Pressable onPress={_showImage}>
          <Image
            source={{uri: URL_IMAGE + item.product.imageId + imageSize}} // Use the product image
            style={styles.image}
            resizeMode="cover"
          />
        </Pressable>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.product.name}</Text> {/* Use the product name */}
        </View>
        <View style={styles.prices}>
          <Text style={styles.price}>
            {item.price ? item.price : item.price} {symbol} {/* Use the currency symbol */}
          </Text>
          {discount != 0 && (
            <Badge
              style={styles.badge}
              text={`-${discount.toFixed(0)}%`}
            />
          )}
          {item.discount != 0 && (
            <Text style={styles.oldPrice}>
              Before {item.basePrice} {symbol}
            </Text>
          )}
        </View>
        <TextSeeMore numberOfLines={3}>{item.description}</TextSeeMore>
        <View style={styles.actions}>
          <View style={{flexDirection: 'row', gap: 5}}>
            <NumberInput
              initialValue={initialAmount}
              onChange={setAmount}
            />
            <Btn
              size="small"
              title="Añadir"
              onPress={_addToCart}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <IconButton
              style={styles.favorite}
              onPress={() => setIsFavorite(!isFavorite)}
              iconColor={isFavorite ? Colors.blue.second : Colors.black.second}
              icon={isFavorite ? 'heart' : 'heart-outline'}
            />
            <Text>Add to wish list</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductInfo;
