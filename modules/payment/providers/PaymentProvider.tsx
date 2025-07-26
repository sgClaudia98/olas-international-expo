
// context/PaymentContext.tsx
import React, { createContext, useContext, useState } from "react";
import {
  IPaymentMethod,
} from "../types/payment";
import {
  paymentMethodsRecord,
} from "../utils/paymentMethods";

interface RawPaymentMethod {
  id: string;
  name: string;
  fee: number;
}

interface PaymentContextType {
  methods: IPaymentMethod[];
  selectedMethod?: string;
  setAvailableMethods: (rawMethods: RawPaymentMethod[]) => void;
  setMethodById: (id: string) => IPaymentMethod | undefined;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{
  children: React.ReactNode;
  initialSelectedMethod?: string;
}> = ({ children, initialSelectedMethod }) => {
  const [methods, setMethods] = useState<IPaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string | undefined>(
    initialSelectedMethod
  );

  const setAvailableMethods = (raw: RawPaymentMethod[]) => {
    const enriched = raw.filter((m) => m.id in paymentMethodsRecord);
    console.log("CHANGE methods", raw, enriched);
    setMethods(enriched);
  };

  const setMethodById = (id: string) => {
    const method = methods.find((m) => m.id === id);
    if (method) setSelectedMethod(id);
    return method;
  };

  return (
    <PaymentContext.Provider
      value={{
        methods,
        selectedMethod,
        setAvailableMethods,
        setMethodById,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context)
    throw new Error("usePaymentContext debe usarse dentro de PaymentProvider");
  return context;
};