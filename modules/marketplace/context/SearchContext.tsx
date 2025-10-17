import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { useGetDepartmentsQuery } from "../services/api/BookingService";
import { Department } from "../services/interfaces/booking";
import { capitalizeWords } from "@/utils/string";
import { useGlobalSearchParams, useRouter, usePathname } from "expo-router";

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

export interface FilterState {
  selection: Selection;
  productName: string;
  priceRange: PriceRange;
}

export interface FilterUpdates {
  selection?: Selection;
  productName?: string;
  priceRange?: PriceRange;
  clearAll?: boolean;
}

interface SearchContextType {
  departments?: Department[] | undefined;
  // Current filter state (derived from URL)
  filters: FilterState;
  // Individual getters (computed from URL)
  selection: Selection;
  productName: string;
  priceRange: PriceRange;
  // Setters (update URL params)
  setProductName: (value: string) => void;
  setSelection: (args: Selection) => void;
  setPriceRange: (range: PriceRange) => void;
  clearProductName: () => void;
  clearAllFilters: () => void;
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

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const { data: departmentsData } = useGetDepartmentsQuery();
  const rawSearchParams = useGlobalSearchParams<SearchParams>();
  const router = useRouter();
  const pathname = usePathname();

  // Clean search params - convert "undefined" strings and empty values to undefined
  const searchParams = useMemo((): SearchParams => {
    const clean = (value: string | undefined): string | undefined => {
      if (!value || value === "" || value === "undefined") {
        return undefined;
      }
      return value;
    };

    return {
      departmentId: clean(rawSearchParams.departmentId),
      categoryId: clean(rawSearchParams.categoryId),
      search: clean(rawSearchParams.search),
      minPrice: clean(rawSearchParams.minPrice),
      maxPrice: clean(rawSearchParams.maxPrice),
    };
  }, [
    rawSearchParams.departmentId,
    rawSearchParams.categoryId,
    rawSearchParams.search,
    rawSearchParams.minPrice,
    rawSearchParams.maxPrice,
  ]);

  // Derive selection from URL params and departments data
  const selection = useMemo((): Selection => {
    const departmentId = searchParams.departmentId ? Number(searchParams.departmentId) : undefined;
    const categoryId = searchParams.categoryId ? Number(searchParams.categoryId) : undefined;

    if (!departmentsData?.departments) {
      return { departmentId, categoryId };
    }

    const department = departmentId
      ? departmentsData.departments.find((dep) => dep.id === departmentId)
      : categoryId
      ? departmentsData.departments.find((dep) =>
          dep.categories.some((cat) => cat.id === categoryId)
        )
      : undefined;

    const category = categoryId
      ? department?.categories.find((cat) => cat.id === categoryId)
      : undefined;

    return {
      departmentId,
      categoryId,
      department: department?.name ? capitalizeWords(department.name) : undefined,
      category: category?.name ? capitalizeWords(category.name) : undefined,
    };
  }, [searchParams.departmentId, searchParams.categoryId, departmentsData]);

  // Derive productName from URL
  const productName = searchParams.search || "";

  // Derive priceRange from URL
  const priceRange = useMemo((): PriceRange => ({
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
  }), [searchParams.minPrice, searchParams.maxPrice]);

  // Combined filters object
  const filters = useMemo((): FilterState => ({
    selection,
    productName,
    priceRange,
  }), [selection, productName, priceRange]);

  // Update URL params helper
  const updateUrlParams = useCallback((params: Record<string, string | undefined>) => {
    // Filter out undefined and empty values
    const filteredParams: Record<string, string> = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        filteredParams[key] = value;
      }
    });

    // Check if we're on the products page
    const isOnProductsPage = pathname.includes('/services/market/products');

    if (isOnProductsPage) {
      // Merge all keys from rawSearchParams and newParams
      const allKeys = new Set([...Object.keys(rawSearchParams), ...Object.keys(filteredParams)]);
      const paramsToSet: Record<string, string | undefined> = {};

      allKeys.forEach(key => {
        const value = filteredParams[key];
        if (value) {
          paramsToSet[key] = value;
        } else if (rawSearchParams[key as keyof SearchParams]) {
          paramsToSet[key] = undefined; // Remove from URL
        }
      });

      router.setParams(paramsToSet as any);
    } else {
      // Navigate to products page with params
      console.log("Navigating to products page with params:", filteredParams);
      router.push({
        pathname: '/(main)/services/market/products',
        params: filteredParams,
      });
    }
  }, [router, pathname]);

  // Batch update filters
  const batchUpdateFilters = useCallback((updates: FilterUpdates) => {
    if (updates.clearAll) {
      updateUrlParams({});
      return;
    }

    const newParams: Record<string, string | undefined> = {
      departmentId: searchParams.departmentId,
      categoryId: searchParams.categoryId,
      search: searchParams.search,
      minPrice: searchParams.minPrice,
      maxPrice: searchParams.maxPrice,
    };

    if (updates.selection !== undefined) {
      newParams.departmentId = updates.selection.departmentId?.toString();
      newParams.categoryId = updates.selection.categoryId?.toString();
      // Clear price range when selection changes
      newParams.minPrice = undefined;
      newParams.maxPrice = undefined;
    }

    if (updates.productName !== undefined) {
      newParams.search = updates.productName || undefined;
    }

    if (updates.priceRange !== undefined) {
      newParams.minPrice = updates.priceRange.minPrice?.toString();
      newParams.maxPrice = updates.priceRange.maxPrice?.toString();
    }

    updateUrlParams(newParams);
  }, [searchParams, updateUrlParams]);

  const setSelection = useCallback((args: Selection) => {
    batchUpdateFilters({ selection: args, priceRange: {} });
  }, [batchUpdateFilters]);

  const setPriceRange = useCallback((range: PriceRange) => {
    batchUpdateFilters({ priceRange: range });
  }, [batchUpdateFilters]);

  const setProductName = useCallback((value: string) => {
    batchUpdateFilters({ productName: value });
  }, [batchUpdateFilters]);

  const clearProductName = useCallback(() => {
    batchUpdateFilters({ productName: "" });
  }, [batchUpdateFilters]);

  const clearAllFilters = useCallback(() => {
    batchUpdateFilters({ clearAll: true });
  }, [batchUpdateFilters]);

  const value: SearchContextType = {
    departments: departmentsData?.departments,
    filters,
    selection,
    productName,
    priceRange,
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
