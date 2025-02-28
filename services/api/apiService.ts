import {BaseQueryApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {decodeToken} from 'react-jwt';
import {RootState} from '@/state';
import { accountService } from '@/modules/auth/services/api/AccountService';
import { logout, setCredentials, User } from '@/modules/auth/slices/authSlice';
import { BASE_URL } from '@/constants';

const constructBaseQuery = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  });

/**
 * Helper function to check if the token has expired.
 * @param token - The JWT token to check for expiration.
 * @returns boolean - True if the token has expired, otherwise false.
 */
const isTokenExpired = (token: string): boolean => {
  const decoded: any = decodeToken(token);
  if (decoded?.exp) {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime; // Compare expiration time with current time
  }
  return false; // If no expiration claim exists, assume it's not expired
};

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
  baseUrl: string,
) => {
  const baseQuery = constructBaseQuery(baseUrl);
  let result = await baseQuery(args, api, extraOptions);
  const {token, refreshToken} = (api.getState() as RootState).auth;
  
  // Check if the token has expired and needs refreshing
  if (token && isTokenExpired(token)) {
    try {
      if (refreshToken) {
        // Call the refresh token endpoint using the refresh token
        const refreshResponse = await fetch(`${BASE_URL}/api/v1/client/refresh-token`, { // Replace with your actual refresh token endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });

        const refreshData = await refreshResponse.json();

        if (refreshData.accessToken) {
          const {accessToken, refreshToken} = refreshData;
          const decoded: any = decodeToken(accessToken);
          // Update the state with new credentials
          api.dispatch(
            setCredentials({
              user: {
                name: decoded?.sub,
                username: decoded?.sub,
                userId: decoded?.sub,
                imageUrl: `https://storageaccountsocial.blob.core.windows.net/avatars/${decoded?.sub}.png`,
              } as User,
              token: accessToken,
              refreshToken: refreshToken, // Keep the refreshToken the same
            }),
          );

          // Retry the original query with the new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          throw new Error('Failed to refresh token');
        }
      } else {
        throw new Error('No refresh token available');
      }
    } catch (error) {
      console.error('API Reauthentication failed. Logging out:', error);
      api.dispatch(logout()); // Log out if the refresh token fails
    }
  } else if (result?.meta?.response?.status === 403 || result?.meta?.response?.status === 401) {
    // If not expired but still 401/403, attempt refresh anyway
    try {
      const refreshToken = (api.getState() as RootState).auth.refreshToken;

      if (refreshToken) {
        const refreshResponse = await fetch(`${BASE_URL}/api/v1/client/refresh-token`, { // Replace with your actual refresh token endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });
        const refreshData = await refreshResponse.json();

        if (refreshData?.accessToken) {
          const newToken = refreshData.accessToken;
          const decoded: any = decodeToken(newToken);

          api.dispatch(
            setCredentials({
              user: {
                name: decoded?.sub,
                username: decoded?.sub,
                userId: decoded?.sub,
                imageUrl: `https://storageaccountsocial.blob.core.windows.net/avatars/${decoded?.sub}.png`,
              } as User,
              token: newToken,
              refreshToken: refreshToken,
            }),
          );

          result = await baseQuery(args, api, extraOptions);
        } else {
          throw new Error('Failed to refresh token');
        }
      }
    } catch (error) {
      console.error('API Reauthentication failed. Logging out 2:', error);
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
  baseUrl: string,
) => {
  const baseQuery = constructBaseQuery(baseUrl);
  return baseQuery(args, api, extraOptions);
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
