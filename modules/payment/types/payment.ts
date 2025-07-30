// types/payment.ts
export interface IPaymentMethod {
  id: string;
  name: string;
  fee: number;
  processPayment?(
    data: any,
    preResponse?: (data: PaymentResponseData) => void
  ): Promise<PaymentResponse>;
}

export interface PaymentResponseData {
  reference: string;
  paymentMethod: string;
}

export interface PaymentResponse {
  success: boolean;
  data?: PaymentResponseData;
  error?: string;
}

export interface PaymentData {
  email: string;
  bookingId: number | string;
}
