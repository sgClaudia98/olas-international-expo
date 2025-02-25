import { RouteProp, StackActions, useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { Text, View, TextInput } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import OtpInput from "../components/OtpInput";
import Btn from "@/components/Btn";
import { testStyles } from "@/styles";
import * as Colors from "@/styles/colors";
import InputField from "@/components/ui/InputField";
import {
  useForgetPasswordMutation,
  useResetPasswordMutation,
} from "@/modules/auth/services/api/AccountService";

import {
  IForgetPasswordRequest,
  IResetPasswordRequest,
} from "@/modules/auth/services/interfaces/account";
import { DOMAIN } from "@/constants";
import { Card } from "react-native-paper";
import { useRouter } from "expo-router";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  token: Yup.string()
    .length(6, "Code must be exactly 6 digits")
    .matches(/^\d+$/, "Code must only contain numbers")
    .required("Code is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

interface ForgotPasswordProps {
  email?: string;
  token?: string;
}

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = (params) => {
  const router = useRouter();

  const [forgetPass, _] = useForgetPasswordMutation(); // Destructure to get mutation states
  const [resetPass, responseResetPass] = useResetPasswordMutation();

  const [hasEmail, setHasEmail] = useState(!!params?.email);

  const initialValues: IResetPasswordRequest = {
    email: params?.email ?? "",
    token: params?.token ?? "", // Para el código OTP
    newPassword: "", // Para la nueva contraseña
  };

  const onSubmit = (values: IResetPasswordRequest) => {
    console.debug("Submitted values:", values);
    resetPass(values);
  };

  const sendRequest = (values: IResetPasswordRequest) => {
    forgetPass({
      email: values.email,
      resetPasswordLink: `${DOMAIN}/reset-password`,
    })
      .unwrap()
      .then(() => setHasEmail(true))
      .catch(() => console.error("Error asking for code"));
  };

  useEffect(() => {
    if (responseResetPass.isError) {
      console.error("Error sending forget-password request");
    } else if (responseResetPass.isSuccess && responseResetPass.data) {
      goToLogin();
    }
  }, [responseResetPass.isLoading]);

  useEffect(() => {
    if (initialValues.email) {
      sendRequest(initialValues);
    }
  }, []);

  const goToLogin = () => {
    router.navigate("/(auth)/login");
  };

  return (
    <Card style={{ marginHorizontal: "auto", backgroundColor: "white" }}>
      <Card.Content>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={testStyles.defaultContainer}>
              {/* Title */}
              <Text>Reset password</Text>
              <Text>
                {hasEmail
                  ? `Introduce the code sent to your email (${values.email}) then provide your new password.`
                  : "Please provide your email and request code."}
              </Text>

              {!hasEmail ? (
                <InputField
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Email"
                  error={errors.email}
                  touched={touched.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <>
                  {/* OTP Input */}
                  <OtpInput
                    value={values.token}
                    onChange={(value) => handleChange("token")(value)} // Actualiza el campo OTP de Formik
                  />

                  {/* Error for OTP */}
                  {touched.token && errors.token && (
                    <Text style={{ color: Colors.red.primary, fontSize: 12 }}>
                      {errors.token}
                    </Text>
                  )}

                  {/* Password Input */}
                  <InputField
                    onChangeText={handleChange("newPassword")}
                    onBlur={handleBlur("newPassword")}
                    value={values.newPassword}
                    placeholder="New Password"
                    error={errors.newPassword}
                    touched={touched.newPassword}
                    secureTextEntry
                  />
                </>
              )}

              {/* Submit Button */}
              <Btn
                title={hasEmail ? "Reset" : "Request Code"}
                disabled={responseResetPass.isLoading}
                onPress={() =>
                  hasEmail ? handleSubmit() : sendRequest(values)
                }
              />

              {/* Resend code */}
              {hasEmail && (
                <Text
                  style={{
                    color: Colors.blue.primary,
                    marginTop: 20,
                    textAlign: "center",
                  }}
                  onPress={() => sendRequest(values)}
                >
                  Resend Code
                </Text>
              )}
              <View>
                <Btn
                  title="Login"
                  size="small"
                  variant="secondary"
                  onPress={goToLogin}
                />
              </View>
            </View>
          )}
        </Formik>
      </Card.Content>
    </Card>
  );
};

export default ForgotPassword;
