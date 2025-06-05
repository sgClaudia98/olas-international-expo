// context/PaymentContext.tsx
import React, { createContext, useContext, useState } from "react";
import {
  IPaymentMethod,
  PaymentData,
  PaymentResponse,
  PaymentResponseData,
} from "../types/payment";
import { PaymentStrategies } from "../methods/strategies";

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
  processPayment: (
    data: any,
    preResponse?: (data: PaymentResponseData) => void
  ) => Promise<PaymentResponse>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode, initialSelectedMethod?: string; }> = ({
  children,
  initialSelectedMethod
}) => {
  const [methods, setMethods] = useState<IPaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<
    string | undefined
  >(initialSelectedMethod);

  const setAvailableMethods = (raw: RawPaymentMethod[]) => {
    const enriched = raw.filter((m) => m.id in PaymentStrategies) // Filtra los métodos que tienen una estrategia
    console.log("CHANGE methods", raw, enriched);
    setMethods(enriched);
  };

  const setMethodById = (id: string) => {
    const method = methods.find((m) => m.id === id);
    if (method) setSelectedMethod(id);
    return method;
  };

  const processPayment = async (
    data: PaymentData,
    preResponse?: (data: PaymentResponseData) => void
  ): Promise<PaymentResponse> => {
    if (!selectedMethod) return { success: false };
    const strategy = PaymentStrategies[selectedMethod];
    return strategy().processPayment(data, preResponse);
  };

  return (
    <PaymentContext.Provider
      value={{
        methods,
        selectedMethod,
        setAvailableMethods,
        setMethodById,
        processPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context)
    throw new Error("usePayment debe usarse dentro de PaymentProvider");
  return context;
};
