import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useGetDepartmentsQuery } from "../services/api/BookingService";
import { Department } from "../services/interfaces/booking";

export interface Selection {
  departmentId?: number;
  department?: string;
  categoryId?: number;
  category?: string;
}

interface SearchContextType {
  data?: Department[] | undefined;
  selection: Selection;
  productName: string;
  setProductName?: (value: string) => void;
  setSelection: (args: Partial<Selection>) => void;
  setSelectionIds: (args: Partial<Omit<Selection, "department" | "category">>) => void;
  clearProductName: () => void;
}

// Crear el contexto con un valor inicial opcional
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Props del proveedor
interface SearchProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  // Obtener la data desde el hook
  const { data } = useGetDepartmentsQuery();

  // Estado para guardar la selección
  const [selection, setSelectionState] = useState<Selection>({});
  const [productName, setProductName] = useState<string>("");

  const clearProductName = () => {
    setProductName("");
  };

  // Función para actualizar la selección
  const setSelection = (args: Partial<Selection>) => {
    setSelectionState((prev) => ({
      ...prev,
      ...args,
    }));
  };

  // Expnsive calculation using useCallback
  const setSelectionIds = useCallback(
    (args: Partial<Omit<Selection, "department" | "category">>) => {
      console.debug("SETTING SELECTION IDS")
      const department = args.departmentId
        ? data?.departments.find((dep) => dep.id === args.departmentId)
        : args.categoryId
        ? data?.departments.find((dep) =>
            dep.categories.some((cat) => cat.id === args.categoryId)
          )
        : undefined;

      // Buscar la categoría dentro del departamento almacenado
      const category = args.categoryId
        ? department?.categories.find((cat) => cat.id === args.categoryId)?.name
        : undefined;

      const sel: Selection = {
        ...args,
        department: department?.name, // Almacena el departamento completo
        category,
      };
      setSelection(sel);
    },
    [data]
  );

  // Valores que el contexto expone
  const value: SearchContextType = {
    data: data?.departments,
    selection,
    productName,
    setSelection,
    setSelectionIds,
    setProductName,
    clearProductName,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

// Hook para usar el contexto
export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext debe ser usado dentro de un SearchProvider"
    );
  }
  return context;
};
