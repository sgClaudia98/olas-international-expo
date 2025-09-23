import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Chip } from 'react-native-paper';
import { Selection, PriceRange } from '../../context/SearchContext';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';
import responsiveStyles from '../../styles/appliedFilters';
import { useTranslation } from 'react-i18next';
import { shouldUseNativeDriver } from '@/utils/animationHelper';

interface AppliedFiltersProps {
  selection: Selection;
  priceRange?: PriceRange;
  onRemoveCategory: () => void;
  onRemovePrice: () => void;
  onClearAll: () => void;
  productName?: string;
  onRemoveProductName?: () => void;
}

const AppliedFilters: React.FC<AppliedFiltersProps> = ({
  selection,
  priceRange,
  onRemoveCategory,
  onRemovePrice,
  onClearAll,
  productName,
  onRemoveProductName,
}) => {
  const styles = useResponsiveStyles(responsiveStyles);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { t } = useTranslation();
  
  const hasFilters = Boolean(
    selection.categoryId || 
    selection.departmentId || 
    (priceRange?.minPrice !== undefined || priceRange?.maxPrice !== undefined) ||
    productName
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: hasFilters ? 1 : 0,
      duration: 200,
      useNativeDriver: shouldUseNativeDriver(),
    }).start();
  }, [hasFilters]);

  if (!hasFilters) return null;

  const formatPriceRange = () => {
    if (!priceRange) return '';
    if (priceRange.minPrice !== undefined && priceRange.maxPrice !== undefined) {
      return `$${priceRange.minPrice} - $${priceRange.maxPrice}`;
    } else if (priceRange.minPrice !== undefined) {
      return `> $${priceRange.minPrice}`;
    } else if (priceRange.maxPrice !== undefined) {
      return `< $${priceRange.maxPrice}`;
    }
    return '';
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.mainRow}>
        <ScrollView 
           
          showsHorizontalScrollIndicator={false} 
          style={styles.filtersContainer}
          contentContainerStyle={{ paddingVertical: 2 }}
        >
        {productName && (
          <Chip
            style={styles.chip}
            textStyle={styles.chipText}
            mode="outlined"
            onClose={onRemoveProductName}
            ellipsizeMode="tail"
          >
            {`${t('FILTERS.SEARCH')}: ${productName.length > 15 ? productName.substring(0, 15) + '...' : productName}`}
          </Chip>
        )}

        {(selection.categoryId || selection.departmentId) && (
          <Chip
            style={styles.chip}
            textStyle={styles.chipText}
            mode="outlined"
            onClose={onRemoveCategory}
            ellipsizeMode="tail"
          >
            {(selection.category || selection.department || 'Category').length > 20 
              ? (selection.category || selection.department || 'Category').substring(0, 20) + '...' 
              : (selection.category || selection.department || 'Category')}
          </Chip>
        )}

        {(priceRange?.minPrice !== undefined || priceRange?.maxPrice !== undefined) && (
          <Chip
            style={styles.chip}
            textStyle={styles.chipText}
            mode="outlined"
            onClose={onRemovePrice}
            ellipsizeMode="tail"
          >
            {formatPriceRange()}
          </Chip>
        )}
        </ScrollView>
        
        <TouchableOpacity onPress={onClearAll} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>{t('FILTERS.CLEAR_ALL')}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default AppliedFilters;