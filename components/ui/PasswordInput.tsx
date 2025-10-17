import React, { useState } from "react";
import { Pressable } from "react-native";
import InputField from "./InputField";
import { EyeClose, Visible } from "../icons";
import { TextInputProps } from "react-native";

interface PasswordInputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const EyeIcon = isPasswordVisible ? Visible : EyeClose;

  return (
    <InputField
      {...props}
      secureTextEntry={!isPasswordVisible}
      right={
        <Pressable
          onPress={togglePasswordVisibility}
          accessible={true}
          accessibilityLabel={isPasswordVisible ? "Hide password" : "Show password"}
          accessibilityRole="button"
        >
          <EyeIcon width={20} height={20} />
        </Pressable>
      }
    />
  );
};

export default PasswordInput;