import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import { PaymentProvider } from "./PaymentProvider";
interface PaymentProvidersProps {
  children: React.ReactNode;
}

export const PaymentProviders: React.FC<PaymentProvidersProps> = ({
  children,
}) => {
  return (
    <PaymentProvider>
      <PayPalScriptProvider
        options={{ clientId: process.env.EXPO_PUBLIC_PAYPAL_CLIENT_ID }}
      >
        {children}
      </PayPalScriptProvider>
    </PaymentProvider>
  );
};
