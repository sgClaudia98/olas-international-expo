
export type MainLayoutState = {
  mainMenuTabIndex: number;
  showMainLoader: boolean;
  dynamicScreenValue: any;
  isLoginVisible: boolean;
}

export const mainLayoutInitialState: MainLayoutState = {
  mainMenuTabIndex: 0,
  showMainLoader: false,
  dynamicScreenValue: null,
  isLoginVisible: false,
};

const mainMenuTabIndexKey: string = 'MAIN_MENU_TAB_INDEX';
const showMainLoaderKey: string = 'SHOW_MAIN_LOADER';
const dynamicScreenValueKey: string = 'DYNAMIC_SCREEN_VALUE';
const isLoginVisibleKey: string = 'IS_LOGIN_VISIBLE';

export const mainLayoutReducer = (state: any, action: any) => {
  switch (action.type) {
    case mainMenuTabIndexKey: {
      return {
        ...state,
        mainMenuTabIndex: action.newValue
      }
    }

    case showMainLoaderKey: {
      return {
        ...state,
        showMainLoader: action.newValue
      }
    }

    case dynamicScreenValueKey: {
      return {
        ...state,
        dynamicScreenValue: action.newValue
      }
    }

    case isLoginVisibleKey:
      return {
        ...state,
        isLoginVisible: action.newValue,
    };

    default:
      return state;
  }
};
export class MainLayoutStateService {
  static dispatch: React.Dispatch<any> = () => null;

  static setMainMenuIndex(newValue: number) {
    self.dispatch({ type: mainMenuTabIndexKey, newValue });
  }

  static setShowMainLoader(newValue: boolean) {
    self.dispatch({ type: showMainLoaderKey, newValue });
  }

  static setDynamicScreenValue(newValue: any) {
    self.dispatch({ type: dynamicScreenValueKey, newValue });
  }

  static setIsModalVisible(newValue: any) {
    self.dispatch({ type: isLoginVisibleKey, newValue });
  }
};

const self = MainLayoutStateService;