import React, { useEffect, useState } from "react";
import { View } from "react-native";
import PayPalButton from "./buttons/PayPalButton";
import PayPalCardButton from "./buttons/PayPalCardButton";

const PaymentButtons = ({ amount }) => {
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [cardUrl, setCardUrl] = useState(null);

  useEffect(() => {
    const fetchUrls = async () => {
      //const res = await fetch("https://tu-backend.com/create-paypal-order", {
      //  method: "POST",
      //  headers: { "Content-Type": "application/json" },
      //  body: JSON.stringify({ amount }),
      //});
      //const data = await res.json();
      //const baseUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${data.orderId}`;
      const baseUrl = `https://www.sandbox.paypal.com/checkoutnow?token=123`;

      setPaypalUrl(baseUrl);
      setCardUrl(`${baseUrl}&fundingSource=card`);
    };

    fetchUrls();
  }, [amount]);

  return (
    <View>
      <PayPalButton
        checkoutUrl={paypalUrl}
        onSuccess={() => console.log("Pago PayPal exitoso")}
        onCancel={() => console.log("Pago PayPal cancelado")}
      />
      <View style={{ height: 16 }} />
      <PayPalCardButton
        checkoutUrl={cardUrl}
        onSuccess={() => console.log("Pago con tarjeta exitoso")}
        onCancel={() => console.log("Pago con tarjeta cancelado")}
      />
    </View>
  );
};

export default PaymentButtons;
