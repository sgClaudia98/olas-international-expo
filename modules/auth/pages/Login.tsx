import React, { useEffect } from "react";
import { FunctionComponent } from "react";
import { Text, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/ui/InputField";
import Btn from "@/components/Btn";
import { testStyles } from "@/styles";
import { useAuthMutation } from "@/modules/auth/services/api/AccountService";
import { Card } from "react-native-paper";
import { setCredentials, User } from "@/modules/auth/slices/authSlice";
import { useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";
import { Link, useRouter } from "expo-router";

interface FormValues {
  email: string;
  password: string;
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
  };
  const onSubmit = (values: FormValues) => {
    auth(values);
  };

  useEffect(() => {
    if (isError) {
      console.error("Error");
    } else if (isSuccess && data) {
      const decoded: any = decodeToken(data.accessToken);
      dispatch(
        setCredentials({
          user: {
            name: decoded?.sub,
            username: decoded?.sub,
            userId: decoded?.sub,
            imageUrl: `https://storageaccountsocial.blob.core.windows.net/avatars/${decoded?.sub}.png`,
          } as User,
          token: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );

      goToMain();
    }
  }, [isLoading]);

  const goToMain = () => {
    router.push("/(main)");
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
              <Text>Welcome back!</Text>
              <Text>Enter your details to continue</Text>

              {/* Input fields */}
              <View style={{ gap: 10 }}>
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
              </View>

              {/* Remember me and forgot password */}
              <View>
                <Link
                  href={{
                    pathname: "/(auth)/reset-password",
                    params: { email: values.email },
                  }}
                >
                  Forgot password?
                </Link>
              </View>

              {/* Login Button */}
              <Btn
                title="Log in"
                onPress={() => handleSubmit()}
                disabled={isLoading}
              />

              {/* Sign up navigation */}
              <Text>
                Don’t have an account?
                <Link href="/(auth)/register">Sign Up</Link>
              </Text>

              {/* Remember me and forgot password */}
              <View>
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
      </Card.Content>
    </Card>
  );
};

export default Login;
