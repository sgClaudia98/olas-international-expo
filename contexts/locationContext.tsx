import { useGetCountryByCodeQuery } from '@/services/api/GeoService';
import { Country, Destination } from '@/services/interfaces/geo';
import { getLastElement } from '@/utils/arrays';
import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';

// Interfaces para las ubicaciones

interface LocationContextProps {
  originCountry?: Country; // País de origen
  setOriginCountry: (country: Country) => void; // Setter para el país de origen
  destinationCountry?: Country; // País de destino
  setDestinationCountryCode: (destinationCountryCode: string) => void; // Setter para el país de destino
  destinations: Destination[]; // Array de destinos (ordenados por especificidad)
  setDestinations: (destinations: Destination[]) => void; // Setter para destinos
  addDestination: (destination: Destination) => void; // Agregar un destino al array
  clearDestinations: () => void; // Limpiar destinos
  activeDestination?: Destination;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

// Componente proveedor del contexto
export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [destinationCountryCode, setDestinationCountryCode] = useState<string>("CU")
  const [originCountry, setOriginCountry] = useState<Country>();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const {data: getCountryData, refetch} = useGetCountryByCodeQuery(destinationCountryCode)
  const activeDestination = useMemo(() => getLastElement(destinations), [destinations])
  const addDestination = (destination: Destination) => {
    setDestinations((prevDestinations) => [...prevDestinations, destination]);
  };

  const clearDestinations = () => {
    setDestinations([]);
  };

  useEffect(() => {
    refetch()
  }, [destinationCountryCode])

  return (
    <LocationContext.Provider
      value={{
        originCountry,
        setOriginCountry,
        destinationCountry: getCountryData?.country,
        setDestinationCountryCode,
        destinations,
        setDestinations,
        addDestination,
        clearDestinations,
        activeDestination,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Hook para usar el contexto de ubicación
export const useLocationContext = (): LocationContextProps => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation debe ser usado dentro de LocationProvider');
  }
  return context;
};
