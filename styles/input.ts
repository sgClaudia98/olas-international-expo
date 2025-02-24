import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import * as Colors from "./colors";

export const inputStyles = StyleSheet.create({
  // Base container style for the input
  container: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center", 
    minWidth: 280, 
  } as ViewStyle,

  // States
  inactive: {
    borderColor: Colors.black.third,
    backgroundColor: Colors.white.default,
  } as ViewStyle,

  typing: {
    borderColor: Colors.blue.primary,
    backgroundColor: Colors.white.default,
  } as ViewStyle,

  filled: {
    borderColor: Colors.black.third,
    backgroundColor: Colors.white.default,
  } as ViewStyle,

  blocked: {
    borderColor: Colors.black.fourth,
    backgroundColor: Colors.black.fourth,
  } as ViewStyle,

  error: {
    borderColor: Colors.red.primary,
    backgroundColor: Colors.white.default,
  } as ViewStyle,

  // Text styles
  text: {
    fontSize: 16,
    flex: 1,
  } as TextStyle,

  textInactive: {
    color: Colors.black.second,
  } as TextStyle,

  textTyping: {
    color: Colors.blue.second,
    borderColor: "transparent",
  } as TextStyle,

  textFilled: {
    color: Colors.black.primary,
  } as TextStyle,

  textBlocked: {
    color: Colors.black.second,
  } as TextStyle,
});


export const inputHeight = {
    height: 40,
    minHeight: 40,
    widht: "100%"
  }

export const inputStyle = {
  ...inputHeight,
  lineHeight: 1,
}