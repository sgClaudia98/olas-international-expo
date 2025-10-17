import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { useFormikContext } from "formik";
import { Colors } from "@/styles";
import {
  paymentFormStyles,
  paymentFormStyles as styles,
} from "../../../../../styles/reused/paymentForm";
import { PaymentFormValues } from "../PaymentFormHelper";
import PhoneNumberSelector from "@/components/PhoneNumberSelector";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { useTranslation } from "react-i18next";

const Step2 = ({ destinationCountry }) => {
  const { handleChange, handleBlur, values, errors } =
    useFormikContext<PaymentFormValues>();

  const styles = useResponsiveStyles(paymentFormStyles);
  const { isMobile } = useBreakpoints();
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.twoColumnContainer}>
        <View style={styles.columnLeft}>
          <Text style={styles.label}>{t("FORMLABEL.FIRST_NAME")}</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("beneficiary.firstName")}
            onBlur={handleBlur("beneficiary.firstName")}
            value={values.beneficiary.firstName || ""}
            textColor={Colors.black.primary}
            placeholder={t("FORMLABEL.FIRST_NAME")}
            placeholderTextColor={Colors.black.primary}
            error={!!errors.beneficiary?.firstName}
          />
          {errors.beneficiary?.firstName && (
            <Text style={styles.error}>{errors.beneficiary.firstName}</Text>
          )}
        </View>

        <View style={styles.columnRight}>
          <Text style={styles.label}>{t("FORMLABEL.LAST_NAME")}</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("beneficiary.lastName")}
            onBlur={handleBlur("beneficiary.lastName")}
            value={values.beneficiary.lastName || ""}
            textColor={Colors.black.primary}
            placeholder={t("FORMLABEL.LAST_NAME")}
            placeholderTextColor={Colors.black.primary}
            error={!!errors.beneficiary?.lastName}
          />
          {errors.beneficiary?.lastName && (
            <Text style={styles.error}>{errors.beneficiary.lastName}</Text>
          )}
        </View>
      </View>

      <View style={styles.twoColumnContainer}>
        <View style={styles.columnLeft}>
          <Text style={styles.label}>{t("FORMLABEL.PHONE_NUMBER")}</Text>
          <PhoneNumberSelector
            value={values.beneficiary.phone}
            onChange={handleChange("beneficiary.phone")}
            onBlur={() => handleBlur("beneficiary.phone")}
            inputStyles={{ ...styles.input, marginBottom: 0 }}
            defaultCountryCode={destinationCountry}
            disableCountrySelection={true}
            error={!!errors.beneficiary?.phone}
          />
          {errors.beneficiary?.phone && (
            <Text style={{ ...styles.error, marginTop: 5 }}>
              {errors.beneficiary.phone as string}
            </Text>
          )}
        </View>

        <View style={styles.columnRight}>
          <Text style={styles.label}>{t("FORMLABEL.ID_DOCUMENT")}</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("beneficiary.idDocument")}
            onBlur={handleBlur("beneficiary.idDocument")}
            value={values.beneficiary.idDocument || ""}
            textColor={Colors.black.primary}
            placeholder={t("FORMLABEL.ID_DOCUMENT")}
            placeholderTextColor={Colors.black.primary}
            error={!!errors.beneficiary?.idDocument}
          />
          {errors.beneficiary?.idDocument && (
            <Text style={styles.error}>{errors.beneficiary.idDocument}</Text>
          )}
        </View>
      </View>

      <View style={styles.twoColumnContainer}>
        <View style={styles.columnLeft}>
          <Text style={styles.label}>{t("FORMLABEL.STATE")}</Text>
          <TextInput
            style={styles.input}
            value={values.beneficiary.address?.state || ""}
            disabled
            textColor={Colors.black.primary}
            placeholder={t("FORMLABEL.STATE")}
            placeholderTextColor={Colors.black.primary}
          />
        </View>

        <View style={styles.columnRight}>
          <Text style={styles.label}>{t("FORMLABEL.CITY")}</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("beneficiary.address.city")}
            onBlur={handleBlur("beneficiary.address.city")}
            value={values.beneficiary.address?.city || ""}
            textColor={Colors.black.primary}
            placeholder={t("FORMLABEL.CITY")}
            placeholderTextColor={Colors.black.primary}
            error={!!errors.beneficiary?.address?.city}
          />
          {errors.beneficiary?.address?.city && (
            <Text style={styles.error}>{errors.beneficiary.address.city}</Text>
          )}
        </View>
      </View>

      <Text style={styles.label}>{t("FORMLABEL.ADDRESS_LINE1")}</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleChange("beneficiary.address.line1")}
        onBlur={handleBlur("beneficiary.address.line1")}
        value={values.beneficiary.address?.line1 || ""}
        textColor={Colors.black.primary}
        placeholder={t("FORMLABEL.ADDRESS_LINE1")}
        placeholderTextColor={Colors.black.primary}
        error={!!errors.beneficiary?.address?.line1}
      />
      {errors.beneficiary?.address?.line1 && (
        <Text style={styles.error}>{errors.beneficiary.address.line1}</Text>
      )}

      {destinationCountry !== "CU" && (
        <>
          <Text style={styles.label}>{t("FORMLABEL.ZIP_CODE")}</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("beneficiary.address.zipCode")}
            onBlur={handleBlur("beneficiary.address.zipCode")}
            value={values.beneficiary.address?.zipCode || ""}
            textColor={Colors.black.primary}
            placeholder={t("FORMLABEL.ZIP_CODE")}
            placeholderTextColor={Colors.black.primary}
            error={!!errors.beneficiary?.address?.zipCode}
          />
          {errors.beneficiary?.address?.zipCode && (
            <Text style={styles.error}>{errors.beneficiary.address.zipCode}</Text>
          )}
        </>
      )}

      <Text style={styles.label}>{t("FORMLABEL.ADDRESS_LINE2")}</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleChange("beneficiary.address.line2")}
        onBlur={handleBlur("beneficiary.address.line2")}
        value={values.beneficiary.address?.line2 || ""}
        textColor={Colors.black.primary}
        placeholder={t("FORMLABEL.ADDRESS_LINE2")}
        placeholderTextColor={Colors.black.primary}
        error={!!errors.beneficiary?.address?.line2}
      />
      {errors.beneficiary?.address?.line2 && (
        <Text style={styles.error}>{errors.beneficiary.address.line2}</Text>
      )}
    </>
  );
};

export default Step2;
