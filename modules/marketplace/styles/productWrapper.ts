import { Colors } from "@/styles";
import { layout } from "@/styles/sizing";
import typography from "@/styles/typography";
import { StyleSheet, ViewStyle } from "react-native";
import { PROD_IMAGE_SIZE } from "./product";

const desktop = StyleSheet.create({
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
    minHeight: "auto",
  },
  products: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    padding: 10,
    marginHorizontal: -12.5,
    gap: 25,
  },
  productOpen: {
    width: "30%",
    minWidth: PROD_IMAGE_SIZE.tablet
  },
  productClose: {
    width: "25%",
    minWidth: PROD_IMAGE_SIZE.tablet 
  },
  filterActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  filterActionContainer: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 10,
  },
});

const styles = {
  mobile: StyleSheet.create({
    ...desktop,
    productsQtyText: {
      ...desktop.productsQtyText,
      marginRight: 0,
    },
    wrapper: {
      ...desktop.wrapper,
      gap: 0,
      rowGap: 0,
    },
    products: {
      ...desktop.products,
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 16,
    },
    productOpen: {
      width: "auto",
      flexGrow: 1,
      flexShrink: 1, 
      minWidth: PROD_IMAGE_SIZE.mobile
    },
    productClose: {
      width: "auto",
      flexGrow: 1,
      flexShrink: 1, 
      minWidth: PROD_IMAGE_SIZE.mobile
    },

    filterActions: {
      ...desktop.filterActions,
      justifyContent: "space-between",
      width: "100%",
      marginTop: 10,
    },
    filterActionContainer: {
      ...desktop.filterActionContainer,
      padding: 21,
      marginBottom: 20,
    },
  }),
  tablet: StyleSheet.create({
    ...desktop,
    products: {
      ...desktop.products,
      gap: 20,
    },
    productOpen: {
      ...desktop.productOpen,
      width: "45%",
    },
    productClose: {
      ...desktop.productClose,
      width: "30%",
    },
  }),
  desktop,
  bigDesktop: StyleSheet.create({
    ...desktop,
    productOpen: {
      ...desktop.productOpen,
      width: "25%",
    },
    productClose: {
      ...desktop.productClose,
      width: "20%",
    },
  })
};
export default styles;
