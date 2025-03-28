import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgUser2 = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 15 18"
    {...props}
  >
    <Path
      fill={props.color}
      d="M7.5 8.353a3.88 3.88 0 0 1-3.875-3.876A3.88 3.88 0 0 1 7.501.6a3.88 3.88 0 0 1 3.876 3.876A3.88 3.88 0 0 1 7.5 8.353m0-6.58a2.706 2.706 0 0 0-2.703 2.704A2.706 2.706 0 0 0 7.501 7.18a2.706 2.706 0 0 0 2.703-2.703 2.706 2.706 0 0 0-2.703-2.704M7.5 17.4c-4.206 0-7.5-1.763-7.5-4.012 0-2.25 3.294-4.012 7.5-4.012S15 11.14 15 13.388c0 2.25-3.294 4.011-7.5 4.011m0-6.851c-3.73 0-6.328 1.497-6.328 2.84s2.599 2.84 6.328 2.84 6.328-1.498 6.328-2.84c0-1.343-2.599-2.84-6.328-2.84"
    />
  </Svg>
);
export default SvgUser2;
