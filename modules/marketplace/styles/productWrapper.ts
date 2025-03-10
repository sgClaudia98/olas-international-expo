import {Colors} from '@/styles';
import {layout} from '@/styles/sizing';
import {StyleSheet, ViewStyle} from 'react-native';


const styles = {
  mobile: StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
    },
    products: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10
    },
    productOpen: {
      width: '48%',
      padding: 12,
    },
    productClose: {
      width: '40%',
      padding: 12,
    },
  }),
  tablet: StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
    },
    products: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: "space-between",
      flexWrap: 'wrap',
      padding: 10,
      marginHorizontal: -12,
      marginTop: -12,},
    productOpen: {
      width: '45%',
      padding: 12,
    },
    productClose: {
      width: '30%',
      padding: 12,
    },
  }),
  desktop: StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
    },
    products: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 10,
      marginHorizontal: -12,
      marginTop: -12,
    },
    productOpen: {
      width: '25%',
      padding: 12,
    },
    productClose: {
      width: '20%',
      padding: 12,
    },
  }),
};
export default styles;
