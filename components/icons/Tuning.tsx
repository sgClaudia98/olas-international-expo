import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgTuning = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M15 15.7c-1.9 0-3.4-1.5-3.4-3.4s1.5-3.4 3.4-3.4 3.4 1.5 3.4 3.4-1.5 3.4-3.4 3.4m0-5.4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2M4.8 10.7c-1.8 0-3.2-1.4-3.2-3.2S3 4.3 4.8 4.3 8 5.7 8 7.5s-1.4 3.2-3.2 3.2m0-5c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8M15 8c-.4 0-.7-.3-.7-.7V1c0-.4.3-.7.7-.7s.7.3.7.7v6.3c0 .4-.3.7-.7.7M5 19.7c-.4 0-.7-.3-.7-.7v-6.3c-.1-.4.3-.7.7-.7s.7.3.7.7V19c0 .4-.3.7-.7.7M15 19.7c-.4 0-.7-.3-.7-.7v-1.8c0-.4.3-.7.7-.7s.7.3.7.7V19c0 .4-.3.7-.7.7M5 3.5c-.4 0-.7-.3-.7-.7V1c0-.4.3-.7.7-.7s.7.3.7.7v1.8c0 .4-.3.7-.7.7"
    />
  </Svg>
);
export default SvgTuning;
