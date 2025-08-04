import MultilevelDropdown, {
  DropdownItem,
} from "@/components/MultilevelDropdown";
import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useSearchContext } from "../../context/SearchContext";
import { SearchMarketBookingOptionStats, Department } from "../../services/interfaces/booking";
import {
  mapDepartmentsToDropdownItems,
} from "../../utils/dataMapping";
import {
  generatePriceRangeOptions,
  priceRangeOptionsToDropdownItems,
  parsePriceRangeValue,
  PriceRangeOption,
} from "../../utils/priceRangeUtils";
import React from "react";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import responsiveStyle from "../../styles/filter";
import FilterDrawer from "./FilterDrawer";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { capitalizeWords } from "@/utils/string";
import AppliedFilters from "./AppliedFilters";

interface FiltersProps {
  stats?: SearchMarketBookingOptionStats;
  isDrawerOpen?: boolean;
  onCloseDrawer: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  stats,
  isDrawerOpen = false,
  onCloseDrawer,
}) => {
  const styles = useResponsiveStyles(responsiveStyle);

  const {lessThan} = useBreakpoints();

  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (lessThan.tablet ) {
      setDrawerVisible(isDrawerOpen);
    }
  }, [isDrawerOpen, lessThan.tablet ]);

  // Get filter state and mutations from context
  const { 
    departments: data,
    selection,
    productName,
    priceRange,
    setSelection: setCategory,
    setPriceRange: setPriceFilter,
    clearProductName,
    clearAllFilters: clearFilters
  } = useSearchContext();
  const mappedData = useMemo(
    () => (data ? mapDepartmentsToDropdownItems(data) : []),
    [data]
  );

  const [priceRangeOptions, setPriceRangeOptions] = useState<PriceRangeOption[]>([]);
  
  const [activeCategoryTrace, setActiveCategoryTrace] = useState<DropdownItem[]>([])
  const [activePriceTrace, setActivePriceTrace] = useState<DropdownItem[]>([])


  useEffect(() => {
    if (stats) {
      const options = generatePriceRangeOptions(stats.minPrice, stats.maxPrice);
      setPriceRangeOptions(options);
    } else {
      setPriceRangeOptions([]);
    }
  }, [stats?.minPrice, stats?.maxPrice]);


  const _onItemClick = (item: DropdownItem[]) => {
    setActiveCategoryTrace(item)

    setCategory({
      departmentId: +item[0]?.value || undefined,
      department: item[0]? capitalizeWords(item[0].title) : undefined,
      categoryId: +item[1]?.value || undefined,
      category: item[1]? capitalizeWords(item[1].title) : undefined
    });

    if (lessThan.tablet  && onCloseDrawer) {
      onCloseDrawer();
    }
  };

  const _onSelectPrice = (trace: DropdownItem[]) => {
    setActivePriceTrace(trace)

    const lastItem = trace[trace.length - 1];
    const parsedRange = parsePriceRangeValue(lastItem.value);
    
    setPriceFilter(parsedRange);

    if (lessThan.tablet  && onCloseDrawer) {
      onCloseDrawer();
    }
  };

  // Handler functions for removing filters
  const handleRemoveCategory = () => {
    setActiveCategoryTrace([]);
    setCategory({
      departmentId: undefined,
      department: undefined,
      categoryId: undefined,
      category: undefined,
    });
  };

  const handleRemovePrice = () => {
    setActivePriceTrace([]);
    setPriceFilter({});
  };

  const handleClearAll = () => {
    setActiveCategoryTrace([]);
    setActivePriceTrace([]);
    clearFilters();
  };

  const filterContent = (
    <>
      <MultilevelDropdown
        title="Categories"
        items={mappedData}
        onItemClick={_onItemClick}
        activeTrace={activeCategoryTrace}
      />
      {priceRangeOptions.length > 0 && (
        <MultilevelDropdown
          title="Price"
          items={priceRangeOptionsToDropdownItems(priceRangeOptions)}
          onItemClick={_onSelectPrice}
          activeTrace={activePriceTrace}
        />
      )}
      
      <AppliedFilters
        selection={selection}
        priceRange={priceRange}
        productName={productName}
        onRemoveCategory={handleRemoveCategory}
        onRemovePrice={handleRemovePrice}
        onRemoveProductName={clearProductName}
        onClearAll={handleClearAll}
      />
      
    </>
  );

  return (
    <>
      {!lessThan.tablet  && <View style={styles.filters}>{filterContent}</View>}

      {lessThan.tablet  && (
        <FilterDrawer
          visible={isDrawerOpen && drawerVisible}
          onClose={onCloseDrawer}
        >
          <View style={styles.filters}>{filterContent}</View>
        </FilterDrawer>
      )}
    </>
  );
};

export default Filters;
