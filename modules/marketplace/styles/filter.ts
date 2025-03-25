import { Colors } from "@/styles";
import { layout } from "@/styles/sizing";
import { StyleSheet } from "react-native";

const styles = {
  mobile: StyleSheet.create({
    filters: {
      paddingHorizontal: 20,
      paddingVertical: 10,
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
      borderRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 10,
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
