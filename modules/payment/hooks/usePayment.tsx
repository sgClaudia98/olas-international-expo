// hooks/usePayment.ts
import { useState } from "react";
import { router } from "expo-router";
import {
  PaymentData,
  PaymentResponse,
  PaymentResponseData,
} from "../types/payment";
import {
  hasPaymentMethod,
  PaymentMethod,
} from "../utils/paymentMethods";
import { parametersPayment } from "../utils/mapParameters";
import { usePayBookingMutation } from "@/modules/marketplace/services/api/BookingService";

interface UsePaymentOptions {
  onPreResponse?: (data: PaymentResponseData) => void;
  onSuccess?: (response: PaymentResponse) => void;
  onError?: (error: string) => void;
}

export const usePayment = (options: UsePaymentOptions = {}) => {
  const [error, setError] = useState<string | null>(null);
  
  // Use the Redux mutation
  const [payBookingMutation, { isLoading }] = usePayBookingMutation();

  const processPayment = async (
    paymentMethod: string,
    paymentData: PaymentData
  ): Promise<PaymentResponse> => {
    setError(null);

    try {
      console.debug("Processing payment", { paymentMethod, paymentData });
      
      if (!hasPaymentMethod(paymentMethod)) {
        throw new Error("Payment method is not supported");
      }

      // Use the Redux mutation instead of fetch
      const paymentResult = await payBookingMutation({
        ...paymentData,
        paymentMethod: paymentMethod,
        parameters: parametersPayment(
          paymentMethod as PaymentMethod,
          paymentData
        ),
      }).unwrap(); // unwrap() throws on API errors

      // Call preResponse callback with the real reference from the API
      const preResponseData = {
        reference: paymentResult.paymentTransactionReference,
        paymentMethod: paymentMethod,
      };

      options.onPreResponse?.(preResponseData);

      const successResponse: PaymentResponse = {
        success: true,
        data: {
          reference: paymentResult.paymentTransactionReference,
          paymentMethod: paymentMethod,
        },
      };

      options.onSuccess?.(successResponse);

      // Handle redirect for payment authorization (like PayPal, Stripe, etc.)
      if (paymentResult.completePaymentTransactionAuthorization) {
        router.push(paymentResult.completePaymentTransactionAuthorizationUrl);
      } else if (paymentResult.completePaymentTransactionAuthorizationUrl) {
        router.push(paymentResult.completePaymentTransactionAuthorizationUrl);
      }

      return successResponse;

    } catch (error: any) {
      const errorMessage = error.message || error.data?.message || "Payment processing failed";
      console.error("Payment error:", error);

      setError(errorMessage);
      options.onError?.(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  return {
    processPayment,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};