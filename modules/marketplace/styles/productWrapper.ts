import {Colors} from '@/styles';
import {layout} from '@/styles/sizing';
import {StyleSheet} from 'react-native';


const styles = {
  mobile: StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
    },
    products: {},
    productOpen: {
      width: '100%',
      padding: 12,
    },
    productClose: {
      width: '100%',
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
