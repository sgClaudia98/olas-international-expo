import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Colors } from "@/styles";
import { PaymentFormValues } from "../PaymentFormHelper";
import PhoneNumberSelector from "@/components/PhoneNumberSelector";
import { paymentFormStyles } from "@/styles/reused/paymentForm";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";

const Step1 = () => {
  const { t } = useTranslation();
  const { handleChange, handleBlur, values, errors } =
    useFormikContext<PaymentFormValues>();

  const styles = useResponsiveStyles(paymentFormStyles);

  return (
    <>
      <Text style={styles.label}>{t("FORMLABEL.FULL_NAME")}</Text>
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
          <Text style={styles.label}>{t("FORMLABEL.PHONE_NUMBER")}</Text>
          <PhoneNumberSelector
            value={values.client.phone}
            onChange={handleChange("client.phone")}
            onBlur={() => handleBlur("client.phone")}
            inputStyles={{ ...styles.input, marginBottom: 0 }}
            defaultCountryCode="US"
            error={!!errors.client?.phone}
          />
          {errors.client?.phone && (
            <Text style={{ ...styles.error, marginTop: 5 }}>
              {errors.client?.phone as string}
            </Text>
          )}
        </View>
        <View style={styles.columnRight}>
          <Text style={styles.label}>{t("FORMLABEL.EMAIL")}</Text>
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
