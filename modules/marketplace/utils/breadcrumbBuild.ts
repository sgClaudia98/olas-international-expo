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
  label: "FILTERS.ALL_CATEGORIES",
  route: {
    pathname: "/(main)/services/market/products",
    params: {},
  },
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

  if (department || category) items.pop();

  if (department) {
    items.push({
      label: capitalizeWords(department.name),
      route: {
        pathname: "/(main)/services/market/products",
        params: { departmentId: department.id },
      },
    });
  }

  if (category) {
    const params: Record<string, number> = { categoryId: category.id };
    if (department) {
      params.departmentId = department.id;
    }

    items.push({
      label: capitalizeWords(category.name),
      route: {
        pathname: "/(main)/services/market/products",
        params,
      },
    });
  }

  if (product)
    items.push({
      label: product.name,
    });
  return items;
};

export { buildBreadcrumb, homeBreadcrumItem, allCategoriesBreadcrumbItem };
