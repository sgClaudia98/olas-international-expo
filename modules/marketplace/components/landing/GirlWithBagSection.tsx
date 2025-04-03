import React, { useId } from "react";
import { View, Image } from "react-native";
import { shopExperienceData } from "../../data/landing";
import {
  shopExperienceStyles,
  shopExperienceStyles as styles,
} from "../../styles/landing";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/hooks/useBreakpoints";

const GirlWithBagSection = () => {
  const styles = useResponsiveStyles(shopExperienceStyles);
  const { lessThan } = useBreakpoints();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.textContent}>
        <ThemedText style={styles.heading}>
          {t("MARKET.HOME.FEATURES.TITLE")}
        </ThemedText>
        {shopExperienceData.map((data) => (
          <View key={useId()} style={styles.itemsContainer}>
            {data.icon && <View style={styles.iconContainer}>{data.icon}</View>}
            {data.heading && (
              <View style={styles.textContainer}>
                <ThemedText style={styles.text}>{t(data.heading)}</ThemedText>
                {data.text && (
                  <ThemedText style={styles.subText}>{t(data.text)}</ThemedText>
                )}
              </View>
            )}
          </View>
        ))}
      </View>
      <View style={styles.imageContainer}>
        {lessThan.tablet ? (
          <Image
            source={require("@/assets/images/bg/VentajasBackground-mobile.png")}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require("@/assets/images/bg/VentajasBackground-desktop.png")}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>
    </View>
  );
};

export default GirlWithBagSection;
