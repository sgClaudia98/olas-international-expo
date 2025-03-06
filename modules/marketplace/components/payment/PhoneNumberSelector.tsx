import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { PhoneNumberInput } from "react-native-paper-phone-number-input";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import { PaymentFormValues } from "./PaymentFormHelper";
import { parsePhoneNumber } from "./PhoneNumberHelper";
import { Colors } from "@/styles";

polyfillCountryFlagEmojis();

interface PhoneNumberSelectorProps {
  name: string; // "client.phone" | "beneficiary.phone"
  inputStyles?: Record<string, any>;
  modalStyles?: Record<string, any>;
  defaultCountryCode: string;
  error: boolean;
}

const PhoneNumberSelector: React.FC<PhoneNumberSelectorProps> = ({
  name,
  inputStyles,
  modalStyles,
  defaultCountryCode,
  error,
}) => {
  const CODE = name + ".code";
  const NUMBER = name + ".number";

  const { values, setFieldValue, setFieldTouched } =
    useFormikContext<PaymentFormValues>();

  const countryValue = getNestedValue(values, CODE) || defaultCountryCode;
  const phoneValue = getNestedValue(values, NUMBER) || "";

  const handlePhoneChange = useCallback(
    (newNumber: string) => {
      setFieldValue(NUMBER, newNumber);
    },
    [setFieldValue, NUMBER]
  );

  const handleCountryChange = (newCode) => setFieldValue(CODE, newCode);

  const handleBlur = useCallback(() => {
    setFieldTouched(NUMBER, true);
    setFieldValue(NUMBER, parsePhoneNumber(phoneValue, countryValue));
  }, [setFieldTouched, NUMBER, countryValue, phoneValue]);

  return (
    <>
      <PhoneNumberInput
        style={inputStyles}
        code={countryValue}
        setCode={handleCountryChange}
        phoneNumber={phoneValue}
        setPhoneNumber={handlePhoneChange}
        placeholder="Enter phone number"
        textColor={inputStyles?.color || Colors.black.primary}
        placeholderTextColor={inputStyles?.color || Colors.black.primary}
        error={error}
        modalContainerStyle={{
          ...modalStyles,
          borderRadius: 5,
          maxWidth: 400,
          marginHorizontal: "auto",
          marginVertical: 40,
        }}
        onBlur={handleBlur}
        modalStyle={styles.modalStyles}
      />
    </>
  );
};

const getNestedValue = (obj: any, path: string): any =>
  path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);

const styles = StyleSheet.create({
  modalStyles: {
    backgroundColor: "rgba(8, 51, 102, 0.25)",
    borderRadius: 10,
  },
});

export default PhoneNumberSelector;
