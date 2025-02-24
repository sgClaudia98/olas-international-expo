import { IError } from "./error";

export interface Destination {
    id: number;
    name: string;
    abbrevName?: string;
    countryId: number;
    parentDestinationId?: number;
  }
  
  export interface DestinationsResponse {
    destinations?: Destination[];
    success: boolean;
    error: Error;
  }

// Interface for Country
export interface Country {
  id: number; // Identificador único del país
  code?: string | null; // Código del país (puede ser nulo)
  name?: string | null; // Nombre del país (puede ser nulo)
}

// Interface for CountriesResponse
export interface CountriesResponse {
  countries?: Country[] | null; // Lista de países (puede ser nulo)
  success: boolean; // Indicador de éxito
  error?: IError; // Detalles del error (opcional)
}
// Interface for CountryResponse
export interface CountryResponse {
  country: Country; // Detalles del país
  success: boolean; // Indicador de éxito
  error?: IError; // Detalles del error (opcional)
}
