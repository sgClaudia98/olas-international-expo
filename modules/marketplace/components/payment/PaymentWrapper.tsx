import React from "react";
import PaymentForm from "./PaymentForm";
import { useLocationContext } from "@/contexts/locationContext";
import { useShoppingCart } from "../../context/ShoppingCartContext";

interface PaymentWrapperProps {
  onClose: () => void;
}

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({ onClose }) => {
  const { activeDestination, destinationCountry } = useLocationContext();
  const { refreshCart } = useShoppingCart();
  if (!activeDestination) {
    alert("Necesitas seleccionar una localidad.");
    onClose();
    return;
  }

  const handleClose = () => {
    refreshCart();
    onClose();
  };

  return (
    <PaymentForm
      destinationCountry={destinationCountry?.code}
      province={activeDestination.name}
      onClose={handleClose}
    />
  );
};

export default PaymentWrapper;
