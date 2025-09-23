import { useState, useEffect, useCallback } from 'react';
import {
  useSearchMarketOptionsMutation,
  useLazyGetSearchMarketOptionsQuery,
} from '../services/api/BookingService';
import {
  SearchMarketBookingOptionsRequest,
  GetSearchMarketBookingOptionsRequest,
  SearchMarketBookingOptionsResponse,
  SearchMarketBookingOptions,
  SearchMarketBookingOptionStats,
  MarketBookingOption,
  Department,
} from '../services/interfaces/booking';
import { useLocationContext } from '@/contexts/locationContext';
import { Selection, PriceRange, useSearchContext } from '../context/SearchContext';
import { DEFAULT_DESTINATION } from '@/constants';
import { PaginationRequest } from '@/services/interfaces/pagination';

export interface IFilter extends Selection {
  destinationId?: number;
  productName?: string;
}

export interface IAllFilters {
  query?: SearchMarketBookingOptions;
  mutation?: IFilter;
  pagination?: PaginationRequest;
}

export interface SearchMarketOptionsResult {
  data?: SearchMarketBookingOptionsResponse;
  totalItems?: number;
  items?: MarketBookingOption[];
  searchId?: number | null;
  stats?: SearchMarketBookingOptionStats;
  loading: boolean;
  changePage: (pagination: PaginationRequest) => void;
  fetchPage: (req: PaginationRequest) => void;
}

const initFilter: IAllFilters = {
  mutation: {
    destinationId: DEFAULT_DESTINATION,
  },
  pagination: {
    limit: 20,
    offset: 0,
  },
};

const useSearchMarketOptions = (): SearchMarketOptionsResult => {
  const { activeDestination } = useLocationContext();
  const {
    filters,
  } = useSearchContext();

  const [searchId, setSearchId] = useState<number | null>(null);
  const [data, setData] = useState<SearchMarketBookingOptionsResponse>();
  const [pagination, setPagination] = useState<PaginationRequest>(initFilter.pagination!);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  const [searchMarketOptions, { isLoading: isMutationLoading }] = useSearchMarketOptionsMutation();
  const [triggerQuery, { data: queryData, isFetching: isQueryLoading }] = useLazyGetSearchMarketOptionsQuery();

  const changePage = useCallback(
    (newPagination: PaginationRequest) => {
      setPagination(newPagination);
    },
    [],
  );

  const handleResponse = (response: SearchMarketBookingOptionsResponse) => {
    setSearchId(response.searchId);
    setData(response);
  };

  // Build filter from context
  const buildFilterFromContext = useCallback((): IAllFilters => {
    return {
      mutation: {
        destinationId: activeDestination?.id || DEFAULT_DESTINATION,
        productName: filters.productName || undefined,
        departmentId: filters.selection.departmentId,
        categoryId: filters.selection.categoryId,
        department: filters.selection.department,
        category: filters.selection.category,
      },
      query: {
        minPrice: filters.priceRange.minPrice,
        maxPrice: filters.priceRange.maxPrice,
      },
      pagination,
    };
  }, [filters, activeDestination, pagination]);

  useEffect(() => {
    if (queryData) {
      handleResponse(queryData);
    }
  }, [queryData]);

  // This effect is no longer needed since we're using filters directly from context
  // The main effect below will handle all updates

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Track previous mutation values to detect changes
  const [prevMutation, setPrevMutation] = useState<IFilter>(initFilter.mutation || {});

  useEffect(() => {
    if (!isMutationLoading && !isQueryLoading) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(async () => {
        const currentFilter = buildFilterFromContext();
        const request: SearchMarketBookingOptionsRequest = {
          destinationId: activeDestination?.id || DEFAULT_DESTINATION,
          ...currentFilter.mutation,
          optionsQuery: {
            ...currentFilter.query,
            ...currentFilter.pagination,
          },
        };

        // Determine if we should use mutation (POST)
        const mutationChanged =
          prevMutation.destinationId !== currentFilter.mutation?.destinationId ||
          prevMutation.productName !== currentFilter.mutation?.productName ||
          prevMutation.categoryId !== currentFilter.mutation?.categoryId ||
          prevMutation.departmentId !== currentFilter.mutation?.departmentId;

        const shouldUseMutation = isInitialLoad || mutationChanged || !searchId;
        
        // Update previous mutation for next comparison
        if (mutationChanged) {
          setPrevMutation(currentFilter.mutation || {});
        }

        await fetch(request, shouldUseMutation);

        // Mark as initialized after first successful fetch
        if (isInitialLoad) {
          setHasInitialized(true);
        }
      }, isInitialLoad ? 0 : 300); // No delay for initial load

      setTimeoutId(newTimeoutId);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [filters, activeDestination, pagination, isInitialLoad, buildFilterFromContext]);

  const fetch = async (request: SearchMarketBookingOptionsRequest, shouldUseMutation: boolean) => {
    // Don't start a new request if one is already in progress
    if (isMutationLoading || isQueryLoading) {
      return;
    }

    try {
      let response: Promise<SearchMarketBookingOptionsResponse>;

      // Use mutation (POST) for:
      // 1. Initial load
      // 2. When mutation filters change (destinationId, productName, categoryId, departmentId)
      // 3. When no searchId exists yet
      if (shouldUseMutation || !searchId) {
        response = searchMarketOptions(request).unwrap();
        if (isInitialLoad) setIsInitialLoad(false);
      } else {
        // Use query (GET) for filter changes (price)
        const queryRequest: GetSearchMarketBookingOptionsRequest = {
          ...request.optionsQuery,
          searchId,
        };
        response = triggerQuery(queryRequest).unwrap();
      }

      const result = await response;
      handleResponse(result);
      return result;
    } catch (error) {
      console.error('Error fetching market options:', error);
      // Re-throw to let the caller handle if needed
      throw error;
    }
  };

  const fetchPage = async (req: PaginationRequest) => {
    return changePage(req);
  };

  // Note: Filter state mutations should be done through SearchContext directly
  // This hook only handles API calls based on filter changes

  return {
    data,
    items: data?.options || [],
    stats: data?.stats,
    totalItems: data?.totals,
    searchId,
    loading: isQueryLoading || isMutationLoading,
    fetchPage,
    changePage,
  };
};

export default useSearchMarketOptions;
