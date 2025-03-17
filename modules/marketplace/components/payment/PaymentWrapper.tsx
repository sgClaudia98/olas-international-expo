import React from "react";
import PaymentForm from "./PaymentForm";
import { useLocationContext } from "@/contexts/locationContext";

interface PaymentWrapperProps {
  onClose: () => void;
}

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({ onClose }) => {
  const { activeDestination, destinationCountry } = useLocationContext();

  if (!activeDestination) {
    alert("Necesitas seleccionar una localidad.");
    onClose();
    return;
  }

  return (
    <PaymentForm
      destinationCountry={destinationCountry?.code}
      province={activeDestination.name}
      onClose={onClose}
    />
  );
};

export default PaymentWrapper;
