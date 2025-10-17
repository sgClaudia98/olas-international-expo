import React, { useMemo, useState } from "react";
import { TextInput, View, Text, StyleSheet, Pressable, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { inputStyles } from "@/styles/input";
import * as Colors from '@/styles/colors'
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";

type FocusEvent = NativeSyntheticEvent<TextInputFocusEventData>

interface InputFieldProps extends TextInputProps {
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  right?: React.ReactNode; // <-- Add this line
}

const InputField: React.FC<InputFieldProps> = ({
  error,
  touched,
  disabled = false,
  onFocus,
  onBlur,
  value,
  right, // <-- Add this line
  ...props
}) => {
  const styles = useResponsiveStyles(inputStyles);
  const [isFocused, setIsFocused] = useState(false);
  const showError = useMemo(() => error && touched, [error, touched])
  const handleOnFocused = (e: FocusEvent) => {
    setIsFocused(true)
    onFocus && onFocus(e)
  }
  const handleOnBlur = (e: FocusEvent) => {
    setIsFocused(false)
    if (onBlur) onBlur(e)
  }

  // Determine the state of the input field
  const isFilled = Boolean(value && value.trim() !== "");
  const stateStyle = disabled
    ? styles.blocked
    : isFocused
      ? styles.typing
      : isFilled
        ? styles.filled
        : styles.inactive;

  const textStyle = disabled
    ? styles.textBlocked
    : isFocused
      ? styles.textTyping
      : isFilled
        ? styles.textFilled
        : styles.textInactive;

  return (
    <View style={{gap: 2}}>
      <View style={[styles.container, !showError ? stateStyle: styles.error, { flexDirection: "row", alignItems: "center" }]}>
        <TextInput
          {...props}
          onFocus={handleOnFocused}
          onBlur={handleOnBlur}
          value={value}
          style={[styles.text, textStyle, { flex: 1 }]}
          placeholderTextColor={styles.textInactive.color}
          aria-disabled={disabled}
        />
        {right && (
          <View style={{ marginLeft: 8 }}>{right}</View>
        )}
      </View>
      {showError && (
        <Text style={{ color: Colors.red.primary, fontSize: 12 }}>{error}</Text>
      )}
    </View>
  );
};

export default InputField;
