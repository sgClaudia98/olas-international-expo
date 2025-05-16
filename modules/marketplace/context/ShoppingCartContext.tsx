import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useState,
  useEffect,
} from "react";
import {
  ShoppingCartAction,
  ShoppingCartState,
  shoppingCartReducer,
} from "../reducers/ShoppingCartReducer";
import CartOverlay from "../components/cart/CartOverlay";
import { CartItem } from "../reducers/ShoppingCartReducer";
import PaymentOverlay from "../components/cart/PaymentOverlay";

// Define the actions interface
interface CartActions<T extends { id: number }, K extends T> {
  addToCart: (product: K, quantity: number, price: number) => Promise<any>;
  removeFromCart: (productId: number) => Promise<any>;
  updateQuantity: (
    productId: number,
    quantity: number,
    modalities?: any
  ) => Promise<any>;
  renderItem: (item: CartItem<T>, index: number) => React.JSX.Element;
  refreshCart: () => Promise<any>;
  data: CartItem<T>[];
}

// Definir el tipo de contexto
interface ShoppingCartContextProps<T extends { id: number }, K extends T> {
  state: ShoppingCartState<T>;
  cartVisible: boolean;
  setCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (product: K, quantity: number, price: number) => void;
  removeFromCart: (productId: number, modalities?: any) => void;
  updateQuantity: (
    productId: number,
    quantity: number,
    modalities?: any
  ) => void;
  refreshCart: () => void;
}

// Crear el contexto
const ShoppingCartContext = createContext<
  ShoppingCartContextProps<any, any> | undefined
>(undefined);

// Provider del contexto
export const ShoppingCartProvider = <T extends { id: number }, K extends T>({
  children,
  actions,
  renderPaymentForm,
}: {
  children: ReactNode;
  actions: CartActions<T, K>;
  renderPaymentForm: (onClose:  () => void) => React.JSX.Element;
}) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, { items: [] });
  const [cartVisible, setCartVisible] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Sincronizar con la API si hay sesión
  useEffect(() => {
    if (actions.data && actions.data.length > 0) {
      dispatch({ type: "SET_CART", payload: actions.data });
    }
  }, [actions.data]);

  const addToCart = async (product: K, quantity: number, price: number) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { data: product, quantity, price },
    });
    actions.addToCart(product, quantity, price).catch((error) => {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: { productId: product.id },
      });
      console.error("Error al agregar al carrito:", error);
    });
  };

  const updateQuantity = async (
    productId: number,
    quantity: number,
    modalities?: any
  ) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
    actions
      .updateQuantity(productId, quantity, modalities)
      .catch((error) => console.error("Error al actualizar cantidad:", error));
  };

  const removeFromCart = async (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
    actions
      .removeFromCart(productId)
      .catch((error) => console.error("Error al eliminar del carrito:", error));
  };

  const refreshCart = async () => {
    actions
      .refreshCart()
  }

  const totalPrice = state.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );



  return (
    <ShoppingCartContext.Provider
      value={{
        cartVisible,
        state,
        setCartVisible,
        addToCart,
        removeFromCart,
        updateQuantity,
        refreshCart,
      }}
    >
      {children}
      <CartOverlay
        visible={cartVisible}
        closeCart={() => setCartVisible(false)}
        cartItems={actions.data}
        totalAmount={totalPrice}
        renderItem={actions.renderItem}
        openPaymentForm={() => setShowPaymentModal(true)}
      />
      <PaymentOverlay
        visible={showPaymentModal}
        setPaymentFormVisible={setShowPaymentModal}
        renderForm={renderPaymentForm}
      />
    </ShoppingCartContext.Provider>
  );
};

// Custom hook para usar el contexto de ShoppingCart
export const useShoppingCart = <T extends { id: number }, K extends T>() => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context as ShoppingCartContextProps<T, K>;
};
