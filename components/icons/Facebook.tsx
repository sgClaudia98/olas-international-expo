import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgFacebook = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 15 15"
    {...props}
  >
    <G clipPath="url(#Facebook_svg__a)">
      <Path
        fill="#D1EAFD"
        d="M7.03.134a7.01 7.01 0 0 0-1.694 13.814V9.286H3.891V7.144h1.445v-.923c0-2.386 1.08-3.492 3.422-3.492.445 0 1.21.088 1.524.174v1.942a9 9 0 0 0-.81-.026c-1.149 0-1.593.436-1.593 1.568v.757h2.29l-.394 2.142H7.88v4.817A7.01 7.01 0 0 0 7.029.134"
      />
    </G>
    <Defs>
      <ClipPath id="Facebook_svg__a">
        <Path fill="#fff" d="M.02.134h14.02v14.02H.02z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgFacebook;
