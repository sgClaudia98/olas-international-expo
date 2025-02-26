import typography from "@/styles/typography";
import { StyleSheet } from "react-native";

const cartStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(8, 51, 102, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  cartContent: {
    position: "absolute",
    top: 40,
    bottom: 40,
    right: 25,
    width: "25%",
    backgroundColor: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 15,
    padding: 20,
  },
  cartTitle: {
    ...typography.h3,
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  closeText: {
    fontSize: 24,
    color: "#333",
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
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
    marginTop: 10,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(8, 51, 102, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "50%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  closeModalButton: {
    position: "absolute",
    right: 0,
    top: 20,
    backgroundColor: "transparent",
  },
});

export { cartStyles };
