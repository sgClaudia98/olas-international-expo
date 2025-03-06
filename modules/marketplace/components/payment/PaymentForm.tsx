import React, { useState, useMemo } from "react";
import { View, Text } from "react-native";
import { Button, Portal } from "react-native-paper";
import { Formik, FormikErrors, FormikValues } from "formik";
import * as Yup from "yup";

import { paymentFormStyles as styles } from "@/modules/marketplace/styles/paymentForm";
import StepProgress from "./StepProgress";

import validationSchemas, { PaymentFormValues } from "./PaymentFormHelper";
import {
  useCreateMarketBookingMutation,
  usePreviewMarketBookingMutation,
} from "../../services/api/BookingService";
import { CreateMarketBookingRequest } from "../../services/interfaces/bookingDetail";
import {
  mapAgencyClientBookingsToUIBookings,
  UIBooking,
} from "../../utils/bookingMapping";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { useAppSelector } from "@/hooks/useAppDispatch";

const mapValuesToPayload = (
  values: FormikValues
): CreateMarketBookingRequest => {
  const { client, beneficiary, notes } = values;
  return {
    client: {
      fullName: client.fullName || "",
      phone: client.phone || "",
      email: client.email || "",
    },
    beneficiary: {
      firstName: beneficiary.firstName || "",
      lastName: beneficiary.lastName || "",
      phone: beneficiary.phone || "",
      idDocument: beneficiary.idDocument || "",
      address: {
        line1: beneficiary.address?.line1 || "",
        line2: beneficiary.address?.line2 || "",
        city: beneficiary.address?.city || "",
        state: beneficiary.address?.state || "",
        zipCode: beneficiary.address?.zipCode || "",
      },
    },
    notes,
  };
};

type ValidationSchemas = {
  [key: number]: Yup.ObjectSchema<any>;
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
  const [step, setStep] = useState(1);
  const { user } = useAppSelector((state) => state.auth);

  const initialValues = {
    client: {
      fullName: user?.details?.fullName ?? "",
      phone: user?.details?.phone ?? "",
      email: user?.details?.email ?? "",
    },
    beneficiary: {
      firstName: "",
      lastName: "",
      phone: "",
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
    if (Object.keys(errors).length === 0) {
      if (step === 2) createMarketBooking(values, true);
      setStep(step + 1);
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
        else alert("Success");
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
      onSubmit={(values: PaymentFormValues) => createMarketBooking(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <Portal.Host>
          <View style={styles.tablet.formContainer}>
            <Text style={styles.tablet.title}>Booking steps</Text>
            <StepProgress step={step - 1} />

            {step === 1 && <Step1 />}

            {step === 2 && <Step2 destinationCountry={destinationCountry} />}

            {step === 3 && <Step3 preview={preview} />}

            <View style={styles.tablet.buttonContainer}>
              {step > 1 && (
                <Button
                  mode="outlined"
                  onPress={() => setStep(step - 1)}
                  style={styles.tablet.button}
                  disabled={isSubmitting || loadingBooking}
                >
                  Back
                </Button>
              )}
              {step < 4 ? (
                <Button
                  mode="contained"
                  onPress={() =>
                    step === 2
                      ? createMarketBooking(values, true)
                      : handleNextStep(errors)
                  }
                  disabled={isSubmitting || loadingBooking}
                  style={styles.tablet.button}
                >
                  Next
                </Button>
              ) : (
                <Button
                  mode="contained"
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                  style={styles.tablet.button}
                >
                  Submit
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
