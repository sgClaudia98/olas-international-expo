import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgLogout = (props: SvgProps) => (
  <Svg
    
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#90A3BA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.5 2.5H4.167A1.667 1.667 0 0 0 2.5 4.167v11.666A1.666 1.666 0 0 0 4.167 17.5H7.5M11.668 14.167 7.501 10l4.167-4.167M7.5 10h10"
    />
  </Svg>
);
export default SvgLogout;
