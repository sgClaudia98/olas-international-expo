import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgShieldCheck = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 28 28"
    {...props}
  >
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M3.94 5.93c-.44.627-.44 2.492-.44 6.223v1.837c0 6.578 4.945 9.77 8.048 11.125.842.368 1.263.552 2.452.552s1.61-.184 2.452-.552C19.554 23.76 24.5 20.568 24.5 13.99v-1.837c0-3.73 0-5.596-.44-6.224-.44-.627-2.195-1.227-5.702-2.428l-.669-.229c-1.828-.626-2.742-.939-3.689-.939s-1.86.313-3.69.94l-.668.228C6.135 4.7 4.381 5.302 3.94 5.929m13.63 6.32a.875.875 0 1 0-1.306-1.166L12.75 15.02l-1.014-1.136a.875.875 0 0 0-1.305 1.165l1.666 1.867a.875.875 0 0 0 1.306 0z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgShieldCheck;
