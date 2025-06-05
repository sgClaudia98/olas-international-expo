import React from "react";
import { AmericanExpress, Mastercard, Paypal, Visa } from "@/components/icons";

export const paymentIcons: Record<string, JSX.Element[]> = {
  "CreditCard": [<Mastercard  width={20.95} height={12.95}/>, <Visa  width={31.72} height={10.26}/>, <AmericanExpress width={12.95} height={12.95}/>],
  "PayPal": [<Paypal width={10.52} height={12.95}/>]
};