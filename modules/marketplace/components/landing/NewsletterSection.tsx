import React from "react";
import { Linking, Text, View } from "react-native";
import { newsletterStyles } from "../../styles/landing";
import Btn from "@/components/Btn";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";

const NewsletterSection = () => {
  const styles = useResponsiveStyles(newsletterStyles)

  const email = process.env.EXPO_PUBLIC_EMAIL
  
  const handleContact = async (): Promise<void> => {
      try {
        await Linking.openURL(`mailto:${email}`);
      } catch (error) {
        console.error("An error occurred", error);
      }
    };

  return (
    <View style={{ ...styles.container, marginTop: 0 }}>
      <Text style={styles.smallHeading}>
        Recibe información de ofertas y descuentos
      </Text>
      <Text style={styles.heading}>Nuevos productos cada semana</Text>
      <View style={styles.inputContainer}>
        {/* Here should be placed an input text to enter the user's email to subscribe the newsletter */}
        <Btn
          title="Contáctenos"
          variant="secondary"
          onPress={() => handleContact()}
        />
      </View>
    </View>
  );
};

export default NewsletterSection;
