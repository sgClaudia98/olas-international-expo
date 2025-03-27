import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgVisible = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 20 20"
    {...props}
  >
    <G fill="currentColor">
      <Path d="M18.4 6.3c-1.6-2.1-4.3-4.5-8.4-4.5S3.2 4.3 1.6 6.3C.8 7.3.3 8 .3 9.7s.5 2.4 1.3 3.4c1.6 2.1 4.3 4.5 8.4 4.5s6.8-2.5 8.4-4.5c.8-1 1.3-1.7 1.3-3.4s-.5-2.4-1.3-3.4m-1.1 5.9c-1.4 1.8-3.8 4-7.3 4s-5.9-2.2-7.3-4c-.7-.9-1-1.3-1-2.5s.3-1.6 1-2.5c1.4-1.8 3.8-4 7.3-4s5.9 2.2 7.3 4c.7.9 1 1.3 1 2.5s-.3 1.6-1 2.5" />
      <Path d="M10 6.3c-1.9 0-3.4 1.5-3.4 3.4s1.5 3.4 3.4 3.4 3.4-1.5 3.4-3.4-1.5-3.4-3.4-3.4m0 5.4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2" />
    </G>
  </Svg>
);
export default SvgVisible;
