import { useMemo } from "react";
import { MarketBookingOption } from "../services/interfaces/booking";

export type SortOption = "best_match" | "lowest_price" | "highest_price" | null;

export const useSort = (
  items: MarketBookingOption[],
  sortBy: SortOption
): MarketBookingOption[] => {
  return useMemo(() => {
    const sorted = [...items];

    switch (sortBy) {
      case "lowest_price":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "highest_price":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "best_match":
        // i think this will depends on the backend
        break;
      default:
        break;
    }

    return sorted;
  }, [items, sortBy]);
};
