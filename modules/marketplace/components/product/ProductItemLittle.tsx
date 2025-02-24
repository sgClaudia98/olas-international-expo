import React from 'react';
import {View, Text, Image} from 'react-native';
import {MarketBookingCartItem, MarketBookingOption} from '../../services/interfaces/booking';
import {useShoppingCart} from '../../context/ShoppingCartContext';
import {productInShoppingCartStyles as styles} from '../../styles/product';
import {CartItem} from '../../reducers/ShoppingCartReducer';
import {URL_IMAGE} from '@/constants';
import NumberInput from '@/components/NumberInput';
import TrashIcon from '@/assets/icons/TrashIcon';
import DiscountBadge from '@/components/DiscountBadge';
import { MarketBookingCartExtra } from '../../hooks/useMarketCartActions';

interface ProductItemLittleProps {
  item: CartItem<MarketBookingCartItem>;
}

const ProductItemLittle: React.FC<ProductItemLittleProps> = ({item}) => {
  const { updateQuantity, removeFromCart } = useShoppingCart<MarketBookingCartItem, MarketBookingCartExtra>();

  const discount = (item.data.discount * 100) / item.data.basePrice;
  const currencySymbol = item.data.saleCurrency?.symbol || 'USD';

  const currentTotal = item.data.price * item.quantity;

  const [total, setTotal] = React.useState(currentTotal);

  const _handleQuantityChange = (quantity: number) => {
    updateQuantity(item.data.product.id, quantity);
    setTotal(item.data.price * quantity);
  };
  
  return (
    <View
      style={styles.container}>
      <View style={styles.imageAndDetailsContainer}>
        <Image
          source={{uri: `${URL_IMAGE}${item.data.product.imageId}`}}
          width={80}
          height={80}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.data.product.name}</Text>
          </View>
          <View style={styles.prices}>
            <Text style={styles.priceText}>
              {item.data.price ? item.data.price.toFixed(2) : item.data.price}{' '}
              {currencySymbol}
            </Text>
            {item.data.discount !== 0 && (
              <View style={styles.discountBadge}>
                <DiscountBadge value={discount} />
              </View>
            )}
          </View>
        </View>
        <View style={styles.trashIcon}>
          <TrashIcon onPress={() => removeFromCart(item.data.product.id)} />
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
          <Text style={styles.totalText}>
            Total:
            <Text style={styles.priceText}>
              {Number(total).toFixed(2)} {currencySymbol}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductItemLittle;
