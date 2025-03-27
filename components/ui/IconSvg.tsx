import React from "react";
import { SvgProps } from "react-native-svg";
import * as icons from "../icons";
import { Text, TextStyle } from "react-native";
import { Colors } from "@/styles";

export type IconNames = Exclude<keyof typeof icons, "Mastercard" | "Paypal" | "AmericanExpress" | "Visa">;

interface IconProps extends SvgProps {
  name: IconNames;
  size?: number;
  color?: string;
  containerStyle?: TextStyle;
}

const IconSvg: React.FC<IconProps> = ({
  name,
  size = 24,
  color = Colors.blue.primary,
  ...props
}) => {
  const Component = icons[name];
  if (!Component) return <Text>?</Text>
  return (
      <Component
        width={size}
        height={size}
        color={color}
        {...props}
      />
  );
};

export default IconSvg;
