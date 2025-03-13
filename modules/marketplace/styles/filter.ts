import { Colors } from "@/styles";
import { layout } from "@/styles/sizing";
import { StyleSheet } from "react-native";

const styles = {
  mobile: StyleSheet.create({
    filters: {
      padding: 20,
      gap: 5,
    },
    filterHeader: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 10,
    },
  }),
  tablet: StyleSheet.create({
    filters: {
      backgroundColor: Colors.black.fifth,
      borderRadius: 8,
      padding: 20,
      width: 225, // Fixed width for left panel
      gap: 5,
      alignSelf: 'stretch',
    },
    filterHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
  }),
  desktop: StyleSheet.create({
    filters: {
      backgroundColor: Colors.black.fifth,
      borderRadius: 8,
      padding: 20,
      width: 225, // Fixed width for left panel
      gap: 5,
      alignSelf: 'stretch',
    },
    filterHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
  }),
};
export default styles;
