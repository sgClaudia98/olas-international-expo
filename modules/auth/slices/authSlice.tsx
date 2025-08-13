// authSlice.tsx - Sin thunk, solo reducers puros
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import platformStorage from '@/utils/platformStorage';
import { Client } from '../models/ClientModel';

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
      platformStorage.removeItem(AUTH_KEY_STORAGE);
    },
    setAuthState: (state, { payload }: PayloadAction<AuthState>) => {
      state.user = payload.user;
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      saveAuthState(state);
    },
    setUserDetails: (state, { payload }: PayloadAction<Client>) => {
      if (state.user) {
        state.user.details = payload;
        saveAuthState(state);
      }
    },
    // Nuevo reducer para manejar el estado de carga del perfil
    setProfileLoading: (state, { payload }: PayloadAction<boolean>) => {
      // Podrías agregar un campo loading si lo necesitas
    },
  },
});

export const { setAuthState, logout, setUserDetails, setProfileLoading } = authSlice.actions;
export default authSlice.reducer;