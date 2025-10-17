import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { categoriesStyles } from "../../styles/landing";
import { useSearchContext } from "../../context/SearchContext";
import { CategoryIcon } from "@/components/LandingIcons";

const Categories = () => {
  const route = useRouter();
  const styles = useResponsiveStyles(categoriesStyles);
  const { departments, setSelection } = useSearchContext();

  const handleNavigation = (departmentId: number) => {
    setSelection({ departmentId: departmentId });
  };

  const categories = useMemo(() => {
    if (!departments || departments.length === 0) {
      return [];
    }
    return departments.map((dep) => {
      const departmentIcon = {
        name: dep.name,
        icon: React.createElement(CategoryIcon, { name: dep.code }),
          code: dep.code,
        }
      return {
        ...departmentIcon,
        url: {
          departmentId: dep.id,
        categoryId: undefined,
        }
      }
    }
    ).filter((category) => category.url !== undefined);
  }, [departments]);

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
