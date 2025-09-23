// authThunks.tsx - Maneja toda la lógica async
import { createAsyncThunk } from '@reduxjs/toolkit';
import { accountService } from '../services/api/AccountService';
import { RootState } from '@/state';
import { setAuthState, logout, setUserDetails, User } from './authSlice';
import { decodeToken } from "react-jwt";
import platformStorage from '@/utils/platformStorage';
import { IAuthRequest } from '../services/interfaces/account';

const AUTH_KEY_STORAGE = 'auth';

// Function to save auth state in storage
const saveAuthState = async (state: any) => {
  try {
    await platformStorage.setItem(AUTH_KEY_STORAGE, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving auth state:', error);
  }
};

// Function to load auth state from storage
const loadAuthFromStorage = async () => {
  try {
    const jsonValue = await platformStorage.getItem(AUTH_KEY_STORAGE);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading auth state:', error);
    return null;
  }
};

// Thunk para login
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: IAuthRequest, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(accountService.endpoints.auth.initiate(credentials));
      
      if (response.data) {
        const decoded: any = decodeToken(response.data.accessToken);
        console.debug("decoded", decoded);
        
        const authState = {
          user: {
            name: decoded?.sub,
            username: decoded?.sub,
            userId: decoded?.sub,
            imageUrl: `https://storageaccountsocial.blob.core.windows.net/avatars/${decoded?.sub}.png`,
          } as User,
          token: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };
        
        dispatch(setAuthState(authState));
        // Guardar en storage después de setear el estado
        await saveAuthState(authState);
        
        // Después del login, obtener el perfil
        dispatch(fetchUserProfileThunk());
        
        return authState;
      } else {
        dispatch(logout());
        return rejectWithValue('Login failed');
      }
    } catch (error) {
      dispatch(logout());
      return rejectWithValue(error);
    }
  }
);

// Thunk para obtener perfil
export const fetchUserProfileThunk = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      
      if (token) {
        const response = await dispatch(accountService.endpoints.getProfile.initiate());
        if (response.data) {
          dispatch(setUserDetails(response.data.client));
          
          // Guardar el estado actualizado en storage
          const updatedState = (getState() as RootState).auth;
          await saveAuthState(updatedState);
          
          return response.data.client;
        } else {
          dispatch(logout());
          return rejectWithValue('Failed to fetch profile');
        }
      }
      return rejectWithValue('No token found');
    } catch (error) {
      dispatch(logout());
      return rejectWithValue(error);
    }
  }
);

// Thunk para inicializar la app (cargar desde storage y obtener perfil si hay token)
export const initializeAuthThunk = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch }) => {
    const storedAuth = await loadAuthFromStorage();
    
    if (storedAuth) {
      dispatch(setAuthState(storedAuth));
      
      if (storedAuth.token) {
        dispatch(fetchUserProfileThunk());
      }
      
      return storedAuth;
    }
    
    return null;
  }
);
