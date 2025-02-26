import { ViewStyle, StyleSheet } from "react-native"

import * as Colors from "./colors"
import { hexToRgb } from "./utils"

type BorderRadius = "small" | "base" | "large" | "max"
export const borderRadius: Record<BorderRadius, number> = {
  small: 5,
  base: 10,
  large: 20,
  max: 9999,
}

type BorderWidth = "hairline" | "thin" | "base" | "thick"
export const borderWidth: Record<BorderWidth, number> = {
  hairline: StyleSheet.hairlineWidth,
  thin: 1,
  base: 2,
  thick: 3,
}

type Shadow = "base"
export const shadow: Record<Shadow, ViewStyle> = {
  base: {
    boxShadow:  `0px 3px 4.65px rgba(${hexToRgb(Colors.black.second)}, 0.27)`, 
    elevation: 6,
  },
}