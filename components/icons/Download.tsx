import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgDownload = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 20 20"
    {...props}
  >
    <G fill={props.color}>
      <Path d="M19.2 12.3c-.4 0-.7.3-.7.7 0 2.6 0 3.9-.7 4.6s-2 .7-4.6.7h-6c-2.6 0-3.9 0-4.6-.7-.6-.7-.6-2-.6-4.6 0-.4-.3-.7-.7-.7s-.8.3-.8.7c0 3 0 4.5 1.1 5.6s2.6 1.1 5.6 1.1h6c3 0 4.5 0 5.6-1.1C20 17.5 20 16 20 13c0-.4-.4-.7-.8-.7" />
      <Path d="M9.7 14.5c.1.1.2.1.2.2h.2s.1 0 0 0c.1 0 .2 0 .2-.1.1 0 .1-.1.2-.1l4-4.4c.3-.3.2-.7 0-1-.3-.3-.7-.2-1 0l-2.7 3V1c0-.4-.3-.7-.7-.7s-.6.3-.6.7v11.1l-2.7-3c-.3-.3-.7-.3-1 0s-.3.7 0 1z" />
    </G>
  </Svg>
);
export default SvgDownload;
