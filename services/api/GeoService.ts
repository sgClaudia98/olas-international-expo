import { BaseQueryApi, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './apiService';

import { 
    CountriesResponse, 
    CountryResponse, 
    DestinationsResponse,
  } from '../interfaces/geo';
import { EBookingType } from '@/modules/marketplace/services/interfaces/booking';
import { BASE_URL } from '@/constants';
  

export const geoService = createApi({
  reducerPath: 'geo',
  tagTypes: ['geo'],
  baseQuery: (args: string | FetchArgs, api: BaseQueryApi, extraOptions) => {
    const baseUrl = BASE_URL + '/api/v1/geo';
    return baseQueryWithReauth(args, api, extraOptions, baseUrl);
  },
  endpoints: (builder) => ({
    // Get list of all countries
    getCountries: builder.query<CountriesResponse, void>({
      query: () => ({
        url: `/countries`,
        method: 'GET',
      }),
    }),
    // Get details of a specific country by ID
    getCountryById: builder.query<CountryResponse, number>({
      query: (countryId) => ({
        url: `/countries/${countryId}`,
        method: 'GET',
      }),
    }),
    // Get details of a specific country by code
    getCountryByCode: builder.query<CountryResponse, string>({
      query: (countryCode) => ({
        url: `/countries/code-${countryCode}`,
        method: 'GET',
      }),
    }),
    // Get destinations based on optional query parameters
    getDestinations: builder.query<DestinationsResponse, { 
      CountryId?: number; 
      BookingType?: EBookingType; 
      ParentDestinationId?: number; 
    }>({
      query: ({ CountryId, BookingType, ParentDestinationId }) => ({
        url: `/destinations`,
        method: 'GET',
        params: { CountryId, BookingType, ParentDestinationId },
      }),
    }),
    // Get details of a specific destination by ID
    getDestinationById: builder.query<DestinationsResponse, number>({
      query: (destinationId) => ({
        url: `/destinations/${destinationId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetCountryByIdQuery,
  useGetCountryByCodeQuery,
  useGetDestinationsQuery,
  useGetDestinationByIdQuery,
} = geoService;

export const geoEndpoints = geoService.endpoints;
