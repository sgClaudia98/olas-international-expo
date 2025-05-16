import React, { FC, useEffect, useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Skeleton from "@/components/Skeleton";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";

type PaymentButtonsProps = {
  amount: number;
  orderId?: string;
  onSuccess: (details: any) => void;
};

const PaymentButtons: FC<PaymentButtonsProps> = ({ amount, orderId, onSuccess }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = (Math.round(amount * 100) / 100).toString();

  if (process.env.EXPO_PUBLIC_PAYPAL_CLIENT_ID === undefined) {
    console.error(
      "PayPal client ID is not defined. Please set the EXPO_PUBLIC_PAYPAL_CLIENT_ID environment variable."
    );
    return null;
  }

  if (isPending) {
    return <Skeleton width={"100%"} height={60} style={{}} />;
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    console.log("Amount:", roundedAmount, amount);
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: "USD",
            value: roundedAmount,
          },
        },
      ],
    });

    console.log("Transaction ID:", transactionId);

    return transactionId;
  };

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    const details = await actions.order.capture();
    if (!details) return;
    if (details.status === "COMPLETED") {
      console.log("Payment successful!");
      console.log("Transaction ID:", details.id);
      onSuccess(details);
    }
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={(err) => {
        console.error("Error during the payment process:", err);
      }}
    />
  );
};

export default PaymentButtons;
