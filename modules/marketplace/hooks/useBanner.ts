import { useSearchContext } from "../context/SearchContext";
import { BannerFromDepartment } from "../services/interfaces/booking";

export const useBanner = (): { banners: BannerFromDepartment[]; loading: boolean } => {
  const { departments, selection } = useSearchContext();

  if (!departments) return { banners: [], loading: true };

  const filteredDepartments = departments.filter((dept) => {
    const matchesDept = selection.departmentId
      ? dept.id === selection.departmentId
      : true;

    const matchesCat = selection.categoryId
      ? dept.categories.some((cat) => cat.id === selection.categoryId)
      : true;

    return matchesDept && matchesCat;
  });

  const banners = filteredDepartments.flatMap((dept) =>
    dept.banners.map((banner) => ({
      ...banner,
      departmentId: dept.id,
    }))
  );

  return { banners, loading: false };
};