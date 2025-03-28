import { MenuLink } from "./HeaderBar";

export const links: MenuLink[] = [
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
    {label: 'MODULE.MARKET', route: '/services/market'},
    //{label: 'MODULE.TRAVEL', route: '/services/travel'},
  ];
export const appLinks: MenuLink[] = [...links, {label: 'Configuraciones', route: 'Promos'}];
