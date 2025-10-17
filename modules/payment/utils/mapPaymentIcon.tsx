import React from "react";
import { AmericanExpress, Mastercard, Paypal, PayPalBig, Visa } from "@/components/icons";

type IconComponent = React.ComponentType<any>;

export const paymentIcons: Record<string, IconComponent[]> = {
  "CreditCard": [
    () => <Mastercard width={20.95} height={12.95} />,
    () => <Visa width={31.72} height={10.26} />,
    () => <AmericanExpress width={12.95} height={12.95} />
  ],
  "PayPal": [() => <PayPalBig height={20}/>]
};