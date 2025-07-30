import { data } from "@/modules/marketplace/data/categories";
import { PaymentData } from "../types/payment";
import { PaymentMethod } from "./paymentMethods";

const getUrl = () => {
  return process.env.NODE_ENV == "production"
    ? process.env.EXPO_PUBLIC_API_URL
    : "http://localhost:3000";
};

export const parametersPayment = (pm: PaymentMethod, data: PaymentData) => {
  switch (pm) {
    case "PayPal":
      return {
        return_url: `${getUrl()}/profile/order-history/${data.bookingId}?paymentSuccess=true`,
        cancel_url: `${getUrl()}/profile/order-history/${data.bookingId}?paymentSuccess=false`,
      };
    default:
      return {
        return_url: `${getUrl()}/profile/order-history/${data.bookingId}?paymentSuccess=true`,
        cancel_url: `${getUrl()}/profile/order-history/${data.bookingId}?paymentSuccess=false`,
      };
  }
};
