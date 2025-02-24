/**
 * This reducer has the functionality for the all actions on the cart state,
 * Render, api calls and other functionalities are not its responsability
 */
// Define a type for cart items with a constraint of id on T
export interface CartItem<T extends { id: number }> {
  data: T;
  quantity: number
  price: number
}

// Define actions for the reducer
export type ShoppingCartAction<T extends { id: number }> =
  | { type: 'SET_CART'; payload: CartItem<T>[] }
  | { type: 'ADD_TO_CART'; payload: CartItem<T> }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

// Define the state structure
export interface ShoppingCartState<T extends { id: number }> {
  items: CartItem<T>[];
}


// Reducer function to manage state changes
export const shoppingCartReducer = <T extends { id: number },>(
  state: ShoppingCartState<T>,
  action: ShoppingCartAction<T>
): ShoppingCartState<T> => {
  switch (action.type) {
    case 'SET_CART': {
      return { ...state, items: action.payload };
    }
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.data.id === action.payload.data.id
      );
      if (existingItemIndex !== -1) {
        // Update quantity if item already exists
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: updatedItems };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(
        (item) => item.data.id !== action.payload.productId
      );
      return { ...state, items: updatedItems };
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map((item) =>
        item.data.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { ...state, items: updatedItems };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};
