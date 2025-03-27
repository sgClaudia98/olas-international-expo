import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgInfo = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 20 20"
    {...props}
  >
    <G fill="currentColor">
      <Path d="M16.9 3.1C15 1.3 12.6.3 10 .3s-5 1-6.9 2.8C1.3 5 .3 7.4.3 10s1 5 2.8 6.9 4.3 2.8 6.9 2.8 5-1 6.9-2.8c1.8-1.8 2.8-4.3 2.8-6.9s-1-5-2.8-6.9m-1 12.8c-1.6 1.6-3.6 2.4-5.9 2.4-2.2 0-4.3-.9-5.9-2.4-1.6-1.6-2.4-3.6-2.4-5.9 0-2.2.9-4.3 2.4-5.9C5.7 2.6 7.8 1.7 10 1.7s4.3.9 5.9 2.4c1.6 1.6 2.4 3.6 2.4 5.9 0 2.2-.9 4.3-2.4 5.9" />
      <Path d="M10 8.4c-.4 0-.7.3-.7.7v5.4c0 .4.3.7.7.7s.7-.3.7-.7V9.1c0-.4-.3-.7-.7-.7M9.4 5.8c-.2.1-.3.4-.3.6s.1.5.3.6c.1.2.4.3.6.3s.5-.1.6-.3q.3-.3.3-.6c0-.2-.1-.5-.3-.6-.3-.4-.9-.4-1.2 0" />
    </G>
  </Svg>
);
export default SvgInfo;
