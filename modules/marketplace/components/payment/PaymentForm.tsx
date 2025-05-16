import React, { useState, useMemo } from "react";
import { View, Text } from "react-native";
import { Button, Portal } from "react-native-paper";
import { Formik, FormikErrors, FormikValues } from "formik";
import * as Yup from "yup";

import { paymentFormStyles } from "../../styles/paymentForm";
import StepProgress from "./StepProgress";

import validationSchemas, { PaymentFormValues } from "./PaymentFormHelper";
import {
  useCreateMarketBookingMutation,
  usePreviewMarketBookingMutation,
} from "../../services/api/BookingService";
import {
  mapAgencyClientBookingsToUIBookings,
  UIBooking,
} from "../../utils/bookingMapping";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { mapValuesToPayload } from "./PaymentFormHelper";
import { parseStringToPhoneNumber } from "@/utils/PhoneNumberHelper";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

type ValidationSchemas = {
  [key: number]: Yup.ObjectSchema<any>;
};
const steps = ["Client", "Beneficiary", "Book", "Payment"];

const PaymentForm = ({
  province,
  destinationCountry,
  onClose,
}: {
  province: string;
  destinationCountry: string;
  onClose: Function;
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const route = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const styles = useResponsiveStyles(paymentFormStyles);

  const initialValues = {
    client: {
      fullName: user?.details?.fullName ?? "",
      phone: user?.details?.phone
        ? parseStringToPhoneNumber(user?.details?.phone)
        : {
            number: "",
            code: "",
          },
      email: user?.details?.email ?? "",
    },
    beneficiary: {
      firstName: "",
      lastName: "",
      phone: {
        number: "",
        code: destinationCountry,
      },
      idDocument: "",
      address: {
        state: province,
        city: "",
        line1: "",
        line2: "",
        zipCode: destinationCountry !== "CU" ? "" : "CU",
      },
    },
    notes: {},
  };

  const validationSchema = useMemo(
    () => (validationSchemas as ValidationSchemas)[step] || Yup.object(),
    [step]
  );

  const handleNextStep = (
    values: PaymentFormValues,
    errors: FormikErrors<any>
  ) => {
    console.log("errors", errors);
    if (Object.keys(errors).length === 0) {
      if (step === 2) createMarketBooking(values, true);
      if (step === 3) createMarketBooking(values, false);
      else setStep(step + 1);
    }
  };

  const [previewMarketBookingAPI, { isLoading: loadingBooking }] =
    usePreviewMarketBookingMutation();

  const [createMarketBookingAPI] = useCreateMarketBookingMutation();

  const [preview, setPreview] = useState<UIBooking>();

  const createMarketBooking = async (
    values: PaymentFormValues,
    preview?: boolean
  ) => {
    try {
      const payload = mapValuesToPayload(values);
      const response = preview
        ? await previewMarketBookingAPI(payload).unwrap()
        : await createMarketBookingAPI(payload).unwrap();
      setPreview(mapAgencyClientBookingsToUIBookings(response.booking));
      if (response.success) {
        if (preview) setStep(3);
        else setStep(4);
      } else {
        console.error("Error en la reserva:", response.error);
      }
    } catch (error) {
      console.error("Error al crear la reserva:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        ...initialValues,
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={() => onClose()}
    >
      {({
        validateForm,
        values,
        isSubmitting,
      }) => (
        <Portal.Host>
          <View style={styles.formContainer}>
            <Text style={styles.title}>{t("MARKET.PAYMENT.TITLE")}</Text>
            <StepProgress
              step={step - 1}
              steps={steps}
              i18nPrefix="MARKET.PAYMENT.STEPS"
            />

            {step === 1 && <Step1 />}

            {step === 2 && <Step2 destinationCountry={destinationCountry} />}

            {step === 3 && <Step3 preview={preview} />}
            {step === 4 && <Step4 preview={preview} />}

            <View style={styles.buttonContainer}>
              {step > 1 && (
                <Button
                  mode="outlined"
                  onPress={() => setStep(step - 1)}
                  style={styles.button}
                  disabled={isSubmitting || loadingBooking}
                >
                  Back
                </Button>
              )}
              {step < steps.length && (
                <Button
                  mode="contained"
                  onPress={() =>
                    validateForm(values).then((_errors) => {
                      handleNextStep(values, _errors);
                    })
                  }
                  disabled={isSubmitting || loadingBooking}
                  style={styles.button}
                >
                  {step == steps.length - 1 ? "Pay" : "Next"}
                </Button>
              )}
            </View>
          </View>
        </Portal.Host>
      )}
    </Formik>
  );
};

export default PaymentForm;
