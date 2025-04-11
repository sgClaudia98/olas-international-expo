import { EMarketBookingDetailStatus } from "../services/interfaces/bookingDetail";

// Define the translations for the statuses
const translations: Record<EMarketBookingDetailStatus, Record<string, string>> = {
  Requested: {
    en: "Requested",
    es: "Solicitado"
  },
  Processing: {
    en: "Processing",
    es: "En Proceso"
  },
  Denied: {
    en: "Denied",
    es: "Denegado"
  },
  Confirmed: {
    en: "Confirmed",
    es: "Confirmado"
  },
  Modified: {
    en: "Modified",
    es: "Modificado"
  },
  Cancelled: {
    en: "Cancelled",
    es: "Cancelado"
  },
  Penalties: {
    en: "Penalties",
    es: "Penalidades"
  },
  Delivered: {
    en: "Delivered",
    es: "Entregado"
  }
};

// Function to get the translation based on the status and language
export function getStatusTranslation(status: EMarketBookingDetailStatus, language: string): string {
  // Check if the status exists in translations and if the language exists
  const statusTranslations = translations[status];
  if (statusTranslations && statusTranslations[language]) {
    return statusTranslations[language];
  } else {
    // If the language isn't found, default to English
    return statusTranslations?.en || "Translation not available";
  }
}