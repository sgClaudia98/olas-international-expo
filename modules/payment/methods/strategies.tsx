// methods/strategies.ts
import { IPaymentMethod } from '../types/payment';
import { CreditCardPayment } from './CreditCardPayment';
import { PaypalPayment } from './PaypalPayment';

export const PaymentStrategies: Record<string, () => IPaymentMethod> = {
  CreditCard: () => new CreditCardPayment(),
  PayPal: () => new PaypalPayment(),
};
