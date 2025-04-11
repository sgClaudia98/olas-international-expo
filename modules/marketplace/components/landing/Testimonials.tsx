import React, { useId } from "react";
import { Text, View } from "react-native";
import { categoriesSliderStyles } from "../../styles/landing";
import { Review, reviews } from "../../data/landing";
import { Colors } from "@/styles";
import { Stars } from "./Stars";
import ResponsiveSlider from "../../../../components/ResponsiveSlider";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";

const Testimonials = () => {
  const styles = useResponsiveStyles(categoriesSliderStyles);

  const renderSlide = (item: Review, index: number) => {
    return (
      <View key={useId()} style={styles.reviewContainer}>
        {item.rate > 0 && item.rate <= 5 && (
          <Stars
            number={item.rate}
            fillColor={Colors.blue.second}
            emptyStarColor={Colors.blue.third}
          />
        )}
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.authorText}>{item.author ?? "Anonymous"}</Text>
      </View>
    );
  };


  return (
    <View style={{ ...styles.container, marginBottom: 0 }}>
      <Text style={styles.smallHeading}>Testimonios</Text>
      <Text style={styles.heading}>Experiencias de clientes</Text>
      <ResponsiveSlider
        data={reviews}
        renderItem={renderSlide}
        showArrows={false}
        containerStyle={styles.reviewsWrapper}
        activeDotStyle={styles.activeColor}
        dotStyle={styles.dotColor}
        itemsPerScreen={{
          bigDesktop: 3,
          desktop: 3,
          tablet: 1,
          mobile: 1
        }}
      />
    </View>
  );
};

export default Testimonials;
