import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { categories as staticCategories} from "../../data/landing";
import { categoriesStyles } from "../../styles/landing";
import { useSearchContext } from "../../context/SearchContext";

const Categories = () => {
  const route = useRouter();
  const styles = useResponsiveStyles(categoriesStyles);
  const { departments } = useSearchContext();
  const { setSelection } = useSearchContext();

  const handleNavigation = (departmentId: number) => {
    setSelection({ departmentId: departmentId });
    route.push("/(main)/services/market/products");
  };

  const categories = useMemo(() => {
    return staticCategories.map((category) => {
      const department = departments?.find((dep) => dep.code === category.code);
      return ({
      ...category,
      url: !department ? undefined : ({
        departmentId: department.id,
        categoryId: undefined,
      })
    })}).filter((category) => category.url !== undefined);
  }, []);

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <Pressable
          key={category.name}
          style={styles.categoryContainer}
          onPress={() => category.url && handleNavigation(category.url.departmentId)}
        >
          {category.icon && (
            <View style={styles.iconContainer}>{category.icon}</View>
          )}
          <Text style={styles.name}>{category.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Categories;
