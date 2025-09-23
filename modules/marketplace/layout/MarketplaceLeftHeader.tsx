import React, { useMemo, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useSearchContext } from "../context/SearchContext";
import { useNavigation } from "@react-navigation/core";

import { usePathname, useRouter } from "expo-router";
import SearchInput from "@/components/ui/SearchInput";
import DropdownMenuSelect from "@/components/DropdownMenuSelect";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { leftStyles as responsiveStyle } from "../styles/header";
import DropdownSelect from "@/components/DropdownSelect";
import { Colors } from "@/styles";
import { useTranslation } from "react-i18next";
import { capitalizeWords } from "@/utils/string";

export default function MarketplaceLeftHeader() {
  const { t } = useTranslation();
  const styles = useResponsiveStyles(responsiveStyle);
  const { departments, selection, setSelection, setProductName, productName } =
    useSearchContext();
  const route = useRouter();
  const pathname = usePathname();

  const [department, setDepartment] = useState<string>(
    selection?.departmentId?.toString() || ""
  );
  const all_cat = {
    label: t("FILTERS.ALL_CATEGORIES"),
    value: "",
  };

  const menuItems = useMemo(() => {
    const dep = departments?.map((v) => {
      return { label: v.name, value: v.id.toString() };
    });
    return dep ? [all_cat, ...dep] : [all_cat];
  }, [departments]);

  const onDepartmentSelected = (value: string, label: string) => {
    setDepartment(value);
    setSelection({
      departmentId: value == "" ? undefined : +value,
      department: label == "" ? undefined : capitalizeWords(label),
      categoryId: undefined,
      category: undefined,
    });
    navigateToProducts();
  };

  const onProductSearch = (value: string) => {
    if (setProductName) setProductName(value);
    if (pathname !== "/services/market/products") {
      navigateToProducts(value);
    }
    // URL update is now handled by SearchContext
  };

  // Accepts an optional search string and adds it as a query param
  const navigateToProducts = (search?: string) => {
    route.push({
      pathname: "/(main)/services/market/products",
      params: search ? { search } : undefined,
    });
  };

  return (
    <View style={styles.containerLeft}>
      {/* Top Section */}
      <View style={styles.topSection}>
        {/* Location Dropdown */}
        <DropdownSelect
          buttonTitle={(value) => (value ? value : all_cat.label)}
          menuItems={menuItems}
          value={department}
          onSelect={onDepartmentSelected}
          themeColors={{
            primary: Colors.black.primary,
            outline: "transparent",
            onSurfaceDisabled: Colors.black.third,
          }}
        />

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <SearchInput
            value={productName || ""}
            onChangeText={onProductSearch}
          />
        </View>
      </View>
    </View>
  );
}
