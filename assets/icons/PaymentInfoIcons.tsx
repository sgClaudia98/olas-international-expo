import { Colors } from "@/styles";
import React from "react";
import { IconProps } from "./types";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export const ProfileIcon: React.FC<IconProps> = ({
  width = 16,
  height = 16,
  fill = "none",
  stroke = Colors.black.primary,
}) => {
  return (
    <>
      <Svg width={width} height={height} viewBox="0 0 16 16" fill={fill}>
        <Path
          d="M7.99938 7.36C9.43938 7.36 10.6394 6.16 10.6394 4.72C10.6394 3.28 9.43938 2 7.99938 2C6.55938 2 5.35938 3.2 5.35938 4.64C5.35938 6.08 6.55938 7.36 7.99938 7.36Z"
          stroke={stroke}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M14.1598 14L13.9198 13.52C12.7998 11.36 10.5598 10 8.15984 10H7.83984C5.35984 10 3.19984 11.36 2.07984 13.52L1.83984 14"
          stroke={stroke}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </>
  );
};

export const IdIcon: React.FC<IconProps> = ({
  width = 16,
  height = 16,
  fill = "none",
  stroke = Colors.black.primary,
}) => {
  return (
    <>
      <Svg width={width} height={height} viewBox="0 0 16 16" fill={fill}>
        <Path
          d="M13.2984 3.30005H2.69844C1.99844 3.30005 1.39844 3.90005 1.39844 4.60005V11.3C1.39844 12 1.99844 12.6 2.69844 12.6H13.3984C14.0984 12.6 14.6984 12 14.6984 11.3V4.70005C14.6984 3.90005 14.0984 3.30005 13.2984 3.30005Z"
          stroke={stroke}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path d="M9.80078 6H12.3008" stroke={stroke} stroke-linecap="round" />
        <Path
          d="M9.80078 7.8999H12.3008"
          stroke={stroke}
          stroke-linecap="round"
        />
        <Path
          d="M9.80078 9.8999H12.3008"
          stroke={stroke}
          stroke-linecap="round"
        />
        <Path
          d="M7.90078 5.8999H3.80078V9.9999H7.90078V5.8999Z"
          stroke={stroke}
          stroke-linejoin="round"
        />
      </Svg>
    </>
  );
};

export const PhoneIcon: React.FC<IconProps> = ({
  width = 16,
  height = 16,
  fill = Colors.white.default,
  stroke = Colors.black.primary,
}) => {
  return (
    <>
      <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
        <G clip-path="url(#clip0_3328_16966)">
          <Path
            d="M14.665 11.28V13.28C14.6657 13.4657 14.6277 13.6494 14.5533 13.8195C14.479 13.9897 14.3699 14.1424 14.233 14.2679C14.0962 14.3934 13.9347 14.489 13.7588 14.5485C13.5829 14.6079 13.3966 14.63 13.2117 14.6133C11.1602 14.3904 9.18966 13.6894 7.45833 12.5667C5.84755 11.5431 4.48189 10.1774 3.45833 8.56665C2.33165 6.82745 1.63049 4.84731 1.41166 2.78665C1.395 2.60229 1.41691 2.41649 1.47599 2.24107C1.53508 2.06564 1.63004 1.90444 1.75484 1.76773C1.87964 1.63102 2.03153 1.52179 2.20086 1.447C2.37018 1.37221 2.55322 1.33349 2.73833 1.33332H4.73833C5.06187 1.33013 5.37552 1.4447 5.62084 1.65567C5.86615 1.86664 6.02638 2.15961 6.07166 2.47998C6.15608 3.12003 6.31263 3.74847 6.53833 4.35332C6.62802 4.59193 6.64744 4.85126 6.59427 5.10057C6.5411 5.34988 6.41757 5.57872 6.23833 5.75998L5.39166 6.60665C6.3407 8.27568 7.72263 9.65761 9.39166 10.6067L10.2383 9.75998C10.4196 9.58074 10.6484 9.45722 10.8977 9.40405C11.1471 9.35088 11.4064 9.37029 11.645 9.45998C12.2498 9.68568 12.8783 9.84224 13.5183 9.92665C13.8422 9.97234 14.1379 10.1355 14.3494 10.385C14.5608 10.6345 14.6731 10.953 14.665 11.28Z"
            stroke={stroke}
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_3328_16966">
            <Rect width={width} height={height} fill={fill} />
          </ClipPath>
        </Defs>
      </Svg>
    </>
  );
};

export const MapPinIcon: React.FC<IconProps> = ({
  width = 16,
  height = 16,
  fill = "none",
  stroke = Colors.black.primary,
}) => {
  return (
    <>
      <Svg width={width} height={height} viewBox="0 0 16 16" fill={fill}>
        <Path
          d="M13.3346 6.66659C13.3346 10.6666 8.0013 14.6666 8.0013 14.6666C8.0013 14.6666 2.66797 10.6666 2.66797 6.66659C2.66797 5.2521 3.22987 3.89554 4.23007 2.89535C5.23026 1.89516 6.58681 1.33325 8.0013 1.33325C9.41579 1.33325 10.7723 1.89516 11.7725 2.89535C12.7727 3.89554 13.3346 5.2521 13.3346 6.66659V6.66659Z"
          stroke={stroke}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M8 8.66675C9.10457 8.66675 10 7.77132 10 6.66675C10 5.56218 9.10457 4.66675 8 4.66675C6.89543 4.66675 6 5.56218 6 6.66675C6 7.77132 6.89543 8.66675 8 8.66675Z"
          stroke={stroke}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </>
  );
};

export const EmailIcon: React.FC<IconProps> = ({
  width = 16,
  height = 16,
  fill = "none",
  stroke = Colors.black.primary,
}) => {
  return (
    <>
      <Svg width={width} height={height} viewBox="0 0 16 16" fill={fill}>
        <Path
          d="M2.66536 2.66675H13.332C14.0654 2.66675 14.6654 3.26675 14.6654 4.00008V12.0001C14.6654 12.7334 14.0654 13.3334 13.332 13.3334H2.66536C1.93203 13.3334 1.33203 12.7334 1.33203 12.0001V4.00008C1.33203 3.26675 1.93203 2.66675 2.66536 2.66675Z"
          stroke={stroke}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M14.6654 4L7.9987 8.66667L1.33203 4"
          stroke={stroke}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </>
  );
};
