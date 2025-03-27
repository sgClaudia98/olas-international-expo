import React from "react";
import { SvgProps } from "react-native-svg";
import * as icons from "../icons";
import { Text, TextStyle } from "react-native";
import { Colors } from "@/styles";

interface IconProps extends SvgProps {
  name: keyof typeof icons;
  size?: number;
  color?: string;
  containerStyle?: TextStyle;
}

const IconSvg: React.FC<IconProps> = ({
  name,
  size = 24,
  color = Colors.blue.primary,
  containerStyle = {},
  ...props
}) => {
  const Component = icons[name];
  return (
    <Text style={{ color, ...containerStyle }}>
      <Component width={size} height={size} {...props} />
    </Text>
  );
};

export default IconSvg;
