import React, { useState } from "react";
import { View, Button, Modal } from "react-native";
import { WebView } from "react-native-webview";
import GenericCheckoutButton from "./GenericCheckoutButton";

const PayPalButton = ({ checkoutUrl, onSuccess, onCancel }) => {
  const handleOnSuccess = (url) => {
    console.log("PayPal Success");
    onSuccess?.(url);
  };

  const handleOnCancel = (url) => {
    console.log("PayPal Cancel");
    onCancel?.(url);
  };

  return (
    <GenericCheckoutButton
      checkoutUrl={checkoutUrl}
      label="Pagar con PayPal"
      //logo={paypalLogo}
      onSuccess={handleOnSuccess}
      onCancel={handleOnCancel}
    />
  );
};

export default PayPalButton;
