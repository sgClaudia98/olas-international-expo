import React from "react";
import { Colors } from "@/styles";
import { IconProps } from "./types";
import Svg, { Path } from "react-native-svg";

export const StarIcon: React.FC<IconProps> = ({
  width = 15,
  height = 14,
  fill = "none",
  stroke = Colors.blue.second,
}) => {
  return (
    <>
      <Svg width={width} height={height} viewBox="0 0 15 14" fill="none">
        <Path
          d="M7.49153 0L9.76598 4.60778L14.8522 5.35121L11.1719 8.93586L12.0404 14L7.49153 11.6078L2.94264 14L3.8112 8.93586L0.130859 5.35121L5.21708 4.60778L7.49153 0Z"
          fill={stroke}
        />
      </Svg>
    </>
  );
};
