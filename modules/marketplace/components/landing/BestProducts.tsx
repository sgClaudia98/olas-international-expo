import React from "react";
import { Text, View } from "react-native";
import { productSliderStyles as styles } from "../../styles/landing";
import ResponsiveSlider from "@/components/ResponsiveSlider";

const products = [
  {
    name: "producto 1",
    price: 500
  },
  {
    name: "producto 2",
    price: 120
  }
]

const renderSlide = (item, index) => {
  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
    </View>
  )
}

const ProductSlider = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Más vendidos</Text>
      <ResponsiveSlider
        data={products}
        renderItem={renderSlide}
        showArrows={false}
      />
    </View>
  );
};

export default ProductSlider;
