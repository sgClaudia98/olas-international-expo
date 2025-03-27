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
    justifyContent: "space-between",
    width: "100%",
  },
  cardColumnLeft: {
    width: "70%",
  },
  cardColumnRight: {
    width: "29%",
  },
  informationBoxesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  informationBox: {
    width: "48%",
  },
  verticalSeparator: {
    borderWidth: 1,
    borderColor: Colors.black.third,
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
    informationBoxesContainer: {
      ...desktop.informationBoxesContainer,
    },
    informationBox: {
      ...desktop.informationBox,
    },
    verticalSeparator: {
      ...desktop.verticalSeparator,
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
    informationBoxesContainer: {
      ...desktop.informationBoxesContainer,
    },
    informationBox: {
      ...desktop.informationBox,
    },
    verticalSeparator: {
      ...desktop.verticalSeparator,
    },
  }),
  desktop: StyleSheet.create({
    ...cardStyle.desktop,
    cardContent: {
      ...cardStyle.desktop.cardContent,
      minHeight: 250
    },
    ...desktop,
  }),
};
