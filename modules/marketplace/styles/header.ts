import {StyleSheet, ViewStyle} from 'react-native';


export const leftStyles = {
  mobile: StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    topSection: {
      flexDirection: 'column-reverse',
      alignItems: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 5,
      gap: 5,
    },
    dropdownText: {
      fontSize: 14,
      marginRight: 5,
      color: '#000',
    },
    searchBar: {
      alignItems: 'flex-start',
      width: '100%',
      paddingHorizontal: 10,
      backgroundColor: '#f4f4f4',
      borderRadius: 8,
    },
  }),
  tablet: StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    topSection: {
      flexDirection: 'row',
      alignItems: 'center',
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
    }),
};


export const rightStyles = {
    mobile: StyleSheet.create({
        container: {
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        badge: {
          position: 'absolute',
          top: 0,
          right: 2,
        },
      }),
    tablet: StyleSheet.create({
        container: {
          backgroundColor: '#fff',
          flexDirection: 'row',
        },
        badge: {
          position: 'absolute',
          top: 0,
          right: 2,
        },
      }),
  };
  
  