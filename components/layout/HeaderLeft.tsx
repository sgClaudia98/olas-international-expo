import React from "react";
import { View, Platform } from "react-native";
import HeaderBar, { MenuLink } from "./HeaderBar";
import LogoHeader from "./LogoHeader";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { appLinks, links } from "./links";


const HeaderLeft = () => {
  const {isTablet} =useBreakpoints();
  return <View style={{flexDirection: "row"}}>
    <LogoHeader />
    {!isTablet && <HeaderBar links={Platform.OS == 'web' ? links : appLinks} />}
  </View>
}

export default HeaderLeft