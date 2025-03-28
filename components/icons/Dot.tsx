import * as React from "react";
import Svg, { Circle } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgDot = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 6 6"
    {...props}
  >
    <Circle cx={3} cy={3} r={2.5} fill={props.color} />
  </Svg>
);
export default SvgDot;
