import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgPaypal = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 11 14"
    {...props}
  >
    <Path
      fill={props.color}
      d="M3.05 11.324H.784a.303.303 0 0 1-.3-.35l1.529-9.695A.37.37 0 0 1 2.38.964h3.897c1.844 0 3.186 1.343 3.155 2.968q-.004.203-.035.403a3.666 3.666 0 0 1-3.62 3.105H3.982a.37.37 0 0 0-.368.315L3.44 8.864l-.007.045-.374 2.369zM9.944 4.28c-.006.047-.006.094-.013.14A4.19 4.19 0 0 1 5.78 7.98H4.125l-.153.969-.007.045-.373 2.369-.073.455-.007.047h-.546l-.268 1.7a.303.303 0 0 0 .3.35h1.949c.183 0 .34-.134.368-.315l.514-3.255a.374.374 0 0 1 .368-.315h1.148a3.666 3.666 0 0 0 3.62-3.104A2.81 2.81 0 0 0 9.943 4.28"
    />
  </Svg>
);
export default SvgPaypal;
