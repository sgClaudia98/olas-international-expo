import {Colors} from '@/styles';
import {layout} from '@/styles/sizing';
import {StyleSheet} from 'react-native';

const styles = {
  mobile: StyleSheet.create({
    filters: {
      display: 'none',
    },
    filterHeader: {
      display: 'none',
    },
  }),
  tablet: StyleSheet.create({
    filters: {
      backgroundColor: '#f4f4f4',
      padding: 10,
      width: 250, // Fixed width for left panel
      gap: 5,
    },
    filterHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  }),
};
export default styles;
