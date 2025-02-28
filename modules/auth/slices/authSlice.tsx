import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY_STORAGE = 'auth';

export interface AuthState {
  user?: User;
  token?: string;
  refreshToken?: string;
}

export interface User {
  userId: string;
  username: string;
  name: string;
  imageUrl: string;
}

const initialState: AuthState = {
  user: undefined,
  token: undefined,
  refreshToken: undefined,
};

// Function to save auth state in AsyncStorage
const saveAuthState = async (state: AuthState) => {
  try {
    await AsyncStorage.setItem(AUTH_KEY_STORAGE, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving auth state:', error);
  }
};

// Function to load auth state from AsyncStorage
const loadAuthState = async (): Promise<AuthState> => {
  try {
    const jsonValue = await AsyncStorage.getItem(AUTH_KEY_STORAGE);
    return jsonValue != null ? JSON.parse(jsonValue) : initialState;
  } catch (error) {
    console.error('Error loading auth state:', error);
    return initialState;
  }
};

const authSlice = createSlice({
  name: AUTH_KEY_STORAGE,
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token, refreshToken } }: PayloadAction<{ user: User; token: string; refreshToken: string }>
    ) => {
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
      saveAuthState(state); // Persist to AsyncStorage
    },
    logout: (state) => {
      state.user = undefined;
      state.token = undefined;
      state.refreshToken = undefined;
      AsyncStorage.removeItem(AUTH_KEY_STORAGE); // Clear storage on logout
    },
    setAuthState: (state, { payload }: PayloadAction<AuthState>) => {
      state.user = payload.user;
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
    },
  },
});

export const { setCredentials, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;

// Async function to rehydrate state
export const loadAuthStateFromStorage = () => async (dispatch: any) => {
  const storedAuth = await loadAuthState();
  dispatch(setAuthState(storedAuth));
};
