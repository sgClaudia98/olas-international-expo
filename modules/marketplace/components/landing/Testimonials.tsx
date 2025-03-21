import React from "react";
import { Text, View } from "react-native";
import { categoriesSliderStyles as styles } from "../../styles/landing";

const Testimonials = () => {
  return (
    <View style={{...styles.container, marginBottom: 0}}>
      <Text style={styles.smallHeading}>Testimonios</Text>
      <Text style={styles.heading}>Experiencias de clientes</Text>
      <View style={styles.sliderContainer}>
        <Text>Testimonials Slider Here</Text>
      </View>
    </View>
  );
};

export default Testimonials;
