import React, { FC, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { paymentFormStyles } from "@/styles/reused/paymentForm";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import PaymentButtons from "@/modules/payment/components/PaymentButtons";
import { UIBooking } from "@/modules/marketplace/utils/bookingMapping";
import { usePaymentContext } from "@/modules/payment/providers/PaymentProvider";
import { PaymentFormValues } from "../PaymentFormHelper";
import { useFormikContext } from "formik";

const Step4: FC<{
  preview: UIBooking;
  refetchBooking?: (values: PaymentFormValues) => void;
}> = ({ preview, refetchBooking }) => {
  const { values, setFieldValue } = useFormikContext<PaymentFormValues>();
  const { methods, selectedMethod, setMethodById } = usePaymentContext();

  const styles = useResponsiveStyles(paymentFormStyles);
  const [total, setTotal] = useState(preview.totalPrice);

  const handleSetMethod = (id: string) => {
    setFieldValue("paymentMethod", id);
    const method = setMethodById(id);
    setTotal(preview.price + method?.fee || preview.price);
  };

  useEffect(() => {
    setMethodById(values.paymentMethod);
  }, []);

  return (
    <>
      <View>
        <Text style={styles.label}>Select Payment Method</Text>
        <View style={{ marginTop: 10 }}>
          <PaymentButtons
            amount={preview.totalPrice}
            selectedMethod={selectedMethod}
            setSelectedMethod={handleSetMethod}
            paymentMethods={methods}
          />
        </View>
      </View>
      <View style={{ marginTop: 20, alignItems: 'flex-end' }}>
        <Text style={styles.totalPrice}>Total: ${total.toFixed(2)}</Text>
      </View>
    </>
  );
};

export default Step4;
