
import React, {useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSearchContext} from '../context/SearchContext';
import { useNavigation } from '@react-navigation/core';

import { useRouter } from 'expo-router';
import SearchInput from '@/components/ui/SearchInput';
import DropdownMenuSelect from '@/components/DropdownMenuSelect';

export default function MarketplaceLeftHeader() {
  const {data, selection, setSelection, setProductName} = useSearchContext();
  const route = useRouter();
    
  const [department, setDepartment] = useState<string>(selection?.departmentId?.toString() || '');
  const menuItems = useMemo(() => {
    const all_cat = {
      label: 'All Categories',
      value: '',
    };
    const dep = data?.map(v => {
      return {label: v.name, value: v.id.toString()};
    });
    return dep ? [all_cat, ...dep] : [all_cat];
  }, [data]);
  
  const onDepartmentSelected = (value: string) => {
    setDepartment(value);
    setSelection({departmentId: value == '' ? undefined : +value, categoryId: undefined});
    navigateToProducts();
  };

  const onProductSearch = (value: string) => {
    if (setProductName)
    setProductName(value);
    navigateToProducts();
  };

  // modify this function to navigate to the correct screen
  const navigateToProducts = () => {
    route.push('/(main)/services/market/products'); 
  }

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={{flexDirection: 'row'}}>
          {/* Location Dropdown */}
          <DropdownMenuSelect
            buttonTitle={value => (value ? value : 'All Categories')}
            menuItems={menuItems}
            value={department}
            onSelect={onDepartmentSelected}
          />

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <SearchInput
              onChangeText={onProductSearch}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 14,
    marginRight: 5,
    color: '#000',
  },
  searchBar: {
    alignItems: 'flex-start',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
});
