import React, { useState } from "react";
import { Text, ActivityIndicator, Pressable } from "react-native";
import { ButtonSize, ButtonVariant, getButtonStyle, getTextStyle } from "@/styles/buttons";



interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
}

const StyledBtn: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
}) => {

  return (
    <Pressable
    onPress={onPress}
    style={(state) => getButtonStyle(variant, size, state, disabled)}
    disabled={disabled || loading}
  >
    {(state) => loading ? <ActivityIndicator size="small" color={variant === "primary" ? "white" : "#007BFF"} /> : (
        <Text style={getTextStyle(variant, state, disabled)}>{title}</Text>
      
    )}
  </Pressable>
   
  );
};

export default StyledBtn;
