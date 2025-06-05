import {useState, useEffect, useCallback} from 'react';
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
} from '../services/interfaces/booking';
import {useLocationContext} from '@/contexts/locationContext';
import {Selection, useSearchContext} from '../context/SearchContext';
import {DEFAULT_DESTINATION} from '@/constants';
import {PaginationRequest} from '@/services/interfaces/pagination';

export interface IFilter extends Selection {
  destinationId?: number;
  productName?: string;
}

export interface IAllFilters {
  query?: SearchMarketBookingOptions;
  mutation?: IFilter;
  pagination?: PaginationRequest;
}

interface SearchMarketOptionsResult {
  data?: SearchMarketBookingOptionsResponse;
  totalItems?: number;
  items?: MarketBookingOption[];
  searchId?: number | null;
  stats?: SearchMarketBookingOptionStats;
  loading: boolean;
  updateFilter: (allFilters?: IAllFilters, pagination?: PaginationRequest) => void;
  fetchPage: (req: PaginationRequest) => void;
}

const initFilter: IAllFilters = {
  mutation: {
    destinationId: DEFAULT_DESTINATION,
  },
};

const useSearchMarketOptions = (): SearchMarketOptionsResult => {
  const {activeDestination} = useLocationContext();
  const {selection, productName} = useSearchContext();

  const [searchId, setSearchId] = useState<number | null>(null);
  const [data, setData] = useState<SearchMarketBookingOptionsResponse>();
  const [filter, setFilter] = useState<IAllFilters>(initFilter);
  const [loading, setLoading] = useState(false);
  const [forcePOST, setForcePOST] = useState(false);  

  const [searchMarketOptions] = useSearchMarketOptionsMutation();
  const [triggerQuery, {data: queryData, isFetching}] = useLazyGetSearchMarketOptionsQuery();

  const updateFilter = useCallback(
    (allFilters?: IAllFilters, newPagination?: PaginationRequest) => {
      setFilter(prevFilter => {
        if (!forcePOST) setForcePOST(prevFilter.mutation != allFilters?.mutation);

        return {
          mutation: {
            ...prevFilter?.mutation,
            ...allFilters?.mutation,
          },
          query: {
            ...prevFilter?.query,
            ...allFilters?.query,
          },
          pagination: newPagination || prevFilter?.pagination,
        };
      });
    },
    [activeDestination],
  );

  const handleResponse = (response: SearchMarketBookingOptionsResponse) => {
    setSearchId(response.searchId);
    setData(response);
  };

  useEffect(() => {
    if (queryData) {
      handleResponse(queryData);
    }
  }, [queryData]);

  useEffect(() => {
    if (
      isFetching ||
      (Object.keys(selection).length === 0 && (!productName || productName === ''))
    ) {
      return;
    }
    updateFilter({
      mutation: {
        productName: productName != '' ? productName : undefined,
        ...selection,
      },
    });
  }, [selection, productName]);

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (filter.pagination) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const fetchData = async () => {
        const request: SearchMarketBookingOptionsRequest = {
          destinationId: activeDestination?.id || DEFAULT_DESTINATION,
          ...filter.mutation,
          optionsQuery: {
            ...filter.query,
            ...filter.pagination,
          },
        };
        await fetch(request, forcePOST);
      };
      setTimeoutId(setTimeout(fetchData, 300));
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [filter, updateFilter]);

  const fetch = async (request: SearchMarketBookingOptionsRequest, forceSearch?: boolean) => {
    setLoading(true);
    let response;
    if (searchId && !forceSearch) {
      // If common filters are modified and searchId exists, use the query
      const queryRequest: GetSearchMarketBookingOptionsRequest = {
        ...request.optionsQuery,
        searchId,
      };
      response = triggerQuery(queryRequest).unwrap();
    } else {
      // If complex filters or no searchId, use the mutation
      response = searchMarketOptions(request).unwrap();
    }

    const result = await response;
    handleResponse(result);
    setLoading(false);
    setForcePOST(false);

    return result;
  };

  const fetchPage = async (req: PaginationRequest) => {
    return updateFilter({}, req);
  };

  return {
    data,
    items: data?.options || [],
    stats: data?.stats,
    totalItems: data?.totals,
    searchId,
    loading: loading || isFetching,
    fetchPage,
    updateFilter,
  };
};

export default useSearchMarketOptions;
