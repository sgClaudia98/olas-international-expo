import {Colors} from '@/styles';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import { ThemedText } from './ThemedText';

const DiscountBadge = ({value}: {value: number}) => {
  return (
    <View style={styles.container}>
      <Svg
        width="65"
        height="22"
        viewBox="0 0 65 22"
        fill="none">
        <Path
          d="M64.2931 2.2071L58.6934 8.90733C58.3185 9.28232 58.3014 9.8848 58.6546 10.2804L64.0127 16.8341C64.588 17.4785 64.1306 18.5 63.2667 18.5H1.5C0.947715 18.5 0.5 18.0523 0.5 17.5V2.5C0.5 1.94772 0.947715 1.5 1.5 1.5H63.086C63.9769 1.5 64.423 2.57712 64.2931 3.2071Z"
          fill={Colors.blue.second}
        />
      </Svg>
      <ThemedText style={styles.text}>-{value}%</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    color: Colors.white.default,
    fontSize: 12,
    lineHeight: 26,
    fontWeight: 700,
    letterSpacing: 2,
    position: 'absolute',
  },
});

export default DiscountBadge;
