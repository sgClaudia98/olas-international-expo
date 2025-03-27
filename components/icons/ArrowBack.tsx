import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgArrowBack = (props: SvgProps) => (
  <Svg
    
    width={20}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.44}
      d="M19 8H1m0 0 6.75-7M1 8l6.75 7"
    />
  </Svg>
);
export default SvgArrowBack;
