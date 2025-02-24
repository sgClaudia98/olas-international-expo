
import { DropdownItem } from "@/components/Dropdown/MultilevelDropdown";
import { Department, DepartmentsResponse } from "../services/interfaces/booking";

function toTitleCase(str: string): string {
  return str
    .split(' ')  // Dividir la oración en palabras
    .map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()  // Capitalizar la primera letra de cada palabra
    )
    .join(' ');  // Volver a unir las palabras en una sola cadena
}
// Function to map DepartmentsResponse to DropdownItem[]
export function mapDepartmentsToDropdownItems(departments: Department[]): DropdownItem[] {
    if (!departments) return [];
  
    return departments.map((department) => {
      const categories = department.categories.map((category) => ({
        title: category.name ? toTitleCase(category.name) : "Unnamed Category",
        value: category.id.toString(),
      }));
  
      return {
        title: department.name,
        value: department.id.toString(),
        items: categories,
      };
    });
  }

  function generateIntermediateValues(_minPrice: number, _maxPrice: number) {
    // Determine the step based on the maxPrice for rounding
    let step;
    if (_maxPrice > 2000) {
        step = 500;
    } else if (_maxPrice > 500) {
        step = 50;
    } else {
        step = 5;
    }

    // Adjust minPrice and maxPrice to be multiples of the step
    const minPrice = Math.ceil(_minPrice / step) * step;
    const maxPrice = Math.floor(_maxPrice / step) * step;
    if (minPrice > maxPrice) {
        throw new Error("Invalid range: minPrice must be less or equal than maxPrice");
    }

    // Calculate the step to divide into exactly 3 parts
    const totalRange = maxPrice - minPrice;
    const partitionSize = Math.ceil(totalRange / 3);

    const values = [];
    for (let i = 0; i < 3; i++) {
        const value = minPrice + i * partitionSize;
        values.push(Math.round(value / step) * step); // Ensure each value is a multiple of the step
    }

    // Add the maximum value as the last element
    values[2] = maxPrice;
    
    return values;
}


function generatePriceRanges(values: number[]): DropdownItem[] {
    if (!values || values.length === 0) {
        throw new Error("The input array cannot be empty.");
    }

    const result = [];

    // Add the first range: "Less than ..."
    result.push({
        title: `Menor que ${values[0]}`,
        value: `minPrice-${values[0] - 1}`,
    });

    // Add intermediate ranges: "... to ..."
    for (let i = 0; i < values.length - 1; i++) {
        result.push({
            title: `${values[i]} a ${values[i + 1] - 1}`,
            value: `${values[i]}-${values[i + 1] - 1}`,
        });
    }

    // Add the last range: "More than ..."
    result.push({
        title: `Más de ${values[values.length - 1]}`,
        value: `${values[values.length - 1]}-maxPrice`,
    });

    return result;
}

export function mapPriceRanges(minPrice: number, maxPrice: number): DropdownItem[] {

  if (minPrice ==0 && maxPrice==0|| maxPrice - minPrice < 20) return [];
  
  const split = generateIntermediateValues(minPrice, maxPrice)
  console.debug("S", split)

  return generatePriceRanges(split)
}