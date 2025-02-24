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
import {View, ViewStyle} from 'react-native';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: IconSource;
  iconRight?: boolean;
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
        theme={{colors}}
        onPress={onPress}
        icon={icon}
        mode={mode}
        disabled={disabled}
        style={getContainerStyleV2(variant)}
        labelStyle={getTextStyleV2()}
        contentStyle={getButtonStyleV2(size, iconRight ? reverse : undefined)}>
        {title}
      </Button>
    </View>
  );
};

export default Btn;
