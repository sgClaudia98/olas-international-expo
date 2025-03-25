import { BreadcrumbItem } from "@/components/Breadcrumb";
import {
  Department,
  Product,
  ProductCategory,
} from "../services/interfaces/booking";
import { capitalizeWords } from "@/utils/string";
const homeBreadcrumItem = {
  label: "ROUTE.HOME",
  route: "/",
};

const allCategoriesBreadcrumbItem = {
  label: "FILTER.ALL_CATEGORIES",
  route: "/services/market/products",
};

const buildBreadcrumb = (
  department?: Department,
  category?: ProductCategory,
  product?: Product
): BreadcrumbItem[] => {
  let items: BreadcrumbItem[] = [
    homeBreadcrumItem,
    allCategoriesBreadcrumbItem,
  ];
  const ROUTE = "/services/market/products";

  if (department || category) items.pop();

  if (department) {
    items.push({
      label: capitalizeWords(department.name),
      route: `${ROUTE}?departmentId=${department.id}`,
    });
  }

  if (category)
    items.push({
      label: capitalizeWords(category.name),
      route: `${ROUTE}?categoryId=${category.id}`,
    });

  if (product)
    items.push({
      label: product.name,
    });
  return items;
};

export { buildBreadcrumb, homeBreadcrumItem, allCategoriesBreadcrumbItem };
