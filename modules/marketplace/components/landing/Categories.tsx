import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { categories } from "../../data/landing";
import { categoriesStyles } from "../../styles/landing";

const Categories = () => {
  const router = useRouter();
  const styles = useResponsiveStyles(categoriesStyles);

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <Pressable
          key={category.name}
          style={styles.categoryContainer}
          onPress={() => category.url && router.navigate(category.url)}
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
