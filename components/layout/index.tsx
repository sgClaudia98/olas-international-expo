import HeaderLeft from "./HeaderLeft";
import IconsHeader from "./IconsHeaders";
export * from "./IconsHeaders";
export * from "./HeaderLeft";

export const screenHeaderLogoOption = {
  headerLeft: () => <HeaderLeft />,
  headerRight: () => <IconsHeader />,
  headerTitle: "",
};
