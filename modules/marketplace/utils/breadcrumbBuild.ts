import { BreadcrumbItem } from "@/components/Breadcrumb";
import {
  Department,
  Product,
  ProductCategory,
} from "../services/interfaces/booking";
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
      label: department.name,
      route: `${ROUTE}?departmentId=${department.id}`,
    });
  }

  if (category)
    items.push({
      label: category.name,
      route: `${ROUTE}?categoryId=${category.id}`,
    });

  if (product)
    items.push({
      label: product.name,
    });
  return items;
};

export { buildBreadcrumb, homeBreadcrumItem, allCategoriesBreadcrumbItem };
