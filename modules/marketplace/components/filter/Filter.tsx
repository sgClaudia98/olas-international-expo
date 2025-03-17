import { DropdownCheckItem } from "@/components/MultilevelCheckDropdown";
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
import { IAllFilters } from "../../hooks/useSearchMarketOptions";
import { SearchMarketBookingOptionStats } from "../../services/interfaces/booking";
import {
  mapDepartmentsToDropdownItems,
  mapPriceRanges,
} from "../../utils/dataMapping";
import React from "react";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import responsiveStyle from "../../styles/filter";
import FilterDrawer from "./FilterDrawer";

interface FiltersProps {
  onItemClick: (item: any[]) => void;
  setFilter: (value: IAllFilters) => void;
  stats?: {
    data: SearchMarketBookingOptionStats;
    searchId: number | null;
  };
  isDrawerOpen?: boolean;
  onCloseDrawer?: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  onItemClick,
  setFilter,
  stats,
  isDrawerOpen = false,
  onCloseDrawer,
}) => {
  const styles = useResponsiveStyles(responsiveStyle);
  const { data, setSelection } = useSearchContext();
  const mappedData = useMemo(
    () => (data ? mapDepartmentsToDropdownItems(data) : []),
    [data]
  );

  const [priceRange, setPriceRange] = useState<DropdownItem[]>([]);

  useEffect(() => {
    setPriceRange(
      stats ? mapPriceRanges(stats.data.minPrice, stats.data.maxPrice) : []
    );
  }, [stats?.searchId]);

  const [highlights, setHighlights] = useState<DropdownCheckItem[]>([
    {
      title: "New Arrivals",
      value: false,
      key: "isNewArrival",
    },
    {
      title: "Is in offer",
      value: false,
      key: "isInOffer",
    },
  ]);

  const onSelectedHighlights = (value: boolean, index: number) => {
    let _temp = [...highlights];
    _temp[index].value = value;
    setHighlights(_temp);
  };

  const _onItemClick = (item: DropdownItem[]) => {
    setSelection({
      departmentId: +item[0]?.value,
      categoryId: +item[1]?.value,
    });

    onItemClick(item);

    if (isMobile && onCloseDrawer) {
      onCloseDrawer();
    }
  };

  const _onSelectPrice = (trace: DropdownItem[]) => {
    const lastItem = trace[trace.length - 1];
    const [minPrice, maxPrice] = lastItem.value.split("-");
    setFilter({
      query: {
        minPrice: minPrice != "minPrice" ? +minPrice : undefined,
        maxPrice: maxPrice != "maxPrice" ? +maxPrice : undefined,
      },
    });

    if (isMobile && onCloseDrawer) {
      onCloseDrawer();
    }
  };

  const { width: screenWidth } = useWindowDimensions();
  const isMobile = screenWidth < 768;

  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setDrawerVisible(isDrawerOpen);
    }
  }, [isDrawerOpen, isMobile]);

  const filterContent = (
    <>
      <MultilevelDropdown
        title="Categories"
        items={mappedData}
        onItemClick={_onItemClick}
      />
      {priceRange.length > 0 && (
        <MultilevelDropdown
          title="Price"
          items={priceRange}
          onItemClick={_onSelectPrice}
        />
      )}
    </>
  );

  return (
    <>
      {!isMobile && <View style={styles.filters}>{filterContent}</View>}

      {isMobile && (
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
