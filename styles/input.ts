import { StyleSheet, TextStyle, ViewStyle } from "react-native";
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
  },

  // States
  inactive: {
    borderColor: Colors.black.third,
    backgroundColor: Colors.white.default,
  },

  typing: {
    borderColor: Colors.blue.primary,
    backgroundColor: Colors.white.default,
  },

  filled: {
    borderColor: Colors.black.third,
    backgroundColor: Colors.white.default,
  },

  blocked: {
    borderColor: Colors.black.fourth,
    backgroundColor: Colors.black.fourth,
  },

  error: {
    borderColor: Colors.red.primary,
    backgroundColor: Colors.white.default,
  },

  // Text styles
  text: {
    fontSize: 16,
    flex: 1,
  } ,

  textInactive: {
    color: Colors.black.second,
  } ,

  textTyping: {
    color: Colors.blue.second,
    borderColor: "transparent",
  } ,

  textFilled: {
    color: Colors.black.primary,
  } ,

  textBlocked: {
    color: Colors.black.second,
  } ,
});

export const inputHeight = {
  height: 40,
  minHeight: 40,
  widht: "100%",
};

export const inputStyle = {
  ...inputHeight,
  lineHeight: 1,
};
