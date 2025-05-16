import React from 'react';
interface PaymentProvidersProps {
  children: React.ReactNode;
}

export const PaymentProviders: React.FC<PaymentProvidersProps> = ({ children }) => {
    return <>{children}</>;
}