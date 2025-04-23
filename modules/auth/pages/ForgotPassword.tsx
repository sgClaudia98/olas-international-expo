import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import OtpInput from "../components/OtpInput";
import Btn from "@/components/Btn";
import * as Colors from "@/styles/colors";
import InputField from "@/components/ui/InputField";
import {
  useForgetPasswordMutation,
  useResetPasswordMutation,
} from "../services/api/AccountService";

import {
  IForgetPasswordRequest,
  IResetPasswordRequest,
} from "../services/interfaces/account";
import { DOMAIN } from "@/constants";
import { useRouter } from "expo-router";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { ThemedText } from "@/components/ThemedText";
import { authPagesStyles } from "../styles/authPages";
import { useTranslation } from "react-i18next";
import { Toast } from "toastify-react-native";
import Countdown from "../components/Countdown";
// Define the validation schema for params
const paramsValidationSchema = Yup.object({
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .optional(),
  token: Yup.string().length(6).matches(/^\d+$/).optional(),
});
interface ForgotPasswordProps {
  email?: string;
  token?: string;
}

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = (params) => {
  const { t } = useTranslation();
  const router = useRouter();
  const style = useResponsiveStyles(authPagesStyles);

  const [forgetPass, request] = useForgetPasswordMutation();
  const [resetPass, responseResetPass] = useResetPasswordMutation();
  const [countdown, setCountdown] = useState(0);

  const validatedParams = (() => {
    try {
      return paramsValidationSchema.validateSync(params, { abortEarly: false });
    } catch {
      return {};
    }
  })();
  console.debug("Validated Params: ", validatedParams);
  const [hasEmail, setHasEmail] = useState(!!validatedParams?.email);

  const initialValues: IResetPasswordRequest = {
    email: "",
    token: "",
    ...validatedParams,
    newPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        t("FORM.ERRORS.INVALID", {
          field: t("AUTH.FORGOT_PASSWORD.FORM.EMAIL.LABEL"),
        })
      )
      .required(
        t("FORM.ERRORS.REQUIRED", {
          field: t("AUTH.FORGOT_PASSWORD.FORM.EMAIL.LABEL"),
        })
      ),
    token: Yup.string()
      .length(
        6,
        t("FORM.ERRORS.MIN_LENGTH", {
          field: t("AUTH.FORGOT_PASSWORD.FORM.TOKEN.LABEL"),
          length: 6,
        })
      )
      .matches(
        /^\d+$/,
        t("FORM.ERRORS.INVALID", {
          field: t("AUTH.FORGOT_PASSWORD.FORM.TOKEN.LABEL"),
        })
      )
      .required(
        t("FORM.ERRORS.REQUIRED", {
          field: t("AUTH.FORGOT_PASSWORD.FORM.TOKEN.LABEL"),
        })
      ),
    newPassword: Yup.string()
      .min(
        8,
        t("FORM.ERRORS.MIN_LENGTH", {
          field: t("AUTH.FORGOT_PASSWORD.FORM.NEW_PASSWORD.LABEL"),
          length: 8,
        })
      )
      .matches(/[A-Z]/, t("FORM.ERRORS.PASSWORD_UPPERCASE"))
      .matches(/[a-z]/, t("FORM.ERRORS.PASSWORD_LOWERCASE"))
      .matches(/\d/, t("FORM.ERRORS.PASSWORD_DIGIT"))
      .matches(/[@$!%*?&]/, t("FORM.ERRORS.PASSWORD_SPECIAL"))
      .required(
        t("FORM.ERRORS.REQUIRED", {
          field: t("AUTH.FORGOT_PASSWORD.FORM.NEW_PASSWORD.LABEL"),
        })
      ),
  });

  const onSubmit = (values: IResetPasswordRequest) => {
    resetPass(values);
  };

  const sendRequest = (values: IResetPasswordRequest) => {
    forgetPass({
      email: values.email,
      resetPasswordLink: `${DOMAIN}/reset-password`,
    })
      .unwrap()
      .then(() => {
        setCountdown(60);
        setHasEmail(true);
      })
      .catch(() =>
        Toast.error(t("AUTH.FORGOT_PASSWORD.ERRORS.EMAIL_NOT_FOUND"))
      );
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
    <View style={{ ...style.card, maxWidth: 476, marginHorizontal: "auto" }}>
      <View style={style.cardContent}>
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
            <View style={style.container}>
              {/* Title */}
              <View style={style.headerContainer}>
                <ThemedText type="defaultBold" style={style.headerText}>
                  {t("AUTH.FORGOT_PASSWORD.TITLE")}
                </ThemedText>
                <ThemedText style={style.subheaderText}>
                  {hasEmail
                    ? t("AUTH.FORGOT_PASSWORD.SUBTITLE.RESET_PASSWORD", {
                        email: values.email,
                      })
                    : t("AUTH.FORGOT_PASSWORD.SUBTITLE.REQUEST_CODE")}
                </ThemedText>
                {hasEmail && (
                  <ThemedText
                    style={{
                      ...style.subheaderText,
                      color: Colors.blue.primary,
                      fontSize: 11,
                      width: "100%",
                    }}
                    onPress={() => setHasEmail(false)}
                  >
                    {""} {t("AUTH.FORGOT_PASSWORD.SUBTITLE.MODIFY_EMAIL")}
                  </ThemedText>
                )}
              </View>

              <View style={style.formContainer}>
                {!hasEmail ? (
                  <InputField
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder={t(
                      "AUTH.FORGOT_PASSWORD.FORM.EMAIL.PLACEHOLDER"
                    )}
                    error={errors.email}
                    touched={touched.email}
                    keyboardType="email-address"
                    autoComplete="off"
                    autoCapitalize="none"
                  />
                ) : (
                  <>
                    {/* OTP Input */}
                    <OtpInput
                      value={values.token}
                      onChange={(value) => handleChange("token")(value)}
                    />

                    {/* Error for OTP */}
                    {touched.token && errors.token && (
                      <ThemedText
                        style={{ color: Colors.red.primary, fontSize: 12 }}
                      >
                        {errors.token}
                      </ThemedText>
                    )}

                    {/* Password Input */}
                    <InputField
                      onChangeText={handleChange("newPassword")}
                      onBlur={handleBlur("newPassword")}
                      value={values.newPassword}
                      autoComplete="new-password"
                      textContentType="newPassword"
                      placeholder={t(
                        "AUTH.FORGOT_PASSWORD.FORM.NEW_PASSWORD.PLACEHOLDER"
                      )}
                      error={errors.newPassword}
                      touched={touched.newPassword}
                      secureTextEntry
                    />
                  </>
                )}
              </View>
              <View style={style.actionsContainer}>
                {/* Submit Button */}
                <Btn
                  title={
                    hasEmail
                      ? t("AUTH.FORGOT_PASSWORD.BUTTONS.RESET")
                      : t("AUTH.FORGOT_PASSWORD.BUTTONS.REQUEST_CODE")
                  }
                  disabled={responseResetPass.isLoading || request.isLoading}
                  onPress={() =>
                    hasEmail ? handleSubmit() : sendRequest(values)
                  }
                />

                {/* Resend code */}
                {hasEmail &&
                  (countdown ? (
                    <Countdown
                      duration={countdown}
                      style={{
                        ...style.secondaryActionText,
                        color: Colors.black.second,
                      }}
                      storageKey="resendCodeTimeout"
                      onComplete={() => setCountdown(0)}
                    />
                  ) : (
                    <ThemedText
                      style={{
                        ...style.secondaryActionText,
                        color: Colors.blue.primary,
                      }}
                      onPress={() => sendRequest(values)}
                      disabled={request.isLoading}
                    >
                      {t("AUTH.FORGOT_PASSWORD.BUTTONS.RESEND_CODE")}
                    </ThemedText>
                  ))}
                <View>
                  <Btn
                    title={t("AUTH.FORGOT_PASSWORD.BUTTONS.LOGIN")}
                    size="small"
                    variant="secondary"
                    onPress={goToLogin}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default ForgotPassword;
