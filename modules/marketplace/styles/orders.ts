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
    // justifyContent: "space-between",
  },
  informationBox: {
    flex: 2,
  },
  verticalSeparator: {
    borderWidth: 1,
    borderColor: Colors.black.third,
    marginHorizontal: 30,
  },
});

export const orderStyles = {
  mobile: StyleSheet.create({
    ...cardStyle.mobile,
    cardHeader: {
      ...cardStyle.mobile.cardHeader,
      paddingLeft: 30,
    },
    tableHeader: {
      ...desktop.tableHeader,
    },
    tableRow: {
      ...desktop.tableRow,
    },
    cardRow: {
      ...desktop.cardRow,
      flexDirection: 'column',
    },
    cardColumnLeft: {
      ...desktop.cardColumnLeft,
      width: '100%',
      gap: 10,
    },
    cardColumnRight: {
      ...desktop.cardColumnRight,
      width: '100%',
    },
    informationBoxesContainer: {
      ...desktop.informationBoxesContainer,
    },
    informationBox: {
      ...desktop.informationBox,
    },
    verticalSeparator: {
      ...desktop.verticalSeparator,
      marginVertical: 20,
      marginLeft: 20,
    },
  }),
  tablet: StyleSheet.create({
    ...cardStyle.tablet,
    cardHeader: {
      ...cardStyle.tablet.cardHeader,
      paddingLeft: 30,
    },
    tableHeader: {
      ...desktop.tableHeader,
    },
    tableRow: {
      ...desktop.tableRow,
    },
    cardRow: {
      ...desktop.cardRow,
      flexDirection: 'column',
      gap: 10,
    },
    cardColumnLeft: {
      ...desktop.cardColumnLeft,
      width: '100%',
    },
    cardColumnRight: {
      ...desktop.cardColumnRight,
      width: '100%',
    },
    informationBoxesContainer: {
      ...desktop.informationBoxesContainer,
      flexDirection: 'column',
    },
    informationBox: {
      ...desktop.informationBox,
      width: 'auto'
    },
    verticalSeparator: {
      ...desktop.verticalSeparator,
      marginVertical: 20,
      marginLeft: 20,
    },
  }),
  desktop: StyleSheet.create({
    ...cardStyle.desktop,
    cardHeader: {
      ...cardStyle.desktop.cardHeader,
      paddingLeft: 30,
    },
    cardContent: {
      ...cardStyle.desktop.cardContent,
      minHeight: 280,
      maxHeight: 500,
      flexWrap: 'wrap'
    },
    ...desktop,
  }),
};
