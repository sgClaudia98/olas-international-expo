import { RouteProp, StackActions, useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import OtpInput from "../components/OtpInput"; // Usa el componente OTP que construimos
import Btn from "@/components/Btn";
import { testStyles } from "@/styles";
import * as Colors from "@/styles/colors";
import {
  useSendVerificationCodeMutation,
  useVerifyMutation,
} from "../services/api/AccountService";
import { IVerifyRequest } from "../services/interfaces/account";
import { DOMAIN } from "@/constants";
import { Card } from "react-native-paper";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { cardStyle } from "@/styles/card";
import { ThemedText } from "@/components/ThemedText";
import { authPagesStyles } from "../styles/authPages";
import { useTranslation } from "react-i18next";
import Countdown from "../components/Countdown";

const validationSchema = Yup.object({
  token: Yup.string()
    .length(6, "Must be exactly 6 digits")
    .matches(/^\d+$/, "Must only contain numbers")
    .required("Code is required"),
});
interface VerifyProps {
  email: string;
  token?: string;
}

const Verify: FunctionComponent<VerifyProps> = (params) => {
  const navigation = useNavigation();
  const style = useResponsiveStyles(authPagesStyles);
  const { token, email } = params;
  const [verify, { isLoading, isError, isSuccess, error, data }] =
    useVerifyMutation(); // Destructure to get mutation states
  const [sendVerification, _] = useSendVerificationCodeMutation();
  const [countdown, setCountdown] = useState(0);
  const initialValues: IVerifyRequest = {
    token: token ?? "",
    email,
  };

  const { t } = useTranslation();

  const onSubmit = (values: IVerifyRequest) => {
    verify(values);
  };

  useEffect(() => {
    if (isError) {
      //TODO:  Manejar error de token expired
      console.error("Error");
    } else if (isSuccess && (data as any)) {
      navigation.dispatch(StackActions.replace("Auth", { screen: "Login" }));
    }
  }, [isLoading]);

  const resendCode = (values: IVerifyRequest) => {
    sendVerification({
      email: values.email,
      verificationLink: `${DOMAIN}/verify`,
    })
      .unwrap()
      .then(() => {
        setCountdown(60);
      })
      .catch(() => console.error("Error sendind code again"));
  };

  useEffect(() => {
    if (initialValues.token) {
      onSubmit(initialValues);
    }
  }, []);

  //TODO: countdown for resend code

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
                  {t("AUTH.VERIFY.TITLE")}
                </ThemedText>
                <ThemedText style={style.subheaderText}>
                  {t("AUTH.VERIFY.SUBTITLE.DEFAULT", { email: values.email })}
                </ThemedText>
              </View>
              <View style={style.formContainer}>
                {/* OTP Input */}
                <OtpInput
                  value={values.token}
                  onChange={(value) => handleChange("token")(value)}
                  //  placeholder={t("AUTH.VERIFY.FORM.TOKEN.PLACEHOLDER")}
                />

                {/* Error Message */}
                {touched.token && errors.token && (
                  <ThemedText
                    style={{ color: Colors.red.primary, fontSize: 12 }}
                  >
                    {errors.token}
                  </ThemedText>
                )}
              </View>

              <View style={style.actionsContainer}>
                {/* Submit Button */}
                <Btn
                  title={t("AUTH.VERIFY.BUTTONS.VERIFY")}
                  onPress={() => handleSubmit()}
                  disabled={isLoading}
                />

                {/* Resend code */}
                {countdown ? (
                  <Countdown
                    duration={countdown}
                    style={style.secondaryActionText}
                    storageKey="resendCodeTimeout"
                    onComplete={() => setCountdown(0)}
                  />
                ) : (
                  <ThemedText
                    style={style.secondaryActionText}
                    onPress={() => resendCode(values)}
                  >
                    {t("AUTH.VERIFY.BUTTONS.RESEND_CODE")}
                  </ThemedText>
                )}
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Verify;
