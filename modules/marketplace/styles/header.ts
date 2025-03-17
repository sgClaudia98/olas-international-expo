import {StyleSheet, ViewStyle} from 'react-native';

const leftDesktopStyles = StyleSheet.create({
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
});

export const leftStyles = {
  mobile: StyleSheet.create({
    ...leftDesktopStyles,
    topSection: {
      ...leftDesktopStyles.topSection,
      flexDirection: 'column-reverse',
      alignItems: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 5,
      gap: 5,
    },
    searchBar: {
      ...leftDesktopStyles.searchBar,
      marginHorizontal: 0,
      width: '100%',
      },
  }),
  tablet: leftDesktopStyles,
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
  
  