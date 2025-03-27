import React from "react";
import { View, Platform } from "react-native";
import HeaderBar, { MenuLink } from "./HeaderBar";
import LogoHeader from "./LogoHeader";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { appLinks, links } from "./links";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import headerStyles from "@/styles/header"

const HeaderLeft = () => {
  const styles = useResponsiveStyles(headerStyles)
  const {lessThan} =useBreakpoints();
  return <View style={styles.containerLeft}>
    <LogoHeader />
    {!lessThan.tablet  && <HeaderBar links={Platform.OS == 'web' ? links : appLinks} />}
  </View>
}

export default HeaderLeft