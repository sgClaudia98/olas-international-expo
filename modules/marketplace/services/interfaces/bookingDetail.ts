import {IError} from '@/services/interfaces/error';
import {Currency, EBookingType, ESortMode, Product} from './booking';
export type EBookingStatus =
  | 'Requested'
  | 'Processing'
  | 'Denied'
  | 'Confirmed'
  | 'Modified'
  | 'Cancelled'
  | 'Penalties'
  | 'Delivered';
export type EMarketBookingDetailStatus =
  | 'Requested'
  | 'Processing'
  | 'Denied'
  | 'Confirmed'
  | 'Modified'
  | 'Cancelled'
  | 'Penalties'
  | 'Delivered';


export interface BookingDetail {
  bookingType: EBookingType;
  id: number;
  reference?: string | null;
  bookingDate: string;
  status: EBookingStatus;
  invoiceId?: number | null;
  note?: string | null;
  price: number;
  discount: number;
  basePrice: number;
  bookingFee: number;
  policiesId?: number | null;
}

export interface CarBookingDetail extends BookingDetail {
  pickupDateTime: string;
  dropoffDateTime: string;
  rentDays: number;
  company: Company;
  pickupLocation: CarRentalLocation;
  dropoffLocation: CarRentalLocation;
  insurance: boolean;
  flightNumber?: string | null;
  needDriverPassport?: boolean | null;
  needDriverNationality?: boolean | null;
  fuelPriceSupplement?: number | null;
  airportPickupPriceSupplement?: number | null;
}

export interface MarketBookingDetail extends BookingDetail {
  beneficiary: AgencyClient;
  destination: Destination;
  productDetails?: MarketBookingProductDetail[] | null;
}

export interface MarketBookingProductDetail {
  id: number;
  status: EMarketBookingDetailStatus;
  product: Product;
  price: number;
  quantity: number;
  basePrice: number;
  bookingFee: number;
  discount: number;
}
export interface AgencyClient {
  id: number;
  email?: string | null;
  fullName?: string | null;
  phone?: string | null;
  firstName?: string | null;
  secondFirstName?: string | null;
  lastName?: string | null;
  secondLastName?: string | null;
  idDocument?: string | null;
  passport?: string | null;
  passportExpiration?: string | null;
  passportEvidenceId?: number | null;
  address?: Address | null;
  birthdate?: string | null;
  country?: Country | null;
}

export interface AgencyClientBooking {
  id: number;
  reference?: string | null;
  bookingDate: string;
  client: AgencyClient;
  saleCurrency?: Currency;
  status: EBookingStatus;
  invoiceId?: number | null;
  totalPrice: number;
  price: number;
  basePrice: number;
  discount: number;
  bookingFee: number;
  paymentFee?: number | null;
  details?: BookingDetail[] | null; // This can be CarBookingDetail or MarketBookingDetail
}

export interface AgencyClientBookingResponse {
  booking: AgencyClientBooking;
  success: boolean;
  error?: IError;
}

export interface Company {
  id: number;
  code?: string | null;
  name?: string | null;
  logoId?: number | null;
}
export interface CarRentalLocation {
  id: number;
  name?: string | null;
  address?: Address;
  destination?: Destination;
  inAirport?: boolean | null;
}
export interface Destination {
  id: number;
  name?: string | null;
  abbrevName?: string | null;
  countryId: number;
  parentDestinationId?: number | null;
  subDestinations?: Destination[] | null;
}
export interface Address {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  countryRegion?: string | null;
}
export interface Country {
  id: number;
  code?: string | null;
  name?: string | null;
}


export interface CreateMarketBookingRequest {
  client: Client;
  beneficiary: Client;
  notes?: Record<string, string | null>;
  //preview: boolean;
}

export interface Client {
  id?: number;
  email?: string;
  fullName?: string;
  phone?: string;
  firstName?: string;
  secondFirstName?: string;
  lastName?: string;
  secondLastName?: string;
  idDocument?: string;
  passport?: string;
  passportExpiration?: string;
  passportEvidenceId?: number;
  address?: Address;
  birthdate?: string;
  country?: Country;
}
