import { StyleSheet } from "react-native";
const desktopStyles = StyleSheet.create({

  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 23,
    marginLeft: 40,
  },
  menuItem: {
    marginHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  menuText: {
    fontSize: 16,
  },
})
const styles = {
  mobile: StyleSheet.create({
    ...desktopStyles,
    menuContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      paddingVertical: 0,
      marginLeft: 0,
    },
  }),
  tablet: desktopStyles,
};

export default styles;
