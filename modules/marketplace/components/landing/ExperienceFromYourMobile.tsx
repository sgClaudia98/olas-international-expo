import Btn from "@/components/Btn";
import { Colors } from "@/styles";
import typography from "@/styles/typography";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const ExperienceFromYourMobile = () => {
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

const styles = StyleSheet.create({
  externalContainer: {
    position: "relative",
    marginVertical: 240,
    maxWidth: 980,
    marginHorizontal: "auto",
  },
  container: {
    borderRadius: 35,
    backgroundColor: Colors.blue.fifth,
    paddingVertical: 50,
    paddingHorizontal: 60,
    minHeight: 390,
    flex: 1,
    flexDirection: "row",
  },
  textContainer: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  heading: {
    ...typography.h2,
    color: Colors.black.primary,
  },
  bodyText: {
    ...typography.body,
    fontWeight: 400,
  },
  btnGroup: {
    flexDirection: "row",
    gap: 15,
  },
  btnStyle: {
    backgroundColor: Colors.black.primary,
    width: 125,
    borderRadius: 7,
  },
  smallBtnText: {
    fontSize: 8,
    fontWeight: 400,
    lineHeight: 8,
  },
  normalBtnText: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: 600,
  },
  btnInner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlign: 'left',
    rowGap: 3,
  },
  imageContainer: {
    width: "50%",
  },
  img: {
    position: "absolute",
    width: 550,
    height: 650,
    objectFit: "contain",
    top: -200,
    right: -100,
  },
});

export default ExperienceFromYourMobile;
