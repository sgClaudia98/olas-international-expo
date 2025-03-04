import React, { useState, useMemo } from "react";
import { View, Text } from "react-native";
import { Button, TextInput, DataTable } from "react-native-paper";
import { Formik, FormikErrors, FormikValues } from "formik";
import * as Yup from "yup";

import { paymentFormStyles as styles } from "@/modules/marketplace/styles/paymentForm";
import StepProgress from "./StepProgress";
import { CartItem } from "../../reducers/ShoppingCartReducer";

import validationSchemas from "./orderValidation";
import { Colors } from "@/styles";
import ContentBox from "./ContentBox";
import {
  useCreateMarketBookingMutation,
  usePreviewMarketBookingMutation,
} from "../../services/api/BookingService";
import { CreateMarketBookingRequest } from "../../services/interfaces/bookingDetail";
import { useGetProfileQuery } from "@/modules/auth/services/api/AccountService";
import {
  mapAgencyClientBookingsToUIBookings,
  UIBooking,
} from "../../utils/bookingMapping";
import OrderSection from "./OrderSection";

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
  cartItems,
  province,
  destinationCountry,
}: {
  cartItems: CartItem<any>[];
  province: string;
  destinationCountry: string;
}) => {
  const [step, setStep] = useState(1);
  const { data: profile, isLoading } = useGetProfileQuery();
  
  const initialValues = useMemo(
    () => ({
      client: {
        fullName: profile?.client.fullName ?? "",
        phone: profile?.client.phone ?? "",
        email: profile?.client.email ?? "",
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
    }),
    [profile]
  );

  const validationSchema = useMemo(
    () => (validationSchemas as ValidationSchemas)[step] || Yup.object(),
    [step]
  );

  const handleNextStep = (errors: FormikErrors<any>) => {
    if (Object.keys(errors).length === 0) {
      setStep(step + 1);
    }
  };

  const [previewMarketBookingAPI, { isLoading: loadingBooking }] =
    usePreviewMarketBookingMutation();

  const [createMarketBookingAPI] = useCreateMarketBookingMutation();

  const [preview, setPreview] = useState<UIBooking>();

  const createMarketBooking = async (
    values: FormikValues,
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
      onSubmit={(values) => createMarketBooking(values)}
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
        <View style={styles.tablet.formContainer}>
          <Text style={styles.tablet.title}>Booking steps</Text>
          <StepProgress step={step - 1} />

          {step === 1 && (
            <>
              <Text style={styles.tablet.label}>Full Name</Text>
              <TextInput
                style={styles.tablet.input}
                onChangeText={handleChange("client.fullName")}
                onBlur={handleBlur("client.fullName")}
                value={values.client.fullName || ""}
                textColor={Colors.black.primary}
                placeholderTextColor={Colors.black.primary}
                error={!!(touched.client?.fullName && errors.client?.fullName)}
              />
              {touched.client?.fullName && errors.client?.fullName && (
                <Text style={styles.tablet.error}>
                  {errors.client?.fullName}
                </Text>
              )}

              <View style={styles.tablet.twoColumnContainer}>
                <View style={styles.tablet.columnLeft}>
                  <Text style={styles.tablet.label}>Phone Number</Text>
                  <TextInput
                    style={styles.tablet.input}
                    inputMode="tel"
                    onChangeText={handleChange("client.phone")}
                    onBlur={handleBlur("client.phone")}
                    value={values.client.phone || ""}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={!!(touched.client?.phone && errors.client?.phone)}
                  />
                  {touched.client?.phone && errors.client?.phone && (
                    <Text style={styles.tablet.error}>
                      {errors.client?.phone}
                    </Text>
                  )}
                </View>
                <View style={styles.tablet.columnRight}>
                  <Text style={styles.tablet.label}>Email</Text>
                  <TextInput
                    style={styles.tablet.input}
                    inputMode="email"
                    onChangeText={handleChange("client.email")}
                    onBlur={handleBlur("client.email")}
                    value={values.client.email || ""}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={!!(touched.client?.email && errors.client?.email)}
                  />
                  {touched.client?.email && errors.client?.email && (
                    <Text style={styles.tablet.error}>
                      {errors.client?.email}
                    </Text>
                  )}
                </View>
              </View>
            </>
          )}

          {step === 2 && (
            <>
              <View style={styles.tablet.twoColumnContainer}>
                <View style={styles.tablet.columnLeft}>
                  <Text style={styles.tablet.label}>First name</Text>
                  <TextInput
                    style={styles.tablet.input}
                    onChangeText={handleChange("beneficiary.firstName")}
                    onBlur={handleBlur("beneficiary.firstName")}
                    value={values.beneficiary.firstName || ""}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={
                      !!(
                        touched.beneficiary?.firstName &&
                        errors.beneficiary?.firstName
                      )
                    }
                  />
                  {touched.beneficiary?.firstName &&
                    errors.beneficiary?.firstName && (
                      <Text style={styles.tablet.error}>
                        {errors.beneficiary?.firstName}
                      </Text>
                    )}
                </View>

                <View style={styles.tablet.columnRight}>
                  <Text style={styles.tablet.label}>Last names</Text>
                  <TextInput
                    style={styles.tablet.input}
                    onChangeText={handleChange("beneficiary.lastName")}
                    onBlur={handleBlur("beneficiary.lastName")}
                    value={values.beneficiary.lastName || ""}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={
                      !!(
                        touched.beneficiary?.lastName &&
                        errors.beneficiary?.lastName
                      )
                    }
                  />
                  {touched.beneficiary?.lastName &&
                    errors.beneficiary?.lastName && (
                      <Text style={styles.tablet.error}>
                        {errors.beneficiary.lastName}
                      </Text>
                    )}
                </View>
              </View>

              <View style={styles.tablet.twoColumnContainer}>
                <View style={styles.tablet.columnLeft}>
                  <Text style={styles.tablet.label}>Phone number</Text>
                  <TextInput
                    style={styles.tablet.input}
                    inputMode="tel"
                    onChangeText={handleChange("beneficiary.phone")}
                    onBlur={handleBlur("beneficiary,phone")}
                    value={values.beneficiary.phone || ""}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={ 
                      !!(
                        touched.beneficiary?.phone && errors.beneficiary?.phone
                      )
                    }
                  />
                  {touched.beneficiary?.phone && errors.beneficiary?.phone && (
                    <Text style={styles.tablet.error}>
                      {errors.beneficiary?.phone}
                    </Text>
                  )}
                </View>

                <View style={styles.tablet.columnRight}>
                  <Text style={styles.tablet.label}>CI/DNI*</Text>
                  <TextInput
                    style={styles.tablet.input}
                    onChangeText={handleChange("beneficiary.idDocument")}
                    onBlur={handleBlur("beneficiary.idDocument")}
                    value={values.beneficiary.idDocument || ""}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={
                      !!(
                        touched.beneficiary?.idDocument &&
                        errors.beneficiary?.idDocument
                      )
                    }
                  />
                  {touched.beneficiary?.idDocument &&
                    errors.beneficiary?.idDocument && (
                      <Text style={styles.tablet.error}>
                        {errors.beneficiary.idDocument}
                      </Text>
                    )}
                </View>
              </View>

              <View style={styles.tablet.twoColumnContainer}>
                <View style={styles.tablet.columnLeft}>
                  <Text style={styles.tablet.label}>State (Provincia)</Text>
                  <TextInput
                    style={styles.tablet.input}
                    value={values.beneficiary.address?.state || ""}
                    disabled
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                  />
                </View>

                <View style={styles.tablet.columnRight}>
                  <Text style={styles.tablet.label}>City (Municipio)</Text>
                  <TextInput
                    style={styles.tablet.input}
                    onChangeText={handleChange("beneficiary.address.city")}
                    onBlur={handleBlur("beneficiary.address.city")}
                    value={values.beneficiary.address?.city || ""}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={
                      !!(
                        touched.beneficiary?.address?.city &&
                        errors.beneficiary?.address?.city
                      )
                    }
                  />
                  {touched.beneficiary?.address?.city &&
                    errors.beneficiary?.address?.city && (
                      <Text style={styles.tablet.error}>
                        {errors.beneficiary?.address.city}
                      </Text>
                    )}
                </View>
              </View>

              <Text style={styles.tablet.label}>Address</Text>
              <TextInput
                style={styles.tablet.input}
                onChangeText={handleChange("beneficiary.address.line1")}
                onBlur={handleBlur("beneficiary.address.line1")}
                value={values.beneficiary.address?.line1 || ""}
                textColor={Colors.black.primary}
                placeholderTextColor={Colors.black.primary}
                error={
                  !!(
                    touched.beneficiary?.address?.line1 &&
                    errors.beneficiary?.address?.line1
                  )
                }
              />
              {touched.beneficiary?.address?.line1 &&
                errors.beneficiary?.address?.line1 && (
                  <Text style={styles.tablet.error}>
                    {errors.beneficiary?.address?.line1}
                  </Text>
                )}
              {destinationCountry !== "CU" && (
                <>
                  <Text style={styles.tablet.label}>Zip Code</Text>
                  <TextInput
                    style={styles.tablet.input}
                    onChangeText={handleChange("beneficiary.address.zipcode")}
                    onBlur={handleBlur("beneficiary.address.zipcode")}
                    value={values.beneficiary.address?.zipCode || ""}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={
                      !!(
                        touched.beneficiary?.address?.zipCode &&
                        errors.beneficiary?.address?.zipCode
                      )
                    }
                  />
                  {touched.beneficiary?.address?.zipCode &&
                    errors.beneficiary?.address?.zipCode && (
                      <Text style={styles.tablet.error}>
                        {errors.beneficiary?.address?.zipCode}
                      </Text>
                    )}
                </>
              )}
              <Text style={styles.tablet.label}>Neighborhood (Reparto)</Text>
              <TextInput
                style={styles.tablet.input}
                onChangeText={handleChange("beneficiary.address.line2")}
                onBlur={handleBlur("beneficiary.address.line2")}
                value={values.beneficiary.address?.line2 || ""}
                textColor={Colors.black.primary}
                placeholderTextColor={Colors.black.primary}
                error={
                  !!(
                    touched.beneficiary?.address?.line2 &&
                    errors.beneficiary?.address?.line2
                  )
                }
              />
              {touched.beneficiary?.address?.line2 &&
                errors.beneficiary?.address?.line2 && (
                  <Text style={styles.tablet.error}>
                    {errors.beneficiary?.address?.line2}
                  </Text>
                )}
            </>
          )}

          {step === 3 && (
            <>
              <View style={styles.tablet.twoColumnContainer}>
                <View style={styles.tablet.column}>
                  <ContentBox
                    title="Client"
                    data={{
                      fullName: values.client.fullName || "",
                      email: values.client.email || "",
                      phoneNumber: values.client.phone || "",
                    }}
                    backgroundColor={Colors.black.fifth}
                  />
                </View>
                <View style={styles.tablet.column}>
                  <ContentBox
                    title="Beneficiary"
                    data={{
                      name:
                        values.beneficiary.firstName +
                        " " +
                        values.beneficiary.lastName,
                      identification: values.beneficiary.idDocument || "",
                      phoneNumber: values.beneficiary.phone || "",
                      address: values.beneficiary.address?.line1 || "",
                    }}
                    backgroundColor={Colors.blue.fifth}
                  />
                </View>
              </View>
              {preview &&
                preview.details.map((booking) => (
                  <OrderSection
                    booking={booking}
                    note={values.notes[booking.id]}
                    onChangeNote={(value) =>
                      handleChange(`notes.${booking.id}`)(value)
                    }
                  />
                ))}
            </>
          )}

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
      )}
    </Formik>
  );
};

export default PaymentForm;
