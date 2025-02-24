import React from "react";
import { View, Platform } from "react-native";
import HeaderBar, { MenuLink } from "./HeaderBar";
import LogoHeader from "./LogoHeader";
const links: MenuLink[] = [
    /*{
      label: 'Services',
      route: 'Home',
      navigation: {
        name: 'MainLayout',
        params: {
          screen: 'Services',
          params: {
            screen: 'Home',
          },
        },
      },
    },
    */
    {label: 'Market', route: '/services/market'},
    {label: 'Travels', route: '/services/travel'},
  ];
const appLinks: MenuLink[] = [...links, {label: 'Configuraciones', route: 'Promos'}];


const HeaderLeft = () => {
  return <View style={{flexDirection: "row"}}>
    <LogoHeader />
    <HeaderBar links={Platform.OS == 'web' ? links : appLinks} />
  </View>
}

export default HeaderLeft