import React from "react";
import { Colors } from "@/styles";
import Svg, { Path, G, Defs, ClipPath, Rect, Mask } from "react-native-svg";
import { View } from "react-native";
import SvgUfo from "./icons/Ufo";
import IconSvg, { IconProps } from "./ui/IconSvg";

export const FoodAndCombo: React.FC<IconProps> = ({
  size = 30,
  fill = "none",
  stroke = Colors.blue.second,
}) => {
  return (
    <>
      <Svg width={size} height={size} viewBox="0 0 36 35" fill={fill}>
        <Path
          d="M12.0604 20.936L8.69389 17.5809M23.0631 22.5807L19.0233 18.5348M22.5042 12.7127C22.5042 12.7127 25.5587 9.42331 28.2519 9.42331C31.8155 9.42331 33.9996 12.7127 33.9996 12.7127C33.9996 12.7127 31.8155 16.002 28.2519 16.002C24.6884 16.002 22.5042 12.7127 22.5042 12.7127ZM22.5042 12.7127C22.5042 12.7127 19.2199 10.5252 19.2199 6.9563C19.2199 3.38736 22.5042 1.19995 22.5042 1.19995C22.5042 1.19995 25.7886 3.38736 25.7886 6.9563C25.7886 9.68646 22.5042 12.7127 22.5042 12.7127ZM1.59961 33.6C1.59961 33.6 17.8081 27.8436 22.5048 23.1398C23.1916 22.453 23.7367 21.6374 24.1088 20.7396C24.481 19.8419 24.6729 18.8795 24.6737 17.9074C24.6744 16.9353 24.484 15.9726 24.1133 15.0742C23.7425 14.1759 23.1988 13.3594 22.513 12.6715C21.8272 11.9836 21.0128 11.4377 20.1164 11.065C19.22 10.6923 18.259 10.5001 17.2884 10.4993C16.3178 10.4986 15.3565 10.6893 14.4595 11.0606C13.5625 11.4319 12.7473 11.9765 12.0604 12.6633C7.34729 17.3835 1.59961 33.6 1.59961 33.6Z"
          stroke={stroke}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </>
  );
};

export const PersonalCare: React.FC<IconProps> = ({
  size = 30,
  fill = "none",
  stroke = Colors.blue.second,
}) => {
  return (
    <>
      <Svg width={size} height={size} viewBox="0 0 32 32" fill={fill}>
        <G clipPath="url(#clip0_4162_15734)">
          <Path
            d="M7.48117 17.4412H2.20117V29.8012H7.48117V17.4412Z"
            stroke={stroke}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M8.32227 26.44L19.6023 29.8L29.8023 26.44C29.8023 26.44 30.2823 23.68 27.1623 23.56C24.0423 23.44 18.2823 23.56 18.2823 23.56L14.2023 22.24"
            stroke={stroke}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M5.5625 17.4412H12.2825L21.4025 20.4412C21.4025 20.4412 22.9625 21.6412 22.8425 23.5612"
            stroke={stroke}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M19.8425 16.0002V14.9202C19.8425 11.6802 17.2025 9.16016 14.0825 9.16016C11.4425 9.16016 9.2825 10.8402 8.5625 13.2402"
            stroke={stroke}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M14.082 9.16066V2.68066"
            stroke={stroke}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M11.6836 2.20093H17.3236C18.2836 2.20093 19.2436 2.44093 20.0836 2.92093L21.5236 3.76093"
            stroke={stroke}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M24.7619 12.1601C23.6819 11.0801 23.9219 9.64008 24.7619 8.08008L26.6819 5.08008L28.6019 8.20008C29.6819 9.88008 29.6819 11.2001 28.6019 12.2801C27.5219 13.2401 25.7219 13.2401 24.7619 12.1601Z"
            fill={stroke}
          />
        </G>
        <Defs>
          <ClipPath id="clip0_4162_15734">
            <Rect
              width="31.2"
              height="31.2"
              fill="white"
              transform="translate(0.400391 0.399902)"
            />
          </ClipPath>
        </Defs>
      </Svg>
    </>
  );
};

export const Ferreteria: React.FC<IconProps> = ({
  size = 30,
  fill = "none",
  stroke = Colors.blue.second,
}) => {
  return (
    <>
      <Svg width={size} height={size} viewBox="0 0 30 30" fill={fill}>
        <Path
          d="M18.1925 7.44993C17.9264 7.72139 17.7773 8.08637 17.7773 8.4665C17.7773 8.84663 17.9264 9.21161 18.1925 9.48308L20.5161 11.8067C20.7876 12.0728 21.1525 12.2218 21.5327 12.2218C21.9128 12.2218 22.2778 12.0728 22.5492 11.8067L28.0242 6.33169C28.7545 7.94542 28.9756 9.74337 28.6581 11.4859C28.3406 13.2285 27.4996 14.833 26.2471 16.0854C24.9946 17.3379 23.3902 18.1789 21.6476 18.4964C19.905 18.8139 18.1071 18.5928 16.4934 17.8626L6.45829 27.8976C5.88055 28.4754 5.09696 28.7999 4.27991 28.7999C3.46286 28.7999 2.67927 28.4754 2.10153 27.8976C1.52379 27.3199 1.19922 26.5363 1.19922 25.7193C1.19922 24.9022 1.52379 24.1186 2.10153 23.5409L12.1366 13.5058C11.4064 11.8921 11.1852 10.0941 11.5027 8.35156C11.8202 6.60899 12.6613 5.00456 13.9137 3.75209C15.1662 2.49961 16.7706 1.65859 18.5132 1.34109C20.2558 1.02359 22.0537 1.24469 23.6675 1.97493L18.207 7.4354L18.1925 7.44993Z"
          stroke={stroke}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </>
  );
};

export const ElectricalAppliances: React.FC<IconProps> = ({
  size = 30,
  fill = "none",
  stroke = Colors.blue.second,
}) => {
  return (
    <>
      <Svg width={size} height={size} viewBox="0 0 30 30" fill={fill}>
        <Path
          d="M21.6004 1.19995L15.0004 8.39995L8.40039 1.19995"
          stroke={stroke}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M26.0392 8.3999H3.95922C2.43491 8.3999 1.19922 9.61769 1.19922 11.1199V26.0799C1.19922 27.5821 2.43491 28.7999 3.95922 28.7999H26.0392C27.5635 28.7999 28.7992 27.5821 28.7992 26.0799V11.1199C28.7992 9.61769 27.5635 8.3999 26.0392 8.3999Z"
          stroke={stroke}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </>
  );
};

const RoundIcon: React.FC<
  React.PropsWithChildren<{ color?: string; size?: number }>
> = ({ children, color = Colors.black.primary, size = 40 }) => {
  return (
    <View
      style={{
        height: size,
        width: size,
        borderRadius: "50%",
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </View>
  );
};

export const FastDeliveryIcon: React.FC<IconProps> = ({
  size = 24,
  ...props
}) => {
  return (
    <RoundIcon>
      <IconSvg name="Ufo" size={size} color={Colors.blue.fifth} {...props} />
    </RoundIcon>
  );
};

export const SafePaymentIcon: React.FC<IconProps> = ({
  size = 24,
  ...props
}) => {
  return (
    <RoundIcon>
      <IconSvg name="ShieldCheck" size={size} color={Colors.blue.fifth} {...props} />
    </RoundIcon>
  );
};

export const Support247Icon: React.FC<IconProps> = ({
  size = 24,
  ...props
}) => {
  return (
    <RoundIcon>
      <IconSvg name="PhoneCalling" size={size} color={Colors.blue.fifth} {...props} />
    </RoundIcon>
  );
};

