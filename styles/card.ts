import { Colors } from ".";
import { StyleSheet } from "react-native";

const baseStyle = {
    backgroundColor: Colors.white.default,
    borderRadius: 5,
    paddingHorizontal: 40,
    paddingVertical: 25
  }

const baseStyleMobile = {
    backgroundColor: Colors.white.default,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 20
  }

const desktop = StyleSheet.create({
  card: {
    gap: 10,
    width: "100%",
  },
  cardHeader: {
    ...baseStyle
  },
  cardHeaderText: {
    fontSize: 22,
    lineHeight: 24
  },
  cardContent: {
    ...baseStyle,
    paddingVertical: 40,
    paddingHorizontal: 30,
    gap: 10,
  },
  cardFooter: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const cardStyle = {
  mobile: StyleSheet.create({
    ...desktop,
    cardContent: {
      ...desktop.cardContent,
      ...baseStyleMobile,
    },
    cardHeader: {
      ...baseStyleMobile
    },
  }),
  tablet: StyleSheet.create({
    ...desktop
  }),
  desktop,
};
