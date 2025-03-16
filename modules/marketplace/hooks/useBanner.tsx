import { useSearchContext } from "../context/SearchContext";
import { Banner } from "../services/interfaces/booking";

export const useBanner = (): { banners: Banner[]; loading: boolean } => {
  const { data, selection } = useSearchContext();

  if (!data) return { banners: [], loading: true };

  const filteredDepartments = data.filter((dept) => {
    const matchesDept = selection.departmentId
      ? dept.id === selection.departmentId
      : true;

    const matchesCat = selection.categoryId
      ? dept.categories.some((cat) => cat.id === selection.categoryId)
      : true;

    return matchesDept && matchesCat;
  });

  const banners = filteredDepartments.flatMap((dept) => dept.banners);

  return { banners, loading: false };
};