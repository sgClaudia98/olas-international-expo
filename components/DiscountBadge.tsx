import { Colors } from "@/styles";
import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Text as SvgText } from "react-native-svg";
import Fonts from "@/styles/fonts";

interface DiscountBadgeProps {
  value: number;
  color?: string;
  textColor?: string;
  variant?: "left"| "right"
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({
  value,
  color = Colors.blue.second,
  textColor = 'white',
  variant = "left"
}) => {
  return (
    <View style={styles.container}>
      <Svg width="47" height="18" viewBox="0 0 47 18" fill="none">
        <Path
          d="M45.6334 1.64015L40.4295 7.88546C40.1337 8.24042 40.1197 8.7518 40.3954 9.1225L45.812 16.4031C46.3028 17.0628 45.8319 18 45.0096 18L1 18C0.447715 18 0 17.5523 0 17L0 1C0 0.447715 0.447715 0 1 0L44.8651 0C45.7129 0 46.1761 0.988809 45.6334 1.64015Z"
          fill={color}
          transform={variant == "right" ? "scale(-1,1) translate(-46,0)" : ""}
        />
        <SvgText
          x={variant == "right" ? 11 : 6}
          y="13"
          fontSize="12"
          fontFamily={Fonts.bold}
          fill={textColor}
        >
          -{value.toFixed(0)} %
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  text: {
    color: Colors.white.default,
    fontSize: 12,
    lineHeight: 26,
    fontWeight: 700,
    letterSpacing: 2,
    position: "absolute",
  },
});

export default DiscountBadge;
