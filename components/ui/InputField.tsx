import React, { useMemo, useState } from "react";
import { TextInput, View, Text, StyleSheet, Pressable, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { inputStyles } from "@/styles/input";
import * as Colors from '@/styles/colors'

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
    ? inputStyles.blocked
    : isFocused
      ? inputStyles.typing
      : isFilled
        ? inputStyles.filled
        : inputStyles.inactive;

  const textStyle = disabled
    ? inputStyles.textBlocked
    : isFocused
      ? inputStyles.textTyping
      : isFilled
        ? inputStyles.textFilled
        : inputStyles.textInactive;

  return (
    <View style={{gap: 2}}>
      <View style={[inputStyles.container, !showError ? stateStyle: inputStyles.error, { flexDirection: "row", alignItems: "center" }]}>
        <TextInput
          {...props}
          onFocus={handleOnFocused}
          onBlur={handleOnBlur}
          value={value}
          style={[inputStyles.text, textStyle, { flex: 1 }]}
          placeholderTextColor={inputStyles.textInactive.color}
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
