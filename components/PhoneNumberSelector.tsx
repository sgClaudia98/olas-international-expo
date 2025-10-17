import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { PhoneNumberInput } from "react-native-paper-phone-number-input";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import { Colors } from "@/styles";
import { parsePhoneNumber, parseStringToPhoneNumber } from "@/utils/PhoneNumberHelper";

polyfillCountryFlagEmojis();

interface PhoneNumberSelectorProps {
  value: string; // E164 format phone number
  onChange: (phone: string) => void;
  onBlur?: () => void;
  inputStyles?: Record<string, any>;
  defaultCountryCode: string;
  disableCountrySelection?: boolean;
  error?: boolean;
  disabled?: boolean;
}

const PhoneNumberSelector: React.FC<PhoneNumberSelectorProps> = ({
  value,
  onChange,
  onBlur,
  inputStyles,
  defaultCountryCode,
  disableCountrySelection,
  disabled = false,
  error = false,
}) => {
  // Parse the E164 phone string into code and number for the UI
  const parsedPhone = parseStringToPhoneNumber(value);
  const [code, setCode] = useState(parsedPhone.code || defaultCountryCode);
  const [number, setNumber] = useState(parsedPhone.number || "");

  // Update internal state when value changes externally
  useEffect(() => {
    const parsed = parseStringToPhoneNumber(value);
    if (parsed.code && parsed.number) {
      setCode(parsed.code);
      setNumber(parsed.number);
    } else if (!value) {
      setCode(defaultCountryCode);
      setNumber("");
    }
  }, [value, defaultCountryCode]);

  const handlePhoneChange = useCallback((newNumber: string) => {
    // Filter out non-numeric characters (keep spaces for formatting)
    const filtered = newNumber ? newNumber.replace(/[^0-9\s]/g, '') : "";
    setNumber(filtered);
  }, []);

  const handleFocus = useCallback(() => {
    // Remove spaces on focus for easier editing
    setNumber((prev) => prev ? prev.replace(/\s/g, "") : "");
  }, []);

  const handleBlur = useCallback(() => {
    // Convert to E164 format and update parent
    const e164 = parsePhoneNumber(number, code, 0); // 0 = E164 format
    if (e164) {
      onChange(e164);
      // Format with spaces for display
      const formatted = parsePhoneNumber(number, code, 2); // 2 = NATIONAL format with spaces
      if (formatted) {
        setNumber(formatted);
      }
    }
    onBlur?.();
  }, [onChange, onBlur, number, code]);

  return (
    <>
      <PhoneNumberInput
        style={inputStyles}
        code={code}
        setCode={setCode}
        phoneNumber={number}
        setPhoneNumber={handlePhoneChange}
        includeCountries={disableCountrySelection ? [code] : undefined}
        modalContainerStyle={styles.modalContainer}
        modalStyle={styles.modalStyles}
        placeholder="Enter phone number"
        textColor={inputStyles?.color || Colors.black.primary}
        keyboardType="numeric"
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={error}
        disabled={disabled}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 5,
    maxWidth: 400,
    marginHorizontal: "auto",
    marginVertical: 40,
  },
  modalStyles: {
    backgroundColor: "rgba(8, 51, 102, 0.25)",
    borderRadius: 10,
  },
});

export default PhoneNumberSelector;
