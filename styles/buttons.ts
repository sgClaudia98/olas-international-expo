import { StyleSheet, ViewStyle, TextStyle, PressableStateCallbackType, View } from "react-native";

import * as Colors from "./colors"
import { borderWidth } from "./outlines";
import Fonts from "./fonts";

export type ButtonVariant = "primary" | "secondary"
export type ButtonSize = "large" | "medium" | "small"
const horizontalMargin = 24
// Base styles for button
const baseButtonStyle: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 50,
  margin: 0,
};
// Estilos dinámicos según el tamaño
const sizeStyles: Record<ButtonSize, ViewStyle> = {
    large: {
      paddingVertical: 17,
      paddingHorizontal: 50-horizontalMargin,
    },
    medium: {
      paddingVertical: 13,
      paddingHorizontal: 36-horizontalMargin,
    },
    small: {
      paddingVertical: 8,
      paddingHorizontal: 26-horizontalMargin,
    },
  };


// Base styles for text
export const baseTextStyle: TextStyle = {
  textAlign: "center",
  fontSize: 16,
  alignSelf: "flex-start",
  marginVertical: 0,
  fontFamily: Fonts.regular
};
  
// Base styles for text
const baseTextStyleBold: TextStyle = {
 ...baseTextStyle,
  fontFamily: Fonts.bold
};

export const selectTextStyle: TextStyle = {
  ...baseTextStyle,
  height: 24,
  lineHeight: 24,
  fontSize: 16,
  fontWeight: 400,
  overflow: "hidden"
}
export const selectSizeStyle: ViewStyle = {
  paddingVertical: 5,
  paddingHorizontal: 20-horizontalMargin,
}
export const selectRightSizeStyle: ViewStyle = {
  ...selectSizeStyle,
  flexDirection: 'row-reverse',
}


// Dynamic styles for button
const variantStyles = {
  primary: (disabled: boolean, pressed: boolean): ViewStyle => ({
    backgroundColor: disabled ? Colors.black.third :  pressed ? Colors.blue.second: Colors.blue.primary,
  }),
  secondary: (disabled: boolean, pressed: boolean): ViewStyle => ({
    backgroundColor: disabled ? Colors.transparent.clear :  pressed ? Colors.blue.second : Colors.transparent.clear,
    borderWidth: 1,
    borderColor: disabled ? Colors.black.third :  pressed ? Colors.blue.second: Colors.blue.primary,
  }),
};

// Dynamic styles for text
const textVariantStyles = {
  primary: (disabled: boolean, pressed: boolean): TextStyle => ({
    color: Colors.white.default, 
  }),
  secondary: (disabled: boolean, pressed: boolean): TextStyle => ({
    color: disabled ? Colors.black.third : pressed ? Colors.white.default : Colors.blue.primary,
  }),
};

// Función para obtener estilos dinámicos de botones
export const getButtonStyle = (
  variant: ButtonVariant,
  size: ButtonSize,
  state: PressableStateCallbackType,
  disabled: boolean
): ViewStyle => {
  const { pressed } = state;
  return StyleSheet.flatten([
    baseButtonStyle,
    sizeStyles[size],
    variantStyles[variant](disabled, pressed),
  ]);
};



export const getButtonStyleV2 = (
  size: ButtonSize,
  style?: ViewStyle,
): ViewStyle => {
  return StyleSheet.flatten([
    baseButtonStyle,
    sizeStyles[size],
    style,
  ]);
};
// Función para obtener estilos dinámicos del texto
export const getTextStyle = (
  variant: ButtonVariant,
  state: PressableStateCallbackType,
  disabled: boolean
): TextStyle => {
  const { pressed } = state;
  return StyleSheet.flatten([
    baseTextStyleBold,
    textVariantStyles[variant](disabled, pressed),
  ]);
};

export const getTextStyleV2 = (): TextStyle => {
  return StyleSheet.flatten([
    baseTextStyleBold,
  ]);
};


const containerStyle: ViewStyle = {
  width: "auto",
  borderRadius: 50
}

const containerBorderStyle: ViewStyle = {
  borderWidth: 2,
  ...containerStyle
}

export const getContainerStyleV2 = (variant: ButtonVariant): ViewStyle => {
  return StyleSheet.flatten([
    variant == "primary" ? containerStyle : containerBorderStyle
  ])
}