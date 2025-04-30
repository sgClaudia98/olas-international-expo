import React, { FC, useState } from "react";
import { View, Button, Modal } from "react-native";
import { WebView } from "react-native-webview";
import GenericCheckoutButton from "./GenericCheckoutButton";

const PayPalCardButton = ({
  checkoutUrl,
  onSuccess,
  onCancel,
}) => {

  const handleOnSuccess = (url) => {
    console.log("Card Success");
    onSuccess?.(url);
  };

  const handleOnCancel = (url) => {
    console.log("Card Cancel");
    onCancel?.(url);
  };

  return (
    <GenericCheckoutButton
    checkoutUrl={checkoutUrl}
    label="Pagar con Tarjeta"
    //logo={cardLogo}
    onSuccess={handleOnSuccess}
    onCancel={handleOnCancel}
  />
  );
};

export default PayPalCardButton;
