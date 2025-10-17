import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgMarketHomeappliances = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.4}
      d="M21.6 1.2 15 8.4 8.4 1.2"
    />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.4}
      d="M26.04 8.4H3.96c-1.525 0-2.76 1.218-2.76 2.72v14.96c0 1.502 1.235 2.72 2.76 2.72h22.08c1.524 0 2.76-1.218 2.76-2.72V11.12c0-1.502-1.236-2.72-2.76-2.72"
    />
  </Svg>
);
export default SvgMarketHomeappliances;
