import { StyleSheet } from "react-native";
import { cardStyle } from "@/styles/card";
import { Colors } from "@/styles";

const desktop = StyleSheet.create({
  tableHeader: {
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  tableRow: {
    borderBottomColor: Colors.black.third,
    paddingHorizontal: 0,
    paddingBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  cardColumnLeft: {
    width: "75%",
  },
  cardColumnRight: {
    width: "25%",
  },
});

export const orderStyles = {
  mobile: StyleSheet.create({
    ...cardStyle.mobile,
    tableHeader: {
      ...desktop.tableHeader,
    },
    tableRow: {
      ...desktop.tableRow,
    },
    cardRow: {
      ...desktop.cardRow,
    },
    cardColumnLeft: {
      ...desktop.cardColumnLeft,
    },
    cardColumnRight: {
      ...desktop.cardColumnRight,
    },
  }),
  tablet: StyleSheet.create({
    ...cardStyle.tablet,
    tableHeader: {
      ...desktop.tableHeader,
    },
    tableRow: {
      ...desktop.tableRow,
    },
    cardRow: {
      ...desktop.cardRow,
    },
    cardColumnLeft: {
      ...desktop.cardColumnLeft,
    },
    cardColumnRight: {
      ...desktop.cardColumnRight,
    },
  }),
  desktop: StyleSheet.create({
    ...cardStyle.desktop,
    ...desktop,
  }),
};
