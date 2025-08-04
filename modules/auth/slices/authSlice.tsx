import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import platformStorage from '@/utils/platformStorage';
import { Client } from '../models/ClientModel';
import { fetchUserProfileThunk } from './authThunks';

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
  details?: Client;
}

const initialState: AuthState = {
  user: undefined,
  token: undefined,
  refreshToken: undefined,
};

// Function to save auth state in storage
const saveAuthState = async (state: AuthState) => {
  try {
    await platformStorage.setItem(AUTH_KEY_STORAGE, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving auth state:', error);
  }
};

// Function to load auth state from storage
const loadAuthState = async (): Promise<AuthState> => {
  try {
    const jsonValue = await platformStorage.getItem(AUTH_KEY_STORAGE);
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
    logout: (state) => {
      state.user = undefined;
      state.token = undefined;
      state.refreshToken = undefined;
      platformStorage.removeItem(AUTH_KEY_STORAGE); // Clear storage on logout
    },
    setAuthState: (state, { payload }: PayloadAction<AuthState>) => {
      state.user = payload.user;
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      saveAuthState(state); // Persist to AsyncStorage
    },
    setUserDetails: (state, { payload }: PayloadAction<Client>) => {
      if (state.user) {
        state.user.details = payload;
        saveAuthState(state); // Persist to AsyncStorage
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfileThunk.fulfilled, (state, { payload }) => {
      if (state.user) {
        console.debug('User details:', payload);
        state.user.details = payload;
      }
    });
  },
});

export const { setAuthState, logout, setUserDetails } = authSlice.actions;
export default authSlice.reducer;

// Async function to rehydrate state
export const loadAuthStateFromStorage = () => async (dispatch: any) => {
  const storedAuth = await loadAuthState();
  dispatch(setAuthState(storedAuth));
  if (storedAuth.token) {
    dispatch(fetchUserProfileThunk());
  }
};
