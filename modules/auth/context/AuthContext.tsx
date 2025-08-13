// AuthProvider.tsx
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { User, logout } from "../slices/authSlice";
import {
  initializeAuthThunk,
  loginThunk,
  fetchUserProfileThunk,
} from "../slices/authThunks";
import { IAuthRequest } from "../services/interfaces/account";
import { useRouter, useSegments } from "expo-router";
import { red } from "@/styles/colors";
import { set } from "lodash";

// Definir el tipo del contexto
interface AuthContextType {
  // Estado
  user: User | undefined;
  token: string | undefined;
  isAuthenticated: boolean;
  isInitialized: boolean;

  // Métodos
  login: (credentials: IAuthRequest) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props del provider
interface AuthProviderProps {
  children: ReactNode;
  fallback?: ReactNode; // Opcional: componente de loading mientras inicializa
}


// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  fallback = <div>Inicializando...</div>,
}) => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const { user, token } = authState;

  // Inicializar auth al montar el componente
  useEffect(() => {
    const initialize = async () => {
      try {
        await dispatch(initializeAuthThunk()).unwrap();
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing auth:", error);
      }
    };
    initialize();
  }, [dispatch]);

  // Computed values
  const isAuthenticated = !!(token && user);

  // Métodos del contexto
  const login = async (credentials: IAuthRequest) => {
    try {
      await dispatch(loginThunk(credentials)).unwrap();
    } catch (error) {
      // El error ya se maneja en el slice, solo re-throw si necesitas manejarlo en el componente
      throw error;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const refreshProfile = async () => {
    try {
      await dispatch(fetchUserProfileThunk()).unwrap();
    } catch (error) {
      throw error;
    }
  };
  const router = useRouter();
  const segments = useSegments();

  const pathname = "/" + segments.join("/");

  // Valor del contexto
  const contextValue: AuthContextType = {
    // Estado
    user,
    token,
    isAuthenticated,
    isInitialized,
    // Métodos
    login,
    logout: handleLogout,
    refreshProfile
  };

  // Mostrar fallback mientras no esté inicializado
  if (!isInitialized) {
    return <>{fallback}</>;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  return context;
};

// Hook adicional para verificar autenticación (más semántico)
export const useRequireAuth = (): AuthContextType => {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    throw new Error("Esta función requiere autenticación");
  }

  return auth;
};
