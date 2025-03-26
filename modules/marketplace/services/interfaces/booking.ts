import {IError} from '@/services/interfaces/error';
import {PaginationRequest, PaginationResponse} from '@/services/interfaces/pagination';
import { AgencyClientBooking, EBookingStatus } from './bookingDetail';

export interface Currency {
  id: number;
  code?: string | null;
  name?: string | null;
  symbol?: string | null;
}

export type EBookingSearchStatus = 'Initial' | 'InProgress' | 'Fail' | 'Success';

export type EBookingType = 'Undefined' | 'Car' | 'Market';

export type ESortByProperty = 'Price';

export type ESortMode = 'Asc' | 'Desc';

export type ESortByBookingProperty = "BookingDate";

export interface MarketBookingOption {
  type: EBookingType;
  destinationId: number;
  product: Product;
  maxQuantity?: number | null;
  id: number;
  searchId: number;
  price: number;
  basePrice: number;
  bookingFee: number;
  discount: number;
  description?: string | null;
  saleCurrency?: Currency;
  thirdPartyPriority: number;
  needRecalcPrice: boolean;
}

export interface ProductResponse {
  option: MarketBookingOption
}

export interface Product {
  id: number;
  code?: string | null;
  name?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  category: ProductCategory;
  imageId?: number | null;
  price?: number | null;
  bookingFee?: number | null;
  stockControl?: boolean | null;
  stock?: number | null;
  minStockAlert?: number | null;
  modalities?: ProductModality[] | null;
}

export interface ProductCategoriesResponse {
  categories?: ProductCategory[] | null;
  success: boolean;
  error: IError;
}

export interface ProductCategory {
  id: number;
  code?: string | null;
  name?: string | null;
  description?: string | null;
}

export interface ProductModality {
  id: number;
  name?: string | null;
  values?: ProductModalityValue[] | null;
}

export interface ProductModalityValue {
  id: number;
  value?: string | null;
  isDefault: boolean;
}
//
export interface SearchMarketBookingOptionSortBy {
  property: ESortByProperty;
  ascending?: boolean | null;
}
//
export interface SearchMarketBookingOptionStats {
  minPrice: number;
  maxPrice: number;
  isNewArrival: number;
  isInOffer: number;
  brands?: Record<string, number> | null;
}

export interface SearchMarketBookingOptions {
  isNewArrival?: boolean | null;
  isInOffer?: boolean | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  brands?: string[] | null;
  sortBy?: string;
  sortMode?: ESortMode;
}


export interface SearchAgencyClientMarketBookingRequest {
  offset?: number | null;
  limit?: number | null;
  fromBookingDate?: string | null; // Date-time string (ISO 8601 format)
  endBookingDate?: string | null; // Date-time string (ISO 8601 format)
  status?: EBookingStatus;
  reference?: string | null;
  id?: number | null;
  sortBy?: ESortByBookingProperty;
  sortMode?: ESortMode;
}

interface ValSearchAgencyClientBooking extends PaginationResponse{
  bookings: AgencyClientBooking[];
}

export interface SearchAgencyClientBookingResponse {
  value: ValSearchAgencyClientBooking;
  success: boolean;
  error?: IError;
}


export interface GetSearchMarketBookingOptionsRequest
  extends SearchMarketBookingOptions,
    PaginationRequest {
  searchId: number;
}

//
export interface SearchMarketBookingOptionsRequest {
  destinationId: number;
  departmentId?: number;
  categoryId?: number;
  productName?: string;
  optionsQuery: SearchMarketBookingOptions & PaginationRequest;
  saleCurrencyId?: number;
}
//
export interface SearchMarketBookingOptionsResponse extends PaginationResponse {
  stats: SearchMarketBookingOptionStats;
  options?: MarketBookingOption[];
  searchId: number;
  status: EBookingSearchStatus;
  success: boolean;
  error: IError;
}

export interface BannerView {
  position: number;
  mediaId: number;
}

export interface BannerAction {
  name: string;
  parameters: Record<string, any>;
}

export interface Banner {
  id: number;
  views: BannerView[];
  action: BannerAction;
}

export interface Department {
  id: number;
  code: string;
  name: string;
  description: string;
  position: number;
  banners: Banner[];
  categories: ProductCategory[];
}

export interface DepartmentsResponse {
  departments?: Department[];
  success: boolean;
  error: IError;
}

export type Modalities = {
  [key: string]: number;
}

// Ítem dentro del carrito de compras
export interface MarketBookingCartItem {
  id: number;
  product: Product;
  maxQuantity?: number | null;
  quantity: number;
  price: number;
  basePrice: number;
  bookingFee: number;
  discount: number;
  saleCurrency?: Currency // missing but should be there
}

// Carrito de compras completo
export interface MarketBookingCart {
  destinationId: number;
  price: number;
  items?: MarketBookingCartItem[];
}

// Request para agregar un producto al carrito
export interface MarketBookingCartItemRequest {
  searchId: number;
  optionId: number;
  quantity: number;
  modalities?: Modalities; // Modalidades opcionales
}

// Respuesta al obtener el carrito
export interface MarketBookingCartResponse {
  bookingCart: MarketBookingCart;
  success: boolean;
  error?: IError;
}

// Request para eliminar un producto del carrito
export interface RemoveMarketBookingCartItemRequest {
  productId?: number | null;
  modalities?: Modalities;
}

// Request para actualizar el carrito de compras
export interface UpdateMarketBookingCartRequest {
  destinationId?: number | null;
  items?: MarketProductBookingCartItemRequest[] | null;
}

// Producto dentro de la actualización del carrito
export interface MarketProductBookingCartItemRequest {
  productId: number;
  quantity: number;
  modalities?: Modalities;
}