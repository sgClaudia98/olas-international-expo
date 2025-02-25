import HeaderLeft from "./HeaderLeft";
import IconsHeader from "./IconsHeaders";
export * from "./IconsHeaders";
export * from "./HeaderLeft";
export * from "./Page";
export * as Footer from "./MainFooterComponent";
export * from "./LogoHeader";

export const screenHeaderLogoOption = {
  headerLeft: () => <HeaderLeft />,
  headerRight: () => <IconsHeader />,
  headerTitle: "",
};
