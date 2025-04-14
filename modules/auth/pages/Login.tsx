import React, { useEffect } from "react";
import { FunctionComponent } from "react";
import { Text, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/ui/InputField";
import Btn from "@/components/Btn";
import { Colors, testStyles } from "@/styles";
import { useAuthMutation } from "../services/api/AccountService";
import { Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";
import { Link, useRouter } from "expo-router";
import { fetchUserProfileThunk } from "../slices/authThunks";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { authPagesStyles } from "../styles/authPages";
import { ThemedText } from "@/components/ThemedText";
import CheckboxInput from "@/components/ui/CheckboxInput";
import { set } from "lodash";

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const router = useRouter();
  const style = useResponsiveStyles(authPagesStyles);
  const [auth, { isLoading, isError, isSuccess, error, data }] =
    useAuthMutation(); // Destructure to get mutation states

  if (!auth) {
    console.error("auth is undefined");
  }
  const dispatch = useDispatch();

  if (!dispatch) {
    console.error("dispatch function is undefined");
  }
  const initialValues: FormValues = {
    email: "",
    password: "",
    remember: false,
  };
  const onSubmit = (values: FormValues) => {
    auth(values);
  };

  useEffect(() => {
    if (isError) {
      console.error("Error");
    } else if (isSuccess && data) {
      goToMain();
    }
  }, [isLoading]);

  const goToMain = () => {
    router.push("/(main)");
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
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={style.container}>
              {/* Title */}
              <View style={style.headerContainer}>
                <ThemedText type="defaultBold" style={style.headerText}>
                  Welcome!
                </ThemedText>
                <ThemedText style={style.subheaderText}>
                  Enter your details to continue
                </ThemedText>
              </View>
              {/* Input fields */}
              <View style={style.formContainer}>
                {/* Email Input */}
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

                {/* Password Input */}
                <InputField
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="Password"
                  error={errors.password}
                  touched={touched.password}
                  secureTextEntry
                />

                {/* Remember me and forgot password */}
                <View
                  style={{
                    ...style.formRow,
                    justifyContent: 'flex-end', // "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  {/* Remember me checkbox 
                  <CheckboxInput
                    label="Remember me"
                    isChecked={values.remember}
                    onChange={(value) => setFieldValue("remember", value)}
                    labelStyle={{ fontSize: 14, color: Colors.black.primary }}
                  />
                  */}
                  <Link
                    href={{
                      pathname: "/(auth)/reset-password",
                      params: { email: values.email },
                    }}
                    style={{ color: Colors.blue.primary }}
                  >
                    Forgot password?
                  </Link>
                </View>
              </View>

              <View style={style.actionsContainer}>
                {/* Login Button */}
                <Btn
                  title="Log in"
                  onPress={() => handleSubmit()}
                  disabled={isLoading}
                />

                {/* Sign up navigation */}

                <ThemedText style={style.secondaryActionText}>
                  {"Don’t have an account? "}
                  <Link
                    href="/(auth)/register"
                    style={{ color: Colors.blue.primary }}
                  >
                    Sign Up
                  </Link>
                </ThemedText>
                <Btn
                  title="Omit"
                  size="small"
                  variant="secondary"
                  onPress={goToMain}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Login;
