import React, { FC } from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import { Colors } from "@/styles";
import {
  paymentFormStyles,
  paymentFormStyles as styles,
} from "../../../styles/paymentForm";
import { PaymentFormValues } from "../PaymentFormHelper";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import PaymentButtons from "@/modules/payment/components/PaymentButtons";
import { UIBooking } from "@/modules/marketplace/utils/bookingMapping";

const Step4: FC<{getBookingId: () => Promise<number>, preview: UIBooking}> = ({ getBookingId, preview }) => {
  const { handleSubmit } = useFormikContext<PaymentFormValues>();

  const styles = useResponsiveStyles(paymentFormStyles);

  return (
    <>
      <View style={styles.paymentButtonsContainer}>
      <PaymentButtons amount={preview.totalPrice} getOrderId={() => getBookingId().then((v) => v.toString())} onSuccess={() => handleSubmit()}/>
      </View>
    </>
  );
};

export default Step4;
