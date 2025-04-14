import React, {useState} from 'react';
import {
  ButtonSize,
  ButtonVariant,
  getButtonStyleV2,
  getContainerStyleV2,
  getTextStyleV2,
} from '@/styles/buttons';
import {Button, useTheme} from 'react-native-paper';
import {Colors} from '@/styles';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import theme from '@/styles/paperTheme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: IconSource;
  iconRight?: boolean;
  style?: TextStyle;
}

const Btn: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconRight,
  style = {},
}) => {
  const mode = variant == 'primary' ? 'contained' : 'outlined';
  const colors = {
    primary: Colors.blue.second,
    outline: Colors.blue.second,
    onSurfaceDisabled: variant == 'primary' ? Colors.white.default : Colors.black.third,
  };
  const reverse: ViewStyle = {
    flexDirection: 'row-reverse',
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 'auto',
      }}>
      <Button
        theme={{...theme, colors: {...theme.colors,...colors}}}
        onPress={onPress}
        icon={icon}
        mode={mode}
        disabled={disabled}
        style={getContainerStyleV2(variant)}
        labelStyle={StyleSheet.flatten([getTextStyleV2(), style])}
        contentStyle={getButtonStyleV2(size, iconRight ? reverse : undefined)}>
        {title}
      </Button>
    </View>
  );
};

export default Btn;
