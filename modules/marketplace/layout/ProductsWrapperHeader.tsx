import DropdownSelect from "@/components/DropdownSelect";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import styles, { Colors } from "@/styles";
import responsiveStyle from "../styles/productWrapper";
import React, { useState } from "react";
import { View, Text, TouchableOpacity} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Breadcrumb, { BreadcrumbItem } from "@/components/Breadcrumb";
import { SortOption } from "../hooks/useSort";
import { useTranslation } from "react-i18next";
import { Switch } from "react-native-paper";

interface ProductsWrapperHeaderProps {
  toggleFilters: () => void;
  openMobileDrawer: () => void;
  total: number;
  breadcrumb?: BreadcrumbItem[];
  isOpenFilters: boolean;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
}

const ProductsWrapperHeader: React.FC<ProductsWrapperHeaderProps> = ({
  toggleFilters,
  openMobileDrawer,
  total,
  breadcrumb,
  isOpenFilters,
  sortBy,
  setSortBy,
}) => {
  const {t} = useTranslation();
  const styles = useResponsiveStyles(responsiveStyle);
  const { lessThan } = useBreakpoints();

  return (
    <View style={styles.filterActionContainer}>
      {!lessThan.tablet && <Breadcrumb items={breadcrumb} />}
      <View style={styles.filterActions}>
        <Text style={styles.productsQtyText}>
        {t("PRODUCTS.TOTAL", { count: total })}
        </Text>
        <DropdownSelect
          buttonTitle={(value) => value ?? "Sort by"}
          menuItems={[
            { label: "Best match", value: "best_match" },
            { label: "Lowest price", value: "lowest_price" },
            { label: "Highest price", value: "highest_price" },
          ]}
          value={sortBy}
          onSelect={(value) => setSortBy(value as SortOption)}
        />
        {/* Renderizado condicional: Switch en desktop, botón de texto en móvil */}
        {lessThan.tablet ? (
          <TouchableOpacity onPress={openMobileDrawer}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                fontWeight: 400,
                color: Colors.blue.second,
              }}
            >
              {t('FILTERS.LABEL')}
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flexDirection: "row",
              paddingStart: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ paddingHorizontal: 10 }}>{t('SHOW_FILTERS')}</Text>
            <Switch 
            value={isOpenFilters} onValueChange={toggleFilters} />
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductsWrapperHeader;
