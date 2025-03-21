import { Colors } from "@/styles";
import React from "react";
import Svg, { Path } from "react-native-svg";

const TVIcon = () => {
    return (
      <Svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        style={{ cursor: 'pointer' }}>
        <Path
          d="M21.6004 1.19995L15.0004 8.39995L8.40039 1.19995"
          stroke={Colors.blue.second}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M26.0392 8.3999H3.95922C2.43491 8.3999 1.19922 9.61769 1.19922 11.1199V26.0799C1.19922 27.5821 2.43491 28.7999 3.95922 28.7999H26.0392C27.5635 28.7999 28.7992 27.5821 28.7992 26.0799V11.1199C28.7992 9.61769 27.5635 8.3999 26.0392 8.3999Z"
          stroke={Colors.blue.second}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  };
  
  export default TVIcon;