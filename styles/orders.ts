import { StyleSheet } from "react-native";
import { cardStyle } from "./card";
import { Colors } from ".";

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
  }),
  tablet: StyleSheet.create({
    ...cardStyle.tablet,
    tableHeader: {
      ...desktop.tableHeader,
    },
    tableRow: {
      ...desktop.tableRow,
    },
  }),
  desktop: StyleSheet.create({
    ...cardStyle.desktop,
    ...desktop,
  }),
};
