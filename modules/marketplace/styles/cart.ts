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
    borderRadius: 15,
    padding: 20,
  },
  cartTitle: {
    ...typography.h3,
    paddingBottom: 20,
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

const cartStyles = {
  mobile: StyleSheet.create({
    overlay: {
      ...desktop.overlay,
    },
    cartContent: {
      ...desktop.cartContent,
      width: "80%",
    },
    cartTitle: {
      ...desktop.cartTitle,
    },
    closeButton: {
      ...desktop.closeButton,
    },
    scrollViewContent: {
      ...desktop.scrollViewContent,
    },
    cartItems: {
      ...desktop.cartItems,
    },
    cartItem: {
      ...desktop.cartItem,
    },
    itemImage: {
      ...desktop.itemImage,
    },
    itemDetails: {
      ...desktop.itemDetails,
    },
    itemName: {
      ...desktop.itemName,
    },
    itemPrice: {
      ...desktop.itemPrice,
    },
    itemQuantity: {
      ...desktop.itemQuantity,
    },
    cartFooter: {
      ...desktop.cartFooter,
    },
    totalText: {
      ...desktop.totalText,
    },
  }),
  tablet: StyleSheet.create({
    overlay: {
      ...desktop.overlay,
    },
    cartContent: {
      ...desktop.cartContent,
    },
    cartTitle: {
      ...typography.h3,
      marginBottom: 20,
    },
    closeButton: {
      ...desktop.closeButton,
    },
    scrollViewContent: {
      ...desktop.scrollViewContent,
    },
    cartItems: {
      ...desktop.cartItems,
    },
    cartItem: {
      ...desktop.cartItem,
    },
    itemImage: {
      ...desktop.itemImage,
    },
    itemDetails: {
      ...desktop.itemDetails,
    },
    itemName: {
      ...desktop.itemName,
    },
    itemPrice: {
      ...desktop.itemPrice,
    },
    itemQuantity: {
      ...desktop.itemQuantity,
    },
    cartFooter: {
      ...desktop.cartFooter,
    },
    totalText: {
      ...desktop.totalText,
    },
  }),
  desktop: StyleSheet.create({
    ...desktop,
  }),
};

export { cartStyles };
