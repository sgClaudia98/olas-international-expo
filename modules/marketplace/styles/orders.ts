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
    justifyContent: "space-between",
  },
  informationBox: {
    width: "48%",
  },
  verticalSeparator: {
    borderWidth: 1,
    borderColor: Colors.black.third,
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
  }),
  tablet: StyleSheet.create({
    ...cardStyle.tablet,
    ...desktop
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
