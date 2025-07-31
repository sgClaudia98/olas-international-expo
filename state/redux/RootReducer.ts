import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loadAuthStateFromStorage } from '@/modules/auth/slices/authSlice';
import pendingCartReducer, { loadPendingCartItem } from '@/modules/marketplace/slices/pendingCartSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { accountService } from '@/modules/auth/services/api/AccountService';
import { bookingService } from '@/modules/marketplace/services/api/BookingService';
import { geoService } from '@/services/api/GeoService';

export const store = configureStore({
  reducer: {
    [accountService.reducerPath]: accountService.reducer,
    [bookingService.reducerPath]: bookingService.reducer,
    [geoService.reducerPath]: geoService.reducer,
    auth: authReducer,
    pendingCart: pendingCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(accountService.middleware)
      .concat(bookingService.middleware)
      .concat(geoService.middleware),
});


setupListeners(store.dispatch);
store.dispatch(loadAuthStateFromStorage());
store.dispatch(loadPendingCartItem());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
