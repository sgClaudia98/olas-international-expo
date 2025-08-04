import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import platformStorage from '@/utils/platformStorage';
import { MarketBookingOption } from '../services/interfaces/booking';

const PENDING_CART_ITEM_KEY = 'pending_cart_item';

export interface PendingCartItem {
  option: MarketBookingOption;
  quantity: number;
}

export interface PendingCartState {
  pendingItem: PendingCartItem | null;
}

const initialState: PendingCartState = {
  pendingItem: null,
};

const pendingCartSlice = createSlice({
  name: 'pendingCart',
  initialState,
  reducers: {
    setPendingCartItem: (state, action: PayloadAction<PendingCartItem | null>) => {
      state.pendingItem = action.payload;
      // Save to storage
      if (action.payload) {
        platformStorage.setItem(PENDING_CART_ITEM_KEY, JSON.stringify(action.payload));
      } else {
        platformStorage.removeItem(PENDING_CART_ITEM_KEY);
      }
    },
    clearPendingCartItem: (state) => {
      state.pendingItem = null;
      platformStorage.removeItem(PENDING_CART_ITEM_KEY);
    },
  },
});

export const { setPendingCartItem, clearPendingCartItem } = pendingCartSlice.actions;
export default pendingCartSlice.reducer;

// Async function to load pending item from storage
export const loadPendingCartItem = () => async (dispatch: any) => {
  try {
    const jsonValue = await platformStorage.getItem(PENDING_CART_ITEM_KEY);
    if (jsonValue) {
      const pendingItem = JSON.parse(jsonValue);
      dispatch(setPendingCartItem(pendingItem));
    }
  } catch (error) {
    console.error('Error loading pending cart item:', error);
  }
};