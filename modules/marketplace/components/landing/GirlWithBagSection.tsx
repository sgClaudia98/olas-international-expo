import React, { useId } from "react";
import { Text, View, Image } from "react-native";
import { shopExperienceData } from "../../data/landing";
import { shopExperienceStyles, shopExperienceStyles as styles } from "../../styles/landing";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";

const GirlWithBagSection = () => {
  const styles = useResponsiveStyles(shopExperienceStyles)

  return (
    <View style={styles.container}>
      <View style={styles.textContent}>
        <Text style={styles.heading}>
          ¡Tu experiencia de compra nunca fue tan fácil y segura!
        </Text>
        {shopExperienceData.map((data) => (
          <View key={useId()} style={styles.itemsContainer}>
            {data.icon && <View style={styles.iconContainer}>{data.icon}</View>}
            {data.heading && (
              <View style={styles.textContainer}>
                <Text style={styles.text}>{data.heading}</Text>
                {data.text && <Text style={styles.subText}>{data.text}</Text>}
              </View>
            )}
          </View>
        ))}
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/woman-with-a-bag.webp")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default GirlWithBagSection;
