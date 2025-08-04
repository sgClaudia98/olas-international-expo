import { DropdownItem } from "@/components/MultilevelDropdown";

export interface PriceRangeOption {
  title: string;
  minPrice?: number;
  maxPrice?: number;
  value: string;
}

export function generatePriceRangeOptions(
  minPrice: number,
  maxPrice: number
): PriceRangeOption[] {
  if ((minPrice === 0 && maxPrice === 0) || maxPrice - minPrice < 20) return [];

  // Determine the step based on the maxPrice for rounding
  let step: number;
  if (maxPrice > 2000) {
    step = 500;
  } else if (maxPrice > 500) {
    step = 50;
  } else {
    step = 5;
  }

  // Adjust minPrice and maxPrice to be multiples of the step
  const adjustedMin = Math.ceil(minPrice / step) * step;
  const adjustedMax = Math.floor(maxPrice / step) * step;

  if (adjustedMin > adjustedMax) {
    return [];
  }

  // Calculate intermediate values using actual price range
  const totalRange = maxPrice - minPrice;
  const partitionSize = Math.ceil(totalRange / 4);

  const values = [minPrice]; // Start with actual minPrice
  for (let i = 1; i < 4; i++) {
    const value = minPrice + i * partitionSize;
    values.push(Math.round(value / step) * step);
  }
  values.push (maxPrice); // Ensure the last value is exactly the max price

  const result: PriceRangeOption[] = [];

  // Add all ranges
  for (let i = 0; i < values.length - 1; i++) {
    result.push({
      title: `$${values[i]} - $${values[i + 1]}`,
      minPrice: values[i],
      maxPrice: values[i + 1],
      value: `${values[i]}-${values[i + 1]}`,
    });
  }

  return result;
}

export function priceRangeOptionsToDropdownItems(
  options: PriceRangeOption[]
): DropdownItem[] {
  return options.map(option => ({
    title: option.title,
    value: option.value,
  }));
}

export function parsePriceRangeValue(value: string): { minPrice?: number; maxPrice?: number } {
  if (value.startsWith('max-')) {
    return { maxPrice: parseInt(value.substring(4)) };
  } else if (value.startsWith('min-')) {
    return { minPrice: parseInt(value.substring(4)) };
  } else {
    const [min, max] = value.split('-').map(v => parseInt(v));
    return { minPrice: min, maxPrice: max };
  }
}