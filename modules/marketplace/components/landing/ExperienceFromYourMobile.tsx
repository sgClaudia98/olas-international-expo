import Btn from "@/components/Btn";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { Colors } from "@/styles";
import typography from "@/styles/typography";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { experienceForYourMobileStyles } from "../../styles/landing";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

const ExperienceFromYourMobile = () => {
  const { t } = useTranslation(); // Use the t function
  const styles = useResponsiveStyles(experienceForYourMobileStyles);

  return (
    <View style={styles.externalContainer}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>
            {t("MARKET.HOME.MOBILE.TITLE")}
          </Text>
          <Text style={styles.bodyText}>
            {t("MARKET.HOME.MOBILE.DESCRIPTION")}
          </Text>
          <View style={styles.btnGroup}>
            <Button
              icon="apple"
              onPress={() => alert(t("MARKET.HOME.MOBILE.BUTTONS.DOWNLOAD_APP_STORE.SMALL") + " " + t("MARKET.HOME.MOBILE.BUTTONS.DOWNLOAD_APP_STORE.NORMAL"))}
              style={styles.btnStyle}
              textColor={Colors.blue.fourth}
            >
              <View style={styles.btnInner}>
                <Text style={styles.smallBtnText}>
                  {t("MARKET.HOME.MOBILE.BUTTONS.DOWNLOAD_APP_STORE.SMALL")}
                </Text>
                <Text style={styles.normalBtnText}>
                  {t("MARKET.HOME.MOBILE.BUTTONS.DOWNLOAD_APP_STORE.NORMAL")}
                </Text>
              </View>
            </Button>
            <Button
              icon="google-play"
              onPress={() => alert(t("MARKET.HOME.MOBILE.BUTTONS.DOWNLOAD_GOOGLE_PLAY.SMALL") + " " + t("MARKET.HOME.MOBILE.BUTTONS.DOWNLOAD_GOOGLE_PLAY.NORMAL"))}
              style={styles.btnStyle}
              textColor={Colors.blue.fourth}
            >
              <View style={styles.btnInner}>
                <Text style={styles.smallBtnText}>
                  {t("MARKET.HOME.MOBILE.BUTTONS.DOWNLOAD_GOOGLE_PLAY.SMALL")}
                </Text>
                <Text style={styles.normalBtnText}>
                  {t("MARKET.HOME.MOBILE.BUTTONS.DOWNLOAD_GOOGLE_PLAY.NORMAL")}
                </Text>
              </View>
            </Button>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/mobile-app-img.webp")}
            width={550}
            height={650}
            style={styles.img}
          />
        </View>
      </View>
    </View>
  );
};

export default ExperienceFromYourMobile;
