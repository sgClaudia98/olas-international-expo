import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgDocs = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 20 20"
    {...props}
  >
    <G fill="currentColor">
      <Path d="m17.7 5.4-5-5c-.1-.1-.3-.2-.5-.2H4.6c-.7.1-1.3.3-1.8.8s-.7 1.1-.7 1.8v14.4c0 .7.3 1.3.7 1.8.5.5 1.1.7 1.8.7h10.8c.7 0 1.3-.3 1.8-.7.5-.5.7-1.1.7-1.8V6c0-.2-.1-.4-.2-.6m-1.8.3h-3.4V2.3zm.3 12.3c-.2.2-.5.3-.8.3H4.6c-.3 0-.6-.1-.8-.3s-.3-.5-.3-.8V2.8c0-.3.1-.6.3-.8s.5-.3.8-.3h6.5v4.7c0 .4.3.7.7.7h4.7v10.1c0 .3-.1.6-.3.8" />
      <Path d="M13.6 10.2H6.4c-.4 0-.7.3-.7.7s.3.7.7.7h7.2c.4 0 .7-.3.7-.7s-.3-.7-.7-.7M13.6 13.8H6.4c-.4 0-.7.3-.7.7s.3.7.7.7h7.2c.4 0 .7-.3.7-.7s-.3-.7-.7-.7M6.4 8h1.8c.4 0 .7-.3.7-.7s-.3-.7-.7-.7H6.4c-.4 0-.7.3-.7.7s.3.7.7.7" />
    </G>
  </Svg>
);
export default SvgDocs;
