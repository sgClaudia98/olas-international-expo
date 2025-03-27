import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgStar = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 15 14"
    {...props}
  >
    <Path
      fill={props.color}
      d="m7.5 0 2.274 4.608 5.086.743-3.68 3.585.868 5.064L7.5 11.608 2.95 14l.869-5.064L.139 5.35l5.086-.743z"
    />
  </Svg>
);
export default SvgStar;
