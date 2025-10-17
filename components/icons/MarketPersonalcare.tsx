import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgMarketPersonalcare = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <G clipPath="url(#Market_PERSONALCARE_svg__a)">
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.4}
        d="M7.481 17.441h-5.28v12.36h5.28zM8.322 26.44l11.28 3.36 10.2-3.36s.48-2.76-2.64-2.88-8.88 0-8.88 0l-4.08-1.32"
      />
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.4}
        d="M5.563 17.441h6.72l9.12 3s1.56 1.2 1.44 3.12M19.843 16v-1.08c0-3.24-2.64-5.76-5.76-5.76-2.64 0-4.8 1.68-5.52 4.08M14.082 9.16V2.68M11.684 2.2h5.64c.96 0 1.92.24 2.76.72l1.44.84"
      />
      <Path
        fill={props.color}
        d="M24.762 12.16c-1.08-1.08-.84-2.52 0-4.08l1.92-3 1.92 3.12c1.08 1.68 1.08 3 0 4.08-1.08.96-2.88.96-3.84-.12"
      />
    </G>
    <Defs>
      <ClipPath id="Market_PERSONALCARE_svg__a">
        <Path fill="#fff" d="M.4.4h31.2v31.2H.4z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgMarketPersonalcare;
