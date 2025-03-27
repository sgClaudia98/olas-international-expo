import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgClose = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <G
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#Close_svg__a)"
    >
      <Path d="M.777 13.222 13.222.778M.777.778l12.445 12.444" />
    </G>
    <Defs>
      <ClipPath id="Close_svg__a">
        <Path fill="#fff" d="M0 0h14v14H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgClose;
