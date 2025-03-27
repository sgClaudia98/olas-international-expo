import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { useFormikContext } from "formik";
import { Colors } from "@/styles";
import { PaymentFormValues } from "../PaymentFormHelper";
import PhoneNumberSelector from "@/components/PhoneNumberSelector";
import { paymentFormStyles } from "@/modules/marketplace/styles/paymentForm";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";

const Step1 = () => {
  const { handleChange, handleBlur, values, errors } =
    useFormikContext<PaymentFormValues>();

  const styles = useResponsiveStyles(paymentFormStyles);

  return (
    <>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleChange("client.fullName")}
        onBlur={handleBlur("client.fullName")}
        value={values.client.fullName || ""}
        textColor={Colors.black.primary}
        placeholderTextColor={Colors.black.primary}
        error={!!errors.client?.fullName}
      />
      {errors.client?.fullName && (
        <Text style={styles.error}>{errors.client?.fullName}</Text>
      )}

      <View style={styles.twoColumnContainer}>
        <View style={styles.columnLeft}>
          <Text style={styles.label}>Phone Number</Text>
          <PhoneNumberSelector
            name="client.phone"
            inputStyles={{ ...styles.input, marginBottom: 0 }}
            defaultCountryCode="US"
            error={!!errors.client?.phone?.number}
          />
          {errors.client?.phone?.number && (
            <Text style={{ ...styles.error, marginTop: 5 }}>
              {errors.client?.phone?.number}
            </Text>
          )}
        </View>
        <View style={styles.columnRight}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            inputMode="email"
            onChangeText={handleChange("client.email")}
            onBlur={handleBlur("client.email")}
            value={values.client.email || ""}
            textColor={Colors.black.primary}
            placeholderTextColor={Colors.black.primary}
            error={!!errors.client?.email}
          />
          {errors.client?.email && (
            <Text style={styles.error}>{errors.client?.email}</Text>
          )}
        </View>
      </View>
    </>
  );
};

export default Step1;
