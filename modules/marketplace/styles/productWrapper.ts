import { Colors } from "@/styles";
import { layout } from "@/styles/sizing";
import typography from "@/styles/typography";
import { StyleSheet, ViewStyle } from "react-native";

const styles = {
  mobile: StyleSheet.create({
    productsQtyText: {
      ...typography.label,
      color: Colors.black.primary,
      marginRight: 15,
    },
    wrapper: {
      flex: 1,
      flexDirection: "row",
    },
    products: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 10,
    },
    productOpen: {
      width: "48%",
      padding: 12,
    },
    productClose: {
      width: "40%",
      padding: 12,
    },
  }),
  tablet: StyleSheet.create({
    productsQtyText: {
      ...typography.label,
      color: Colors.black.primary,
      marginRight: 15,
    },
    wrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    products: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      padding: 10,
      marginHorizontal: -12,
      marginTop: -12,
    },
    productOpen: {
      width: "45%",
      padding: 12,
    },
    productClose: {
      width: "30%",
      padding: 12,
    },
  }),
  desktop: StyleSheet.create({
    productsQtyText: {
      ...typography.label,
      color: Colors.black.primary,
      marginRight: 15,
    },
    wrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 20,
      minHeight: 'auto'
    },
    products: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "wrap",
      padding: 10,
      marginHorizontal: -12,
      marginTop: -12,
      rowGap: 80,
    },
    productOpen: {
      width: "25%",
      minHeight: 400,
      padding: 12,
    },
    productClose: {
      width: "20%",
      minHeight: 400,
      padding: 12,
    },
  }),
};
export default styles;
