import React, { useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PaymentButtons = ({ amount }) => {
  return (
    <PayPalScriptProvider options={{ clientId: "test" }}>
      <PayPalButtons
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log("Transaction completed by " + order.payer.name.given_name);
        }}
        onError={(err) => {
          console.error("Error during the payment process:", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaymentButtons;
