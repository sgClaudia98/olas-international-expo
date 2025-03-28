import React from "react";
import { Text, View } from "react-native";
import {
  categoriesSliderStyles,
  categoriesSliderStyles as styles,
} from "../../styles/landing";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";

const CategoriesSlider = () => {
  const styles = useResponsiveStyles(categoriesSliderStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.smallHeading}>Explora por</Text>
      <Text style={styles.heading}>Categorías populares</Text>
      <View>
        <Text>Slider Here</Text>
      </View>
    </View>
  );
};

export default CategoriesSlider;
