import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgMastercard = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 22 14"
    {...props}
  >
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M10.223 1.795a7.41 7.41 0 0 0-2.6 5.647 7.41 7.41 0 0 0 2.598 5.644 6.476 6.476 0 1 1 .002-11.291m.829.554a6.46 6.46 0 0 1 2.473 5.09 6.46 6.46 0 0 1-2.473 5.09 6.46 6.46 0 0 1-2.473-5.09 6.46 6.46 0 0 1 2.473-5.09m3.43 5.093a7.41 7.41 0 0 1-2.6 5.644 6.477 6.477 0 0 0 8.147-9.79 6.475 6.475 0 0 0-8.148-1.501 7.41 7.41 0 0 1 2.6 5.647"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgMastercard;
