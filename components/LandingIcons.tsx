import React from "react";
import { Colors } from "@/styles";
import Svg, { Path, G, Defs, ClipPath, Rect, Mask } from "react-native-svg";
import { View } from "react-native";
import IconSvg, { IconProps } from "./ui/IconSvg";

export const CategoryIcon: React.FC<IconProps> = ({
  name,
  size = 30,
  fill = "none",
  stroke = Colors.blue.second,
  ...props
}) => {
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  console.log("Formatted Name:", formattedName);
  return (
    <IconSvg name={"Market"+formattedName} size={size} color={stroke} fill={fill} {...props} />
  );
};

const RoundIcon: React.FC<
  React.PropsWithChildren<{ color?: string; size?: number }>
> = ({ children, color = Colors.black.primary, size = 40 }) => {
  return (
    <View
      style={{
        height: size,
        width: size,
        borderRadius: "50%",
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </View>
  );
};

export const FastDeliveryIcon: React.FC<IconProps> = ({
  size = 24,
  ...props
}) => {
  return (
    <RoundIcon>
      <IconSvg name="Ufo" size={size} color={Colors.blue.fifth} {...props} />
    </RoundIcon>
  );
};

export const SafePaymentIcon: React.FC<IconProps> = ({
  size = 24,
  ...props
}) => {
  return (
    <RoundIcon>
      <IconSvg name="ShieldCheck" size={size} color={Colors.blue.fifth} {...props} />
    </RoundIcon>
  );
};

export const Support247Icon: React.FC<IconProps> = ({
  size = 24,
  ...props
}) => {
  return (
    <RoundIcon>
      <IconSvg name="PhoneCalling" size={size} color={Colors.blue.fifth} {...props} />
    </RoundIcon>
  );
};

