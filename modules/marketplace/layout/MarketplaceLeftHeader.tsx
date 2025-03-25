
import React, {useMemo, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useSearchContext} from '../context/SearchContext';
import { useNavigation } from '@react-navigation/core';

import { useRouter } from 'expo-router';
import SearchInput from '@/components/ui/SearchInput';
import DropdownMenuSelect from '@/components/DropdownMenuSelect';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';
import {leftStyles as responsiveStyle} from '../styles/header';
import DropdownSelect from '@/components/DropdownSelect';
import { Colors } from '@/styles';

export default function MarketplaceLeftHeader() {
  const styles = useResponsiveStyles(responsiveStyle);
  const {data, selection, setSelection, setProductName} = useSearchContext();
  const route = useRouter();

  const [department, setDepartment] = useState<string>(
    selection?.departmentId?.toString() || ""
  );
  const menuItems = useMemo(() => {
    const all_cat = {
      label: "All Categories",
      value: "",
    };
    const dep = data?.map((v) => {
      return { label: v.name, value: v.id.toString() };
    });
    return dep ? [all_cat, ...dep] : [all_cat];
  }, [data]);

  const onDepartmentSelected = (value: string, label: string) => {
    setDepartment(value);
    setSelection({
      departmentId: value == "" ? undefined : +value,
      department: label == "" ? undefined : label,
      categoryId: undefined,
      category: undefined
    });
    navigateToProducts();
  };

  const onProductSearch = (value: string) => {
    if (setProductName) setProductName(value);
    navigateToProducts();
  };

  // modify this function to navigate to the correct screen
  const navigateToProducts = () => {
    route.push("/(main)/services/market/products");
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
          {/* Location Dropdown */}
          <DropdownSelect
            buttonTitle={value => (value ? value : 'All Categories')}
            menuItems={menuItems}
            value={department}
            onSelect={onDepartmentSelected}
            themeColors={{
                primary: Colors.black.primary,
                outline: 'transparent',
                onSurfaceDisabled: Colors.black.third,
              }}
          />

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <SearchInput
              onChangeText={onProductSearch}
            />
          </View>
        </View>
    </View>
  );
}
