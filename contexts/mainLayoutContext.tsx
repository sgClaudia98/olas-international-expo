import React, { FC, useReducer, createContext, ReactNode } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/core';

import { MainLayoutState } from '@/reducers/mainLayoutReducer';
import { mainLayoutReducer, mainLayoutInitialState, MainLayoutStateService } from '@/reducers/mainLayoutReducer';
import { MenuLink } from '@/components/layout/HeaderBar';

type MainLayoutContextProps = {
  mainLayoutStates: MainLayoutState;
  serviceMenu: MenuLink[];
  setServiceMenu: (items: MenuLink[]) => void;
}
const defaultContext: MainLayoutContextProps = {
  mainLayoutStates: mainLayoutInitialState,
  serviceMenu: [],
  setServiceMenu: () => {}
};

export const MainLayoutcontext = createContext<MainLayoutContextProps>(defaultContext);

export const MainLayoutProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mainLayoutStates, dispatchMainLayoutStates] = useReducer(
    mainLayoutReducer, mainLayoutInitialState
  );
  const [serviceMenu, setServiceMenu] = React.useState<MenuLink[]>([]);

  MainLayoutStateService.dispatch = dispatchMainLayoutStates;

  return (
    <MainLayoutcontext.Provider value={{ mainLayoutStates, serviceMenu, setServiceMenu }}>
      {children}
    </MainLayoutcontext.Provider>
  );
};