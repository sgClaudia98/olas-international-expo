import Btn from "@/components/Btn";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { Colors } from "@/styles";
import typography from "@/styles/typography";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { experienceForYourMobileStyles } from "../../styles/landing";

const ExperienceFromYourMobile = () => {
  const styles = useResponsiveStyles(experienceForYourMobileStyles)
  return (
    <View style={styles.externalContainer}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>
            Disfruta de una mejor experiencia desde tu móvil
          </Text>
          <Text style={styles.bodyText}>
            Lorem ipsum dolor sit amet consectetur. Sit in sed rutrum ultrices
            egestas. Neque leo praesent odio diam. Vel amet vitae pulvinar
            cursus enim sagittis enim. Cum arcu vitae non scelerisque cursus
            eget mi.
          </Text>
          <View style={styles.btnGroup}>
            <Button
              icon="apple"
              onPress={() => alert("Redirección a App Store para descargar la app.")}
              style={styles.btnStyle}
              textColor={Colors.blue.fourth}
            >
              <View style={styles.btnInner}>
                <Text style={styles.smallBtnText}>Download on the</Text>
                <Text style={styles.normalBtnText}>App Store</Text>
              </View>
            </Button>
            <Button
              icon="google-play"
              onPress={() => alert("Redirección a Google Play para descargar la app.")}
              style={styles.btnStyle}
              textColor={Colors.blue.fourth}
            >
              <View style={styles.btnInner}>
                <Text style={styles.smallBtnText}>Download on the</Text>
                <Text style={styles.normalBtnText}>Google Play</Text>
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
