import { RouteProp, StackActions, useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { FunctionComponent } from "react";
import { Text, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import OtpInput from "../components/OtpInput"; // Usa el componente OTP que construimos
import Btn from "@/components/Btn";
import { testStyles } from "@/styles";
import * as Colors from "@/styles/colors";
import {
  useSendVerificationCodeMutation,
  useVerifyMutation,
} from "@/modules/auth/services/api/AccountService";
import { IVerifyRequest } from "@/modules/auth/services/interfaces/account";
import { DOMAIN } from "@/constants";
import { Card } from "react-native-paper";

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
  const { token, email } = params;
  const [verify, { isLoading, isError, isSuccess, error, data }] =
    useVerifyMutation(); // Destructure to get mutation states
  const [sendVerification, _] = useSendVerificationCodeMutation();
  const initialValues: IVerifyRequest = {
    token: token ?? "",
    email,
  };

  const onSubmit = (values: IVerifyRequest) => {
    console.debug("Submitted:", values);
    verify(values);
  };

  useEffect(() => {
    if (isError) {
      //TODO:  Manejar error de token expired
      console.error("Error");
    } else if (isSuccess && data) {
      navigation.dispatch(StackActions.replace("Auth", { screen: "Login" }));
    }
  }, [isLoading]);

  const resendCode = (values: IVerifyRequest) => {
    sendVerification({
      email: values.email,
      verificationLink: `${DOMAIN}/verify`,
    })
      .unwrap()
      .then(() => console.log("Sent code to email"))
      .catch(() => console.error("Error sendind code again"));
  };

  useEffect(() => {
    if (initialValues.token) {
      onSubmit(initialValues);
    }
  }, []);

  //TODO: countdown for resend code

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
              <Text>Verify your account</Text>
              <Text>
                Enter the 6-digit code we sent to your email ({values.email}).
              </Text>

              {/* OTP Input */}
              <OtpInput
                value={values.token}
                onChange={(value) => handleChange("token")(value)} // Actualiza el campo token de Formik
              />

              {/* Error Message */}
              {touched.token && errors.token && (
                <Text style={{ color: Colors.red.primary, fontSize: 12 }}>
                  {errors.token}
                </Text>
              )}

              {/* Submit Button */}
              <Btn
                title="Verify"
                onPress={() => handleSubmit()}
                disabled={isLoading}
              />

              {/* Resend code */}
              <Text onPress={() => resendCode(values)}>Resend code</Text>
            </View>
          )}
        </Formik>
      </Card.Content>
    </Card>
  );
};

export default Verify;
