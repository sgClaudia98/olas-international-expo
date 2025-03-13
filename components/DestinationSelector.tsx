import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import DropdownSelect2, {MenuItem} from './DropdownMenuSelect';
import {useGetDestinationsQuery} from '@/services/api/GeoService';
import {Destination} from '@/services/interfaces/geo';
import {useLocationContext} from '@/contexts/locationContext';
import {capitalizeWords} from '@/utils/string';
import { DEFAULT_DESTINATION } from '@/constants';

const DestinationSelector = () => {
  const {destinationCountry, setDestinations} = useLocationContext();

  const {
    data: destinations,
    isLoading,
    isSuccess,
  } = useGetDestinationsQuery({CountryId: destinationCountry?.id, BookingType: 'Market'});
  const [data, setData] = useState<MenuItem[]>([]);
  const [selected, setSelected] = useState<Destination>();

  useEffect(() => {
    if (isSuccess && destinations.destinations) {
      const _dest = destinations.destinations;
      const initDest = _dest.find(v => v.id == DEFAULT_DESTINATION);
      if (initDest) {
        setDestinations([initDest]);
        setSelected(initDest);
      }
      setData(
        _dest.map(i => {
          return {label: capitalizeWords(i.name), value: i.id.toString()};
        }),
      );
    }
  }, [destinations, isLoading]);

  const handleSelect = (value: string) => {
    const dest = destinations?.destinations?.find(v => v.id == +value);
    setSelected(dest);
    setDestinations(dest ? [dest] : []);
  };

  if (!destinationCountry) return <ActivityIndicator animating={true} />;

  return (
    <View style={styles.container}>
      <DropdownSelect2
        icon="map-marker-outline"
        buttonTitle={value => value?.label}
        onSelect={handleSelect}
        menuItems={data}
        iconSize={24}
        value={selected?.id.toString()}
      />
    </View>
  );
};

export default DestinationSelector;

const styles = StyleSheet.create({
  container: {
    marginVertical: -10,
  },
});
