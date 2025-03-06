import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { useFormikContext } from "formik";
import { Colors } from "@/styles";
import { paymentFormStyles as styles } from "@/modules/marketplace/styles/paymentForm";
import { PaymentFormValues } from "../PaymentFormHelper";
import PhoneNumberSelector from "../PhoneNumberSelector";

const Step2 = ({ destinationCountry }) => {
  const { handleChange, handleBlur, values, errors, touched } =
    useFormikContext<PaymentFormValues>();

  return (
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
            error={!!errors.beneficiary?.firstName}
          />
          {errors.beneficiary?.firstName && (
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
            error={!!errors.beneficiary?.lastName}
          />
          {errors.beneficiary?.lastName && (
            <Text style={styles.tablet.error}>
              {errors.beneficiary.lastName}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.tablet.twoColumnContainer}>
        <View style={styles.tablet.columnLeft}>
          <Text style={styles.tablet.label}>Phone number</Text>
          <PhoneNumberSelector
            name="beneficiary.phone"
            inputStyles={{ ...styles.tablet.input, marginBottom: 0 }}
            defaultCountryCode="US"
            error={!!errors.beneficiary?.phone?.number}
          />
          {errors.beneficiary?.phone?.number && (
            <Text style={{ ...styles.tablet.error, marginTop: 5 }}>
              {errors.beneficiary?.phone?.number}
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
            error={!!errors.beneficiary?.idDocument}
          />
          {errors.beneficiary?.idDocument && (
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
            error={!!errors.beneficiary?.address?.city}
          />
          {errors.beneficiary?.address?.city && (
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
        error={!!errors.beneficiary?.address?.line1}
      />
      {errors.beneficiary?.address?.line1 && (
        <Text style={styles.tablet.error}>
          {errors.beneficiary?.address?.line1}
        </Text>
      )}
      {destinationCountry !== "CU" && (
        <>
          <Text style={styles.tablet.label}>Zip Code</Text>
          <TextInput
            style={styles.tablet.input}
            onChangeText={handleChange("beneficiary.address.zipCode")}
            onBlur={handleBlur("beneficiary.address.zipCode")}
            value={values.beneficiary.address?.zipCode || ""}
            textColor={Colors.black.primary}
            placeholderTextColor={Colors.black.primary}
            error={!!errors.beneficiary?.address?.zipCode}
          />
          {errors.beneficiary?.address?.zipCode && (
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
        error={!!errors.beneficiary?.address?.line2}
      />
      {errors.beneficiary?.address?.line2 && (
        <Text style={styles.tablet.error}>
          {errors.beneficiary?.address?.line2}
        </Text>
      )}
    </>
  );
};

export default Step2;
