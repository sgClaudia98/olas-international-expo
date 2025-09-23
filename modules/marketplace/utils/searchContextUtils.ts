import { Platform } from 'react-native';
import { Selection, PriceRange } from '../context/SearchContext';

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

// Update URL without navigation
export const updateUrlParams = (updates: Record<string, string | undefined>) => {
  if (Platform.OS === 'web') {
    const currentParams = new URLSearchParams(window.location.search);
    
    // Merge updates
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        currentParams.delete(key);
      } else {
        currentParams.set(key, value);
      }
    });

    // Build query string
    const queryString = currentParams.toString();

    // Update URL using History API to avoid page reload
    const newUrl = queryString 
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;
    
    window.history.replaceState({}, '', newUrl);
  }
};

// Build URL params from filter state
export const buildUrlParamsFromFilters = (filters: FilterState): Record<string, string | undefined> => {
  return {
    search: filters.productName || undefined,
    departmentId: filters.selection.departmentId?.toString(),
    categoryId: filters.selection.categoryId?.toString(),
    minPrice: filters.priceRange.minPrice?.toString(),
    maxPrice: filters.priceRange.maxPrice?.toString(),
  };
};

// Apply batch updates to filters
export const applyFilterUpdates = (
  currentFilters: FilterState,
  updates: FilterUpdates
): FilterState => {
  if (updates.clearAll) {
    return {
      selection: {},
      productName: '',
      priceRange: {},
    };
  }

  return {
    selection: updates.selection !== undefined 
      ? { ...currentFilters.selection, ...updates.selection }
      : currentFilters.selection,
    productName: updates.productName !== undefined 
      ? updates.productName 
      : currentFilters.productName,
    priceRange: updates.priceRange !== undefined 
      ? updates.priceRange 
      : currentFilters.priceRange,
  };
};

// Check if filters have meaningful values
export const hasActiveFilters = (filters: FilterState): boolean => {
  return !!(
    Object.keys(filters.selection).length > 0 ||
    filters.productName ||
    filters.priceRange.minPrice !== undefined ||
    filters.priceRange.maxPrice !== undefined
  );
};