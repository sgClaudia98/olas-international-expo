/// methods/paymentMethods.ts
export interface PaymentMethodInfo {
  name: string;
  fee: number;
  icon?: string;
  description?: string;
}

export type PaymentMethod =  "PayPal" | "Stripe" | "ApplePay" | "GooglePay";

export const paymentMethodsRecord: Record<PaymentMethod, PaymentMethodInfo> = {
  PayPal: {
    name: "PayPal",
    fee: 0,
    icon: "paypal-icon",
    description: "Pay securely with your PayPal account",
  },
  Stripe: {
    name: "Credit Card",
    fee: 2.9,
    icon: "credit-card-icon",
    description: "Pay with Visa, Mastercard, or American Express",
  },
  ApplePay: {
    name: "Apple Pay",
    fee: 0,
    icon: "apple-pay-icon",
    description: "Pay quickly with Touch ID or Face ID",
  },
  GooglePay: {
    name: "Google Pay",
    fee: 0,
    icon: "google-pay-icon",
    description: "Pay quickly with your Google account",
  },
} as const;

// Helper function to get available payment methods by IDs
export const getAvailablePaymentMethods = (availableIds: string[]) => {
  return availableIds
    .map((id) => {
      const method = paymentMethodsRecord[id];
      return method ? { id, ...method } : null;
    })
    .filter((method): method is { id: string } & PaymentMethodInfo => method !== null);
};

// Helper function to get a single payment method
export const getPaymentMethod = (id: string): (PaymentMethodInfo & { id: string }) | null => {
  const method = paymentMethodsRecord[id];
  return method ? { id, ...method } : null;
};

// Get all available payment method IDs
export const getAllPaymentMethodIds = (): string[] => {
  return Object.keys(paymentMethodsRecord);
};

// Check if a payment method exists
export const hasPaymentMethod = (id: string): boolean => {
  return id in paymentMethodsRecord;
};