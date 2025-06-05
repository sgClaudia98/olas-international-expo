import { Colors } from "@/styles";
import typography from "@/styles/typography";
import { StyleSheet } from "react-native";

const desktop = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(8, 51, 102, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  cartContent: {
    position: "absolute",
    top: 40,
    bottom: 40,
    right: 25,
    width: 350,
    backgroundColor: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    padding: 20,
    paddingBottom: 40,
  },
  cartTitle: {
    fontSize: 22,
    lineHeight: 26,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black.fourth,
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 30,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  cartItems: {
    flexGrow: 1,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#777",
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartFooter: {
    // borderTopWidth: 1,
    // borderTopColor: "#ddd",
    paddingTop: 10,
    marginTop: 10,
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 17,
  },
  totalPrice: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 10,
  },
  productsText: {
    fontSize: 14,
    color: Colors.black.second,
    marginBottom: 2,
    lineHeight: 24,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  }
});

const cartStyles = {
  mobile: StyleSheet.create({
      ...desktop,
    cartContent: {
      ...desktop.cartContent,
      width: "80%",
    },
    
  }),
  tablet: StyleSheet.create({
    
      ...desktop,
    cartTitle: {
      ...typography.h3,
      marginBottom: 20,
    },
    
  }),
  desktop: StyleSheet.create({
    ...desktop,
  }),
};

export { cartStyles };
