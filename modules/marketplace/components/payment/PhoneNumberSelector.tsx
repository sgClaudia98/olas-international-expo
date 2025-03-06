import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { useTheme, HelperText } from "react-native-paper";
import { PhoneNumberInput } from "react-native-paper-phone-number-input";
import { validatePhoneNumberWithErrors } from "./PhoneNumberHelper";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import { PaymentFormValues } from "./PaymentFormHelper";

polyfillCountryFlagEmojis();

interface PhoneNumberSelectorProps {
  name: string; // "client.phone" | "beneficiary.phone"
  inputStyles?: Record<string, any>;
  modalStyles?: Record<string, any>;
  defaultCountryCode: string;
}

const PhoneNumberSelector: React.FC<PhoneNumberSelectorProps> = ({
  name,
  inputStyles,
  modalStyles,
  defaultCountryCode,
}) => {
  const theme = useTheme();
  const { values, setFieldValue, setFieldTouched, setFieldError } =
    useFormikContext<PaymentFormValues>();

  // Obtener el número de teléfono como string desde Formik
  const phoneValue = getNestedValue(values, name) || "";

  // Estado interno para el código de país
  const [countryCode, setCountryCode] = useState<string>(defaultCountryCode);

  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    error?: string;
    formatted?: string;
  }>({ isValid: true });

  // Validación automática cuando cambia el número
  useEffect(() => {
    if (!phoneValue) return;

    const result = validatePhoneNumberWithErrors(phoneValue, countryCode);
    setValidationResult(result);

    if (!result.isValid) {
      setFieldError(name, result.error);
    } else {
      setFieldError(name, ""); // Limpiar error si es válido
    }
  }, [phoneValue, countryCode]);

  // Manejo del cambio de número
  const handlePhoneChange = useCallback(
    (newNumber: string) => {
      setFieldValue(name, newNumber); // Solo almacena el número como string
    },
    [setFieldValue, name]
  );

  // Manejo del evento blur
  const handleBlur = useCallback(() => {
    setFieldTouched(name, true);
  }, [setFieldTouched, name]);

  return (
    <View>
      <PhoneNumberInput
        style={inputStyles}
        code={countryCode}
        setCode={setCountryCode}
        phoneNumber={phoneValue}
        setPhoneNumber={handlePhoneChange}
        placeholder="Enter phone number"
        textColor={inputStyles?.color || theme.colors.primary}
        placeholderTextColor={inputStyles?.color || theme.colors.primary}
        outlineColor={
          validationResult.isValid ? theme.colors.primary : theme.colors.error
        }
        activeOutlineColor={
          validationResult.isValid ? theme.colors.primary : theme.colors.error
        }
        modalContainerStyle={modalStyles}
        onBlur={handleBlur}
      />

      {!validationResult.isValid && (
        <HelperText type="error" visible>
          {validationResult.error}
        </HelperText>
      )}

      {validationResult.isValid && validationResult.formatted && (
        <Text style={styles.formattedText}>
          Formato Internacional: {validationResult.formatted}
        </Text>
      )}
    </View>
  );
};

const getNestedValue = (obj: any, path: string): any =>
  path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);

const styles = StyleSheet.create({
  formattedText: {
    marginTop: 5,
    fontSize: 14,
    color: "gray",
  },
});

export default PhoneNumberSelector;
