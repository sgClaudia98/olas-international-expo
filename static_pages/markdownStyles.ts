import { Colors } from "@/styles";
import Fonts from "@/styles/fonts";
import { StyleSheet } from "react-native";

const markdownStyles = StyleSheet.create({
  body: {
    fontFamily: Fonts.regular,
  },
  heading1: {
    marginTop: 40,
    fontFamily: Fonts.bold,
    color: Colors.black.primary,
  },
  heading2: {
    marginTop: 60,
    marginBottom: 5,
    fontFamily: Fonts.bold,
    color: Colors.black.primary,
  },
  heading3: {
    fontFamily: Fonts.bold,
    color: Colors.black.primary,
  },
  heading4: {
    fontFamily: Fonts.bold,
    color: Colors.black.primary,
  },
  heading5: {
    fontFamily: Fonts.bold,
    color: Colors.black.primary,
  },
  heading6: {
    fontFamily: Fonts.bold,
    color: Colors.black.primary,
  },
  hr: {
    marginTop: 40,
    backgroundColor: Colors.black.fifth,
    height: 2,
  }
});

export default markdownStyles;
