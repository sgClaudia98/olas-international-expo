import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loadAuthStateFromStorage } from '../../modules/auth/slices/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { accountService } from '@/modules/auth/services/AccountService';
import { bookingService } from '@/modules/marketplace/services/api/BookingService';
import { geoService } from '@/services/api/GeoService';

export const store = configureStore({
  reducer: {
    [accountService.reducerPath]: accountService.reducer,
    [bookingService.reducerPath]: bookingService.reducer,
    [geoService.reducerPath]: geoService.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(accountService.middleware)
      .concat(bookingService.middleware)
      .concat(geoService.middleware),
});

// Load persisted auth state on app startup
store.dispatch(loadAuthStateFromStorage());

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
