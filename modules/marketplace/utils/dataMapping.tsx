import { DropdownItem } from "@/components/MultilevelDropdown";
import { Department } from "../services/interfaces/booking";

function toTitleCase(str: string): string {
  return str
    .split(" ") // Dividir la oración en palabras
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalizar la primera letra de cada palabra
    )
    .join(" "); // Volver a unir las palabras en una sola cadena
}

// Function to map Departments to DropdownItem[]
export function mapDepartmentsToDropdownItems(
  departments: Department[]
): DropdownItem[] {
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