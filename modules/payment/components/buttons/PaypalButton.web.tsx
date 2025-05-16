import React, { useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Skeleton from "@/components/Skeleton";

const PaymentButtons = ({ amount }) => {
  const [{isPending}] = usePayPalScriptReducer(); 

  if (process.env.EXPO_PUBLIC_PAYPAL_CLIENT_ID === undefined) {
    console.error(
      "PayPal client ID is not defined. Please set the EXPO_PUBLIC_PAYPAL_CLIENT_ID environment variable."
    );
    return null;
  }

  if (isPending) {
    return <Skeleton width={"100%"} height={50} style={{}} />
  }

  return (
    <PayPalScriptProvider options={{ clientId: process.env.EXPO_PUBLIC_PAYPAL_CLIENT_ID }}>
      
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log(
            "Transaction completed by " + order.payer.name.given_name
          );
        }}
        onError={(err) => {
          console.error("Error during the payment process:", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaymentButtons;
