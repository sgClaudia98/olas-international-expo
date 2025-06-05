/**
 * This reducer has the functionality for the all actions on the cart state,
 * Render, api calls and other functionalities are not its responsability
 */
// Define a type for cart items with a constraint of id on T
export interface CartItem<T> {
  data: T;
  quantity: number;
  price: number;
  id: number;
}

// Define actions for the reducer
export type ShoppingCartAction<T> =
  | { type: "SET_CART"; payload: CartItem<T>[] }
  | { type: "ADD_TO_CART"; payload: CartItem<T> }
  | { type: "REMOVE_FROM_CART"; payload: { productId: number } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: number; quantity: number };
    }
  | { type: "CLEAR_CART" };

// Define the state structure
export interface ShoppingCartState<T> {
  items: CartItem<T>[];
}

// Reducer function to manage state changes
export const shoppingCartReducer = <T extends { id: number }>(
  state: ShoppingCartState<T>,
  action: ShoppingCartAction<T>
): ShoppingCartState<T> => {
  switch (action.type) {
    case "SET_CART": {
      return { ...state, items: action.payload };
    }
    case "ADD_TO_CART": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        // Update quantity if item already exists
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: updatedItems };
      }
      console.debug("REDUCER!Adding to cart:", action.payload, state.items, {
        ...state,
        items: [...state.items, action.payload],
      });
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case "REMOVE_FROM_CART": {
      console.debug(
        "REDUCER!Removing from cart:",
        action.payload.productId,
        state.items
      );
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.productId
      );
      console.debug("REDUCER!Updated items after removal:", updatedItems);
      return { ...state, items: updatedItems };
    }
    case "UPDATE_QUANTITY": {
      console.debug("REDUCER!Update to cart:", action.payload, state.items);
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { ...state, items: updatedItems };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};
