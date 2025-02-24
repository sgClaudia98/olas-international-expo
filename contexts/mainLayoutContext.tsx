import React, { FC, useReducer, createContext, ReactNode } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/core';

import { MainLayoutState } from '@/reducers/mainLayoutReducer';
import { mainLayoutReducer, mainLayoutInitialState, MainLayoutStateService } from '@/reducers/mainLayoutReducer';

type MainLayoutContextProps = {
  mainLayoutStates: MainLayoutState;
}
const defaultContext: MainLayoutContextProps = {
  mainLayoutStates: mainLayoutInitialState,
};

export const MainLayoutcontext = createContext<MainLayoutContextProps>(defaultContext);

export const MainLayoutProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mainLayoutStates, dispatchMainLayoutStates] = useReducer(
    mainLayoutReducer, mainLayoutInitialState
  );

  MainLayoutStateService.dispatch = dispatchMainLayoutStates;

  return (
    <MainLayoutcontext.Provider value={{ mainLayoutStates }}>
      {children}
    </MainLayoutcontext.Provider>
  );
};