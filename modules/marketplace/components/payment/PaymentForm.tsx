import React, { useState, useMemo, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, Portal } from "react-native-paper";
import { Formik, FormikErrors, FormikValues } from "formik";
import * as Yup from "yup";

import { paymentFormStyles } from "../../../../styles/reused/paymentForm";
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
import {
  AgencyClientBookingPaymentMethod,
  AgencyClientBookingPreviewResponse,
} from "../../services/interfaces/bookingDetail";
import { set } from "lodash";
import { Toast } from "toastify-react-native";
import { getCallbackUrl } from "@/utils/callback";
import { paymentFormInitials } from "../mock/paymentFormInitials";
import { usePaymentContext } from "@/modules/payment/providers/PaymentProvider";
import { usePayment } from "@/modules/payment/hooks/usePayment";

type ValidationSchemas = {
  [key: number]: Yup.ObjectSchema<any>;
};
const steps = ["Client", "Beneficiary", "Book", "Payment"];

type PaymentFormInitials = {
  destinationCountry: string;
  province: string;
  fullName?: string;
  phone?: string;
  email?: string;
};  

const getInitials = (v: PaymentFormInitials) => {
  return process.env.NODE_ENV === "development" ? paymentFormInitials(v) : {
    client: {
      fullName: v.fullName ?? "",
      phone: v.phone
        ? parseStringToPhoneNumber(v.phone)
        : {
            number: "",
            code: "",
          },
      email: v.email ?? "",
    },
    beneficiary: {
      firstName: "",
      lastName: "",
      phone: {
        number: "",
        code: v.destinationCountry,
      },
      idDocument: "",
      address: {
        state: v.province,
        city: "",
        line1: "",
        line2: "",
        zipCode: v.destinationCountry !== "CU" ? "" : "CU",
      },
    },
    notes: {},
    paymentMethod: "PayPal",
  };
};

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

  const initialValues = getInitials({
    destinationCountry,
    province,
    fullName: user?.details?.fullName,
    phone: user?.details?.phone,
    email: user?.details?.email,
  });

  const validationSchema = useMemo(
    () => (validationSchemas as ValidationSchemas)[step] || Yup.object(),
    [step]
  );

  const handleNextStep = async (
    values: PaymentFormValues,
    errors: FormikErrors<any>
  ) => {
    console.log("errors", errors);
    if (Object.keys(errors).length === 0) {
      if (step === 2) await createMarketBooking(values, true);
      if (step === 3) await createMarketBooking(values, true);
      if (step < 4) {
        setStep(step + 1);
      }
    }
  };
  const { setAvailableMethods } = usePaymentContext();
  const { processPayment } = usePayment();

  const [previewMarketBookingAPI, { isLoading: loadingBooking }] =
    usePreviewMarketBookingMutation();

  const [createMarketBookingAPI] = useCreateMarketBookingMutation();

  const [preview, setPreview] = useState<UIBooking>();

  const handleSubmit = async (values: PaymentFormValues) => {
    console.log("values", values, !!processPayment);
    const bookingId = await createMarketBooking(values);
    const response = await processPayment(
      values.paymentMethod,
      {
        bookingId: bookingId,
        email: values.client.email,
      }
    );
    if (response.success) {
      onClose();
    } else {
      Toast.error("Payment failed");
    }
  };

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
      if (step === 3) {
        setAvailableMethods(
          (response as AgencyClientBookingPreviewResponse).paymentMethods.map(
            (m) => ({
              id: m.code,
              name: m.name,
              fee: m.fee,
            })
          )
        );
      }
      if (!response.success) {
        console.error("Error en la reserva:", response.error);
      }
      return response.booking.id;
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
      onSubmit={handleSubmit}
    >
      {({ validateForm, values, isSubmitting, submitForm }) => (
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
            {step === 4 && (
              <Step4
                preview={preview}
                // refetchBooking={(val) => createMarketBooking(val, true)}
              />
            )}

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
              {step <= steps.length && (
                <Button
                  mode="contained"
                  onPress={() =>
                    validateForm(values).then((_errors) => {
                      if (step !== steps.length)
                        handleNextStep(values, _errors);
                      else submitForm();
                    })
                  }
                  disabled={isSubmitting || loadingBooking}
                  style={styles.button}
                >
                  {step == steps.length ? "Pay" : "Next"}
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
