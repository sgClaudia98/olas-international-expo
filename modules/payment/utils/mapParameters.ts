import { PaymentData } from "../types/payment";
import { PaymentMethod } from "./paymentMethods";

export const parametersPayment = (pm: PaymentMethod, data: PaymentData) => {
  switch (pm) {
    case "PayPal":
      return {
        return_url: `${process.env.EXPO_PUBLIC_API_URL}/profile/order-history/${data.bookingId}?paymentSuccess=true`,
        cancel_url: `${process.env.EXPO_PUBLIC_API_URL}/profile/order-history/${data.bookingId}?paymentSuccess=false`,
      };
    default:
      return {
        return_url: `${process.env.EXPO_PUBLIC_API_URL}/profile/order-history/${data.bookingId}?paymentSuccess=true`,
        cancel_url: `${process.env.EXPO_PUBLIC_API_URL}/profile/order-history/${data.bookingId}?paymentSuccess=false`,
      };
  }
};
