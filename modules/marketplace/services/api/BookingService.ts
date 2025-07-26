import {BaseQueryApi, createApi, FetchArgs} from '@reduxjs/toolkit/query/react';

import {baseQueryWithReauth} from '@/services/api/apiService';
import {
  DepartmentsResponse,
  GetSearchMarketBookingOptionsRequest,
  MarketBookingCartItemRequest,
  MarketBookingCartResponse,
  MarketProductBookingCartItemRequest,
  ProductCategoriesResponse,
  ProductResponse,
  RemoveMarketBookingCartItemRequest,
  SearchAgencyClientBookingResponse,
  SearchAgencyClientMarketBookingRequest,
  SearchMarketBookingOptionsRequest,
  SearchMarketBookingOptionsResponse,
  UpdateMarketBookingCartRequest,
} from '../interfaces/booking';
import {DEFAULT_DESTINATION, BASE_URL} from '@/constants';
import { AgencyClientBookingPreviewResponse, AgencyClientBookingResponse, CreateMarketBookingRequest } from '../../services/interfaces/bookingDetail';

// Define the necessary TypeScript interfaces
export const bookingService = createApi({
  reducerPath: 'booking',
  tagTypes: ['Booking', 'BookingCart'],
  baseQuery: (args: string | FetchArgs, api: BaseQueryApi, extraOptions) => {
    const baseUrl = BASE_URL + '/api/v1/bookings';
    return baseQueryWithReauth(args, api, extraOptions, baseUrl);
  },
  endpoints: builder => ({
    searchMarketOptions: builder.mutation<
      SearchMarketBookingOptionsResponse,
      SearchMarketBookingOptionsRequest
    >({
      query: ({destinationId = DEFAULT_DESTINATION, ...body}) => ({
        url: `/market/search-options`,
        method: 'POST',
        body: {
          destinationId,
          ...body,
        },
      }),
    }),

    getSearchMarketOptions: builder.query<
      SearchMarketBookingOptionsResponse,
      GetSearchMarketBookingOptionsRequest
    >({
      query: ({searchId, ...params}) => ({
        url: `/market/search-options/${searchId}`,
        method: 'GET',
        params,
      }),
    }),

    getCategories: builder.query<ProductCategoriesResponse, {DepartmentId?: number}>({
      query: params => ({
        url: `/market/categories`,
        method: 'GET',
        params,
      }),
    }),

    getDepartments: builder.query<DepartmentsResponse, void>({
      query: () => ({
        url: `/market/departments`,
        method: 'GET',
      }),
    }),

    getProducts: builder.query<ProductResponse, {productId: number; destinationId?: number}>({
      query: ({productId, destinationId = DEFAULT_DESTINATION}) => ({
        url: `/market/products/${productId}`,
        method: 'GET',
        params: {
          destinationId,
        },
      }),
    }),

    getCart: builder.query<MarketBookingCartResponse, void>({
      query: () => ({
        url: `/market/booking-cart`,
        method: 'GET',
      }),
    }),

    addToCart: builder.mutation<MarketBookingCartResponse, MarketBookingCartItemRequest>({
      query: body => ({
        url: `/market/booking-cart`,
        method: 'POST',
        body,
      }),
    }),

    updateCartItem: builder.mutation<
      MarketBookingCartResponse,
      {item: MarketProductBookingCartItemRequest; destinationId: number}
    >({
      query: ({item, destinationId}) => ({
        url: `/market/booking-cart`,
        method: 'PUT',
        body: {destinationId, items: [item]} as UpdateMarketBookingCartRequest,
      }),
    }),

    updateCartItems: builder.mutation<MarketBookingCartResponse, UpdateMarketBookingCartRequest>({
      query: body => ({
        url: `/market/booking-cart`,
        method: 'PUT',
        body,
      }),
    }),

    removeFromCart: builder.mutation<any, RemoveMarketBookingCartItemRequest>({
      query: body => ({
        url: `/market/booking-cart`,
        method: 'DELETE',
        body,
      }),
    }),

    previewMarketBooking: builder.mutation<AgencyClientBookingPreviewResponse, CreateMarketBookingRequest>({
      query: (body) => ({
        url: `/market/pre-booking`,
        method: 'POST',
        body,
      }),
    }), 
    createMarketBooking: builder.mutation<AgencyClientBookingResponse, CreateMarketBookingRequest>({
      query: (body) => ({
        url: `/market/booking`,
        method: 'POST',
        body,
      }),
    }),
    payBooking: builder.mutation<any, any>({
      query: (body) => ({
        url: `/pay-booking`,
        method: 'POST',
        body,
      }),
    }),
    
    
    getBookingById: builder.query<AgencyClientBookingResponse, number>({
      query: (id) => ({
        url: `/booking/${id}`,
        method: 'GET',
      }),
    }),
    
    searchMarketBookings: builder.mutation<SearchAgencyClientBookingResponse, SearchAgencyClientMarketBookingRequest>({
      query: (body) => ({
        url: `/market/booking/search`, // Endpoint de la API
        method: 'POST',
        body: { ...body, preview: false }, // El cuerpo de la solicitud
      }),
    }),
  }),
});

export const {
  useSearchMarketOptionsMutation,
  useGetSearchMarketOptionsQuery,
  useLazyGetSearchMarketOptionsQuery,
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetDepartmentsQuery,
  useLazyGetDepartmentsQuery,
  useGetProductsQuery,
  useGetCartQuery,
  useLazyGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useCreateMarketBookingMutation,
  usePreviewMarketBookingMutation,
  useGetBookingByIdQuery,
  useSearchMarketBookingsMutation,
  usePayBookingMutation
} = bookingService;

export const bookingEndpoints = bookingService.endpoints;
