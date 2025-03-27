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
    gap: 10
  },
  cardColumnLeft: {
    flex: 1.7
  },
  cardColumnRight: {
    flex: 1
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
  resumeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
    lineHeight: 25,
  },
  resumeTotal: {
    marginTop: 29,
    width: "100%",
    backgroundColor: Colors.black.fifth,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "center"
  }
});

export const orderStyles = {
  mobile: StyleSheet.create({
    ...cardStyle.mobile,
    ...desktop,
    cardHeader: {
      ...cardStyle.mobile.cardHeader,
      paddingLeft: 30,
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
    verticalSeparator: {
      ...desktop.verticalSeparator,
      marginVertical: 20,
      marginLeft: 20,
    },
  }),
  tablet: StyleSheet.create({
    ...cardStyle.tablet,
    ...desktop,
    cardHeader: {
      ...cardStyle.tablet.cardHeader,
      paddingLeft: 30,
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
