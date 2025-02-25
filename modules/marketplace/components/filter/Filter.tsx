import MultilevelCheckDropdown, {
  DropdownCheckItem,
} from '@/components/MultilevelCheckDropdown';
import MultilevelDropdown, {DropdownItem} from '@/components/MultilevelDropdown';
import {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, useWindowDimensions, ViewStyle, TextStyle} from 'react-native';
import {useSearchContext} from '../../context/SearchContext';
import {IAllFilters} from '../../hooks/useSearchMarketOptions';
import {SearchMarketBookingOptionStats} from '../../services/interfaces/booking';
import {mapDepartmentsToDropdownItems, mapPriceRanges} from '../../utils/dataMapping';
import React from 'react';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';
import responsiveStyle from "../../styles/filter"

interface FiltersProps {
  onItemClick: (item: any[]) => void;
  setFilter: (value: IAllFilters) => void;
  stats?: {
    data: SearchMarketBookingOptionStats;
    searchId: number |null;
  } 
}

const Filters: React.FC<FiltersProps> = ({onItemClick, setFilter,stats}) => {
  const styles = useResponsiveStyles(responsiveStyle);
  const {data, setSelection} = useSearchContext();
  const mappedData = useMemo(() => (data ? mapDepartmentsToDropdownItems(data) : []), [data]);

  const [priceRange, setPriceRange] = useState<DropdownItem[]>([])

  useEffect(() => {
    setPriceRange(stats ? mapPriceRanges(stats.data.minPrice, stats.data.maxPrice) : [])
  }, [stats?.searchId])


  const [highlights, setHighlights] = useState<DropdownCheckItem[]>([
    {
      title: 'New Arrivals',
      value: false,
      key: 'isNewArrival',
    },
    {
      title: 'Is in offer',
      value: false,
      key: 'isInOffer',
    },
  ]);

  const onSelectedHighlights = (value: boolean, index: number) => {
    let _temp = [...highlights];
    _temp[index].value = value;
    setHighlights(_temp);
  };

  const _onItemClick = (item: DropdownItem[]) => {
    console.debug(item, 'onClick');
    setSelection({
      departmentId: +item[0]?.value,
      categoryId: +item[1]?.value,
    });
    onItemClick(item);
  };

  const _onSelectPrice = (trace: DropdownItem[]) => {
    const lastItem = trace[trace.length - 1]; 
    const [minPrice, maxPrice] = lastItem.value.split('-');
    setFilter({
      query: {
        minPrice: minPrice != 'minPrice' ? +minPrice : undefined,
        maxPrice: maxPrice != 'maxPrice' ? +maxPrice : undefined,
      },
    });
  };

  return (
    <View style={styles.filters as ViewStyle}>
      <Text style={styles.filterHeader as TextStyle}>Filters</Text>
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
    </View>
  );
};


export default Filters