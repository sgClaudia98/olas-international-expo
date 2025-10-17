import React from "react";
import { Linking, Text, View } from "react-native";
import { newsletterStyles } from "../../styles/landing";
import Btn from "@/components/Btn";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { useTranslation } from "react-i18next";

const NewsletterSection = () => {
  const styles = useResponsiveStyles(newsletterStyles)
  const {t} = useTranslation();
  const email = process.env.EXPO_PUBLIC_EMAIL
  
  const handleContact = async (): Promise<void> => {
      try {
        await Linking.openURL(`mailto:${email}`);
      } catch (error) {
        console.error(t("MARKET.HOME.NEWSLETTER.MESSAGES.ERROR"), error);
      }
    };

  return (
    <View style={{ ...styles.container, marginTop: 200 }}>
      <Text style={styles.smallHeading}>
       {t("MARKET.HOME.NEWSLETTER.DESCRIPTION")}
      </Text>
      <Text style={styles.heading}>{t("MARKET.HOME.NEWSLETTER.TITLE")}</Text>
      <View style={styles.inputContainer}>
        {/* Here should be placed an input text to enter the user's email to subscribe the newsletter */}
        <Btn
          title={t("MARKET.HOME.NEWSLETTER.BUTTONS.SUBSCRIBE")}
          variant="secondary"
          onPress={() => handleContact()}
        />
      </View>
    </View>
  );
};

export default NewsletterSection;
