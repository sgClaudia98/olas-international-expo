import React, { useState, useMemo } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Formik} from "formik";
import * as Yup from "yup";

import { paymentFormStyles } from "../../../../styles/reused/paymentForm";
import validationSchemas from "../payment/PaymentFormHelper";
import {
  UIBooking,
} from "../../utils/bookingMapping";
import Step4 from "../payment/steps/Step4";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { useTranslation } from "react-i18next";
import { Toast } from "toastify-react-native";
import { usePaymentContext } from "@/modules/payment/providers/PaymentProvider";
import { usePayment } from "@/modules/payment/hooks/usePayment";

type ValidationSchemas = {
  [key: number]: Yup.ObjectSchema<any>;
};

const OrderPayForm = ({
  preview,
  onClose,
}: {
  preview: UIBooking;
  onClose: Function;
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const { user } = useAppSelector((state) => state.auth);

  const styles = useResponsiveStyles(paymentFormStyles);

  const initialValues = {
    paymentMethod: preview.paymentMethod || "PayPal",
  };

  const validationSchema = useMemo(
    () => (validationSchemas as ValidationSchemas)[4] || Yup.object(),
    [step]
  );

  const { setAvailableMethods } = usePaymentContext();
  const { processPayment } = usePayment();

  const handleSubmit = async (values: { paymentMethod: string }) => {
    console.log("values", values, !!processPayment);
    const response = await processPayment(values.paymentMethod, {
      bookingId: preview.id,
      email: preview.client.email,
    });
    if (response.success) {
      onClose();
    } else {
      Toast.error("Payment failed");
    }
  };

  return (
    <Formik
      initialValues={{
        ...initialValues,
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, submitForm }) => (
        <View style={styles.formContainer}>
          <Step4
            preview={preview}
            // refetchBooking={(val) => createMarketBooking(val, true)}
          />

          <View style={styles.buttonContainer}>
            {step > 1 && (
              <Button
                mode="outlined"
                onPress={() => setStep(step - 1)}
                style={styles.button}
                disabled={isSubmitting}
              >
                Back
              </Button>
            )}

            <Button
              mode="contained"
              onPress={() => submitForm()}
              disabled={isSubmitting}
              style={styles.button}
            >
              {"Pay"}
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default OrderPayForm;
