import React from "react";
import { Text, View } from "react-native";
import { productSliderStyles as styles } from "../../styles/landing";

const ProductSlider = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Más vendidos</Text>
      <Text>Products Slider Here</Text>
    </View>
  );
};

export default ProductSlider;
