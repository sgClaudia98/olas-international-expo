import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgLocation = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 20 20"
    {...props}
  >
    <G fill={props.color}>
      <Path d="M12.5 6c-.3-.3-.7-.6-1.1-.8C10 4.7 8.5 5 7.5 6c-.7.7-1 1.6-1 2.5s.4 1.8 1 2.5c.7.7 1.6 1 2.5 1 .5 0 .9-.1 1.4-.3.4-.2.8-.4 1.1-.8.3-.3.6-.7.8-1.1s.3-.9.3-1.4-.1-.9-.3-1.4c-.2-.3-.5-.7-.8-1m-.6 3.3c-.1.3-.3.5-.5.7s-.4.3-.7.5c-.7.2-1.6 0-2.2-.5-.4-.4-.6-1-.6-1.5q0-.9.6-1.5t1.5-.6c.3 0 .5.1.8.2s.5.3.7.5.3.4.5.7c.1.3.2.5.2.8-.1.2-.2.4-.3.7" />
      <Path d="M18.3 6.7C17.3 2.3 13.4.3 10 .3s-7.3 2-8.3 6.4c-1.1 4.9 1.8 9 4.5 11.5 1 1 2.3 1.5 3.8 1.5s2.7-.5 3.8-1.5c2.6-2.5 5.6-6.6 4.5-11.5m-5.6 10.5c-1.5 1.4-4 1.4-5.5 0-2.4-2.3-5-6-4.1-10.2C4 3.1 7.4 1.7 10 1.7s6 1.4 6.9 5.3c.9 4.2-1.7 7.9-4.2 10.2" />
    </G>
  </Svg>
);
export default SvgLocation;
