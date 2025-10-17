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
  const { t , i18n } = useTranslation();
  const styles = useResponsiveStyles(responsiveStyle);
  const { departments, selection, setSelection, setProductName, productName } =
    useSearchContext();
  const route = useRouter();
  const pathname = usePathname();

  const [department, setDepartment] = useState<string>(
    selection?.departmentId?.toString() || ""
  );
  const all_cat = useMemo(() => {return {label: t("FILTERS.ALL_CATEGORIES"), value:""}}, [i18n.language]);

  const departmentItems = useMemo(() => departments?.map((v) => {
      return { label: v.name, value: v.id.toString() };
    }), [departments]);
    
  const menuItems = useMemo(() => [all_cat].concat(departmentItems || []), [all_cat, departmentItems]);

  const onDepartmentSelected = (value: string, label: string) => {
    setDepartment(value);
    setSelection({
      departmentId: value == "" ? undefined : +value,
      department: label == "" ? undefined : capitalizeWords(label),
      categoryId: undefined,
      category: undefined,
    });
  };

  const onProductSearch = (value: string) => {
    if (setProductName) setProductName(value);
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
