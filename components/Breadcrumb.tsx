import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Colors } from "@/styles";
import { useSearchContext } from "@/modules/marketplace/context/SearchContext";
import { ThemedText } from "./ThemedText";
import { useRouter } from "expo-router";

const Breadcrumb: React.FC = () => {
  const BASE_CATEGORY = "All Categories";

  const { selection, setSelection, data } = useSearchContext();

  const department = data?.find((d) => d.id === selection.departmentId);

  const category = department?.categories?.find(
    (c) => c.id === selection.categoryId
  );

  const router = useRouter();

  const handleRouting = (departmentId = null, categoryId = null) => {
    setSelection({ departmentId: departmentId, categoryId: categoryId });
    router.push({
      pathname: "/services/market/products",
    });
  };

  return (
    <View style={styles.row}>
      {department && (
        <Pressable onPress={() => handleRouting(department.id, null)}>
          <ThemedText lightColor={Colors.blue.primary}>
            {department.name}
          </ThemedText>
        </Pressable>
      )}
      {category && (
        <>
          <ThemedText lightColor={Colors.black.second}> / </ThemedText>
          <Pressable onPress={() => handleRouting(department.id, category.id)}>
            <ThemedText lightColor={Colors.blue.primary}>
              {category.name}
            </ThemedText>
          </Pressable>
        </>
      )}
      {!department && !category && (
        <Pressable onPress={() => handleRouting()}>
          <ThemedText lightColor={Colors.blue.primary}>
            {BASE_CATEGORY}
          </ThemedText>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 12,
  },
});

export default Breadcrumb;
