import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgHistory = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 20 20"
    {...props}
  >
    <G fill="currentColor">
      <Path d="M10 5.2c-.4 0-.8.4-.8.8v4c0 .2.1.4.2.6l2.5 2.5c.2.2.4.2.6.2s.4-.1.6-.2c.3-.3.3-.8 0-1.1l-2.3-2.3V6c0-.4-.4-.8-.8-.8" />
      <Path d="M16.9 3.1C13.1-.7 6.9-.8 3 3v-.8c0-.4-.3-.8-.8-.8-.4 0-.8.3-.8.8v2.6c0 .4.3.7.8.8v-.8.8h2.6c.4 0 .8-.3.8-.8s-.3-.7-.7-.7h-.8C7.3.9 12.6.9 15.8 4.2c3.3 3.3 3.3 8.5.1 11.7s-8.5 3.2-11.7-.1c-1.9-1.9-2.7-4.6-2.4-7.1 0-.3-.2-.7-.7-.8-.4 0-.8.3-.8.7-.4 2.9.5 6 2.8 8.3 3.8 3.8 10 3.9 13.9.1 3.8-3.9 3.7-10.1-.1-13.9" />
    </G>
  </Svg>
);
export default SvgHistory;
