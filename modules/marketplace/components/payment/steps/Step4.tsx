import React, { FC, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import {
  paymentFormStyles,
  paymentFormStyles as styles,
} from "../../../styles/paymentForm";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import PaymentButtons from "@/modules/payment/components/PaymentButtons";
import { UIBooking } from "@/modules/marketplace/utils/bookingMapping";
import { usePaymentContext } from "@/modules/payment/providers/PaymentProvider";
import { ThemedText } from "@/components/ThemedText";
import { PaymentFormValues } from "../PaymentFormHelper";
import { useFormikContext } from "formik";

const Step4: FC<{
  preview: UIBooking;
  refetchBooking?: (values: PaymentFormValues) => void;
}> = ({ preview, refetchBooking }) => {
  const { values, setFieldValue } = useFormikContext<PaymentFormValues>();
  const { methods, selectedMethod, setMethodById } = usePaymentContext();

  const styles = useResponsiveStyles(paymentFormStyles);
  // const refetchTimeout = useRef<NodeJS.Timeout | null>(null);
  const [total, setTotal] = useState(preview.totalPrice);

  const handleSetMethod = (id: string) => {
    setFieldValue("paymentMethod", id);
    const method = setMethodById(id);
    setTotal(preview.price + method?.fee || preview.price);

    /* 🔁 Debounced refetch
    if (refetchTimeout.current) {
      clearTimeout(refetchTimeout.current);
    }

    refetchTimeout.current = setTimeout(() => {
      refetchBooking({ ...values, paymentMethod: id });
    }, 1500);
    */
  };

  useEffect(() => {
    setMethodById(values.paymentMethod);
  }, []);

  /*
  useEffect(() => {
    setTotal(preview.totalPrice);
  }, [preview]);
*/

  console.log("methods", methods);
  return (
    <>
      <View style={styles.paymentButtonsContainer}>
        <PaymentButtons
          amount={preview.totalPrice}
          selectedMethod={selectedMethod}
          setSelectedMethod={handleSetMethod}
          paymentMethods={methods}
        />
        <ThemedText type="defaultBold">Total ${total}</ThemedText>
      </View>
    </>
  );
};

export default Step4;
