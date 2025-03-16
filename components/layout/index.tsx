import React from "react";
import HeaderLeft from "./HeaderLeft";
import RightHeader from "./HeaderRight";
export * from "./HeaderRight";
export * from "./HeaderLeft";
export * from "./Page";
export * as Footer from "./MainFooterComponent";
export * from "./LogoHeader";

export const screenHeaderLogoOption = ({ navigation }) => {
  return {
    headerLeft: () => <HeaderLeft />,
    headerRight: () => <RightHeader navigation={navigation} />,
    headerTitle: "",
  };
};
