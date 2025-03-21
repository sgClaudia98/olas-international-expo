import React from "react";
import { Text, View } from "react-native";
import { categoriesSliderStyles as styles } from "../../styles/landing";

const NewsletterSection = () => {
  return (
    <View style={{...styles.container, marginTop: 0}}>
      <Text style={styles.smallHeading}>
        Recibe información de ofertas y descuentos
      </Text>
      <Text style={styles.heading}>Nuevos productos cada semana</Text>
    </View>
  );
};

export default NewsletterSection;
