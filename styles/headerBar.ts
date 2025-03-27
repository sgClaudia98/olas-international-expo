import { StyleSheet } from "react-native";

const styles = {
  mobile: StyleSheet.create({
    menuContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      backgroundColor: "#ffffff",
      paddingHorizontal: 10,
      paddingVertical: 0,
    },
    menuItem: {
      marginHorizontal: 10,
      paddingVertical: 5,
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },
    activeMenuItem: {
      borderBottomColor: "#007BFF",
    },
    menuText: {
      fontSize: 16,
    },
    activeMenuText: {
      fontWeight: "bold",
      color: "#007BFF",
    },
  }),
  tablet: StyleSheet.create({
    menuContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#ffffff",
      paddingHorizontal: 10,
      paddingVertical: 23,
      marginLeft: 40,
    },
    menuItem: {
      marginHorizontal: 10,
      paddingVertical: 5,
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },
    activeMenuItem: {
      borderBottomColor: "#007BFF",
    },
    menuText: {
      fontSize: 16,
    },
    activeMenuText: {
      fontWeight: "bold",
      color: "#007BFF",
    },
  }),
};

export default styles;
