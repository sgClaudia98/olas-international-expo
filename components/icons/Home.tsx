import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgHome = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 20 20"
    {...props}
  >
    <G fill="currentColor">
      <Path d="M19.2 5.9c-.6-1-1.5-1.6-3.3-2.7l-1.8-1.1C12.2.9 11.2.3 10 .3S7.8.9 5.9 2.1L4.1 3.2C2.4 4.3 1.4 4.9.8 5.9S.2 8 .2 10.2v1.4c0 3.7 0 5.6 1.3 6.9s3.1 1.3 6.7 1.3h3.6c3.6 0 5.4 0 6.7-1.3s1.3-3.2 1.3-6.9v-1.4c-.1-2.2-.1-3.3-.6-4.3m-.9 5.7c0 3.3 0 5-.9 5.9-.8.9-2.4.9-5.6.9H8.2c-3.2 0-4.8 0-5.6-.9-.9-.9-.9-2.5-.9-5.9v-1.4c0-1.9 0-2.9.4-3.6s1.2-1.2 2.8-2.2l1.8-1.1c1.7-1 2.5-1.6 3.3-1.6s1.6.5 3.3 1.6l1.8 1.1c1.6 1 2.4 1.5 2.8 2.2s.4 1.7.4 3.6z" />
      <Path d="M12.7 14.7H7.3c-.4 0-.7.3-.7.7s.3.7.7.7h5.4c.4 0 .7-.3.7-.7s-.3-.7-.7-.7" />
    </G>
  </Svg>
);
export default SvgHome;
