import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { useGetDepartmentsQuery } from "../services/api/BookingService";
import { Department } from "../services/interfaces/booking";
import { capitalizeWords } from "@/utils/string";
import { useGlobalSearchParams } from "expo-router";
import { Platform } from "react-native";
import { 
  FilterState, 
  FilterUpdates, 
  updateUrlParams as updateUrlParamsUtil,
  buildUrlParamsFromFilters,
  applyFilterUpdates,
  hasActiveFilters 
} from "../utils/searchContextUtils";

export interface Selection {
  departmentId?: number;
  department?: string;
  categoryId?: number;
  category?: string;
}

export interface PriceRange {
  minPrice?: number;
  maxPrice?: number;
}

interface SearchContextType {
  departments?: Department[] | undefined;
  // Current filter state
  filters: FilterState;
  // Individual setters (kept for backward compatibility)
  selection: Selection;
  productName: string;
  priceRange: PriceRange;
  setProductName?: (value: string) => void;
  setSelection: (args: Selection) => void;
  setPriceRange: (range: PriceRange) => void;
  clearProductName: () => void;
  clearAllFilters: () => void;
  // New batch update method
  batchUpdateFilters: (updates: FilterUpdates) => void;
}

// Crear el contexto con un valor inicial opcional
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Posible Search Params
type SearchParams = {
  categoryId?: string;
  departmentId?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
};

// Props del proveedor
interface SearchProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  // Obtener la data desde el hook
  const { data: departmentsData } = useGetDepartmentsQuery();
  const searchParams = useGlobalSearchParams<SearchParams>();

  // Single filter state object
  const [filters, setFilters] = useState<FilterState>({
    selection: {},
    productName: "",
    priceRange: {},
  });

  // Initialize from URL params
  useEffect(() => {
    const initialFilters: FilterUpdates = {};
    
    if (searchParams.search) {
      initialFilters.productName = searchParams.search;
    }
    
    if (searchParams.minPrice || searchParams.maxPrice) {
      initialFilters.priceRange = {
        minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
        maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
      };
    }
    
    if (Object.keys(initialFilters).length > 0) {
      setFilters(prev => applyFilterUpdates(prev, initialFilters));
    }
  }, []);

  // Batch update filters
  const batchUpdateFilters = useCallback((updates: FilterUpdates) => {
    setFilters(prev => {
      const newFilters = applyFilterUpdates(prev, updates);
      // Update URL with new filter state
      const urlParams = buildUrlParamsFromFilters(newFilters);
      updateUrlParamsUtil(urlParams);
      
      return newFilters;
    });
  }, []);

  const clearProductName = () => {
    batchUpdateFilters({ productName: "" });
  };

  // Función para actualizar la selección
  const setSelection = (args: Selection) => {
    batchUpdateFilters({ selection: args, priceRange: {} });
  };

  const setPriceRange = (range: PriceRange) => {
    batchUpdateFilters({ priceRange: range });
  };
  
  const setProductName = (value: string) => {
    batchUpdateFilters({ productName: value });
  };


  const clearAllFilters = () => {
    batchUpdateFilters({ clearAll: true });
  };

  useEffect(() => {
    if (departmentsData && (searchParams.departmentId || searchParams.categoryId))
      setSelectionIds({
        departmentId: searchParams.departmentId ? +searchParams.departmentId : undefined,
        categoryId: searchParams.categoryId ? +searchParams.categoryId : undefined,
      });
  }, [departmentsData, searchParams.departmentId, searchParams.categoryId]);

  // Expnsive calculation using useCallback
  const setSelectionIds = (
    args: Partial<Omit<Selection, "department" | "category">>
  ) => {
    const department = args.departmentId && departmentsData?.departments
      ? departmentsData.departments.find((dep) => dep.id === args.departmentId)
      : args.categoryId && departmentsData?.departments
      ? departmentsData.departments.find((dep) =>
          dep.categories.some((cat) => cat.id === args.categoryId)
        )
      : undefined;

    // Buscar la categoría dentro del departamento almacenado
    const category = args.categoryId
      ? department?.categories.find((cat) => cat.id === args.categoryId)?.name
      : undefined;

    const sel: Selection = {
      ...args,
      department: department?.name ? capitalizeWords(department.name) : undefined,
      category: category ? capitalizeWords(category) : undefined,
    };
    setSelection(sel);
  };

  // Valores que el contexto expone
  const value: SearchContextType = {
    departments: departmentsData?.departments,
    filters,
    // Individual values for backward compatibility
    selection: filters.selection,
    productName: filters.productName,
    priceRange: filters.priceRange,
    setSelection,
    setProductName,
    setPriceRange,
    clearProductName,
    clearAllFilters,
    batchUpdateFilters,
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
