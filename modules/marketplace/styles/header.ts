import { StyleSheet, ViewStyle } from "react-native";
import headerStyles from "@/styles/header";
const leftDesktopStyles = StyleSheet.create({
  ...headerStyles.desktop,
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 13
  },
  dropdownText: {
    fontSize: 14,
    marginRight: 5,
    color: "#000",
  },
  searchBar: {
    alignItems: "flex-start",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
  },
});

export const leftStyles = {
  mobile: StyleSheet.create({
    ...leftDesktopStyles,
    ...headerStyles.mobile,
    topSection: {
      ...leftDesktopStyles.topSection,
      flexDirection: "column-reverse",
      alignItems: "flex-start",
      marginTop: 13,
      paddingVertical: 5,
      gap: 5,
    },
    searchBar: {
      ...leftDesktopStyles.searchBar,
      marginHorizontal: 0,
      width: "100%",
    },
  }),
  tablet: StyleSheet.create({
    ...leftDesktopStyles,
    ...headerStyles.tablet,
  }),
  desktop: leftDesktopStyles,
};

const rightDesktopStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  badge: {
    position: "absolute",
    top: -10,
    right: -12,
  }
})

export const rightStyles = {
  mobile: StyleSheet.create({
    ...rightDesktopStyles,
    ...headerStyles.mobile,
  }),
  tablet: StyleSheet.create({
    ...rightDesktopStyles,
      ...headerStyles.tablet
  }),
  desktop: StyleSheet.create({
    ...rightDesktopStyles,
      ...headerStyles.desktop
  }),
};
