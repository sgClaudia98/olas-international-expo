import DropdownSelect from "@/components/DropdownSelect";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import styles, { Colors } from "@/styles";
import responsiveStyle from "../styles/productWrapper";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";

interface ProductsWrapperHeaderProps {
  toggleFilters: () => void;
  openMobileDrawer: () => void;
  total: number;
  breadcrumb: string;
  isOpenFilters: boolean;
}

const ProductsWrapperHeader: React.FC<ProductsWrapperHeaderProps> = ({
  toggleFilters,
  openMobileDrawer,
  total,
  breadcrumb,
  isOpenFilters,
}) => {
  const styles = useResponsiveStyles(responsiveStyle);
  const { lessThan } = useBreakpoints();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <View
      style={styles.filterActionContainer}
    >
      {!lessThan.tablet  && <Text>{breadcrumb}</Text>}
      <View
        style={styles.filterActions}
      >
        <Text style={styles.productsQtyText}>
          {total != 1 ? `${total} products` : `${total} product`}
        </Text>
        <DropdownSelect
          buttonTitle={(value) => (value ? value : "Sort by")}
          menuItems={[
            { label: "Best match", value: "best_match" },
            { label: "Lowest price", value: "lowest_price" },
            { label: "Highest price", value: "highest_price" },
          ]}
          value={selectedOption}
          onSelect={setSelectedOption}
        />
        {/* Renderizado condicional: Switch en desktop, botón de texto en móvil */}
        {lessThan.tablet  ? (
          <TouchableOpacity onPress={openMobileDrawer}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                fontWeight: 400,
                color: Colors.blue.second,
              }}
            >
              Filters
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
            <Text style={{ paddingHorizontal: 10 }}>Show Filters</Text>
            <Switch value={isOpenFilters} onValueChange={toggleFilters} />
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductsWrapperHeader;
