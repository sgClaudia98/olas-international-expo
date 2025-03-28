import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgGoBack = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 12"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1 5.688 5.688 1M1 5.688l4.688 4.687M1 5.688h9.375c1.563 0 4.688.937 4.688 4.687"
    />
  </Svg>
);
export default SvgGoBack;
