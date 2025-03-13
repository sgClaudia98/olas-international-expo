import React from "react";
import { View, Text } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { useFormikContext } from "formik";
import { Colors } from "@/styles";
import { paymentFormStyles as styles } from "@/modules/marketplace/styles/paymentForm";
import { PaymentFormValues } from "../PaymentFormHelper";
import PhoneNumberSelector from "../PhoneNumberSelector";

const Step1 = () => {
  const { handleChange, handleBlur, values, errors } =
    useFormikContext<PaymentFormValues>();

  return (
    <>
      <Text style={styles.tablet.label}>Full Name</Text>
      <TextInput
        style={styles.tablet.input}
        onChangeText={handleChange("client.fullName")}
        onBlur={handleBlur("client.fullName")}
        value={values.client.fullName || ""}
        textColor={Colors.black.primary}
        placeholderTextColor={Colors.black.primary}
        error={!!errors.client?.fullName}
      />
      {errors.client?.fullName && (
        <Text style={styles.tablet.error}>{errors.client?.fullName}</Text>
      )}

      <View style={styles.tablet.twoColumnContainer}>
        <View style={styles.tablet.columnLeft}>
          <Text style={styles.tablet.label}>Phone Number</Text>
          <PhoneNumberSelector
            name="client.phone"
            inputStyles={{ ...styles.tablet.input, marginBottom: 0 }}
            defaultCountryCode="US"
            error={!!errors.client?.phone?.number}
          />
          {errors.client?.phone?.number && (
            <Text style={{ ...styles.tablet.error, marginTop: 5 }}>
              {errors.client?.phone?.number}
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
            error={!!errors.client?.email}
          />
          {errors.client?.email && (
            <Text style={styles.tablet.error}>{errors.client?.email}</Text>
          )}
        </View>
      </View>
    </>
  );
};

export default Step1;
