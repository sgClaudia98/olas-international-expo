import React from 'react';
import { PaymentProvider } from './PaymentProvider';
interface PaymentProvidersProps {
  children: React.ReactNode;
}

export const PaymentProviders: React.FC<PaymentProvidersProps> = ({ children }) => {
    return <PaymentProvider>{children}</PaymentProvider>;
}