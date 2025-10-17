import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgMarketFood = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 36 35"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.4}
      d="m12.06 20.936-3.366-3.355m14.37 5-4.04-4.046m3.48-5.822s3.055-3.29 5.748-3.29c3.564 0 5.748 3.29 5.748 3.29s-2.184 3.289-5.748 3.289-5.748-3.29-5.748-3.29m0 0s-3.284-2.188-3.284-5.757S22.504 1.2 22.504 1.2s3.285 2.187 3.285 5.756c0 2.73-3.285 5.757-3.285 5.757M1.6 33.6s16.208-5.756 20.905-10.46a7.4 7.4 0 0 0 2.169-5.233 7.41 7.41 0 0 0-2.161-5.235 7.4 7.4 0 0 0-5.225-2.173 7.38 7.38 0 0 0-5.228 2.164C7.347 17.383 1.6 33.6 1.6 33.6"
    />
  </Svg>
);
export default SvgMarketFood;
