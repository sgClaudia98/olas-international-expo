import React from "react";
import { Text, View } from "react-native";
import { categoriesSliderStyles as styles  } from "../../styles/landing";

const CategoriesSlider = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.smallHeading}>Explora por</Text>
      <Text style={styles.heading}>Categorías populares</Text>
      <View style={styles.sliderContainer}>
        <Text>Slider Here</Text>
      </View>
    </View>
  );
};

export default CategoriesSlider;
