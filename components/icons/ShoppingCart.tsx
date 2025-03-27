import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgShoppingCart = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.538 18.75a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666M16.706 18.75a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666M.873 1.25h3.333L6.44 12.408a1.67 1.67 0 0 0 1.666 1.342h8.1a1.666 1.666 0 0 0 1.667-1.342l1.333-6.991H5.04"
    />
  </Svg>
);
export default SvgShoppingCart;
