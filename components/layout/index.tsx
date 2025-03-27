import React from "react";
import HeaderLeft from "./HeaderLeft";
import RightHeader from "./HeaderRight";
import { View } from "react-native";
import headerStyles from "@/styles/header";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { Colors } from "@/styles";
export * from "./HeaderRight";
export * from "./HeaderLeft";
export * from "./Page";
export * as Footer from "./Footer";
export * from "./LogoHeader";

export const screenHeaderLogoOption = ({ navigation }) => {
  const styles = useResponsiveStyles(headerStyles);
  return {
    header: () => (
      <View style={styles.container}>
        <View style={{...styles.subContainer, marginTop: 10,}}>
          <HeaderLeft />
          <RightHeader navigation={navigation} />
        </View>
      </View>
    ),
    headerTitle: "",

    headerStyle: {
      height: "auto",
      backgroundColor: "#E9FDFF",
    },
  };
};
