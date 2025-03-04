import { createAsyncThunk } from '@reduxjs/toolkit';
import { accountService } from '../services/api/AccountService'; // Import your API service
import { RootState } from '@/state';

export const fetchUserProfileThunk = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (token) {
      const response = await dispatch(accountService.endpoints.getProfile.initiate());
      if (response.data) {
        return response.data.client;
      } else {
        throw new Error('Failed to fetch profile');
      }
    }
    throw new Error('No token found');
  }
);