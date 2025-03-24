import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import { Colors } from '@/styles';

interface NumberInputProps {
  onChange?: (value: number) => void; // Callback for notifying parent component
  initialValue?: number; // Optional initial value
  size?: 'small' | 'default'; // Size variation
  style?: ViewStyle;
}

const NumberInput: React.FC<NumberInputProps> = ({ onChange, initialValue = 1, size = 'default', style }) => {
  const [amount, setAmount] = useState(initialValue);

  const handleChange = (value: number) => {
    const _newVal = amount + value;
    if (_newVal > 0) {
      setAmount(_newVal);
      onChange?.(_newVal); // Notify parent component of the new value
    }
  };

  const isSmall = size === 'small';

  return (
    <View style={[styles.container, isSmall && styles.containerSmall, style]}>
      <IconButton
        icon="minus"
        style={[styles.icons, isSmall && styles.iconsSmall]}
        iconColor={Colors.black.second}
        size={isSmall ? 15 : 20}
        onPress={() => handleChange(-1)}
      />
      <Text style={[styles.text, isSmall && styles.textSmall]}>{amount}</Text>
      <IconButton
        icon="plus"
        style={[styles.icons, isSmall && styles.iconsSmall]}
        iconColor={Colors.black.second}
        size={isSmall ? 15 : 20}
        onPress={() => handleChange(1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.black.fifth,
    alignItems: 'center',
    borderRadius: 50,
    minWidth: 100,
    justifyContent: 'space-between',
  },
  containerSmall: {
    minWidth: 80,
    justifyContent: 'center',
  },
  icons: {
    margin: 0,
  },
  iconsSmall: {
    marginHorizontal: 5,
  },
  text: {
    fontSize: 19,
    lineHeight: 27,
  },
  textSmall: {
    fontSize: 14
  },
});

export default NumberInput;
