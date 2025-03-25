import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { FunctionComponent } from "react";
import { Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { testStyles } from "@/styles";
import InputField from "@/components/ui/InputField";
import Btn from "@/components/Btn";
import { IAccountCreateRequest } from "../services/interfaces/account";
// import CheckboxInput from "@/components/CheckboxInput";
import { useSignupMutation } from "../services/api/AccountService";
import { DOMAIN } from "@/constants";
import CheckboxInput from "@/components/ui/CheckboxInput";

import { Card } from "react-native-paper";
import { Link, useRouter } from "expo-router";

interface FormValues extends IAccountCreateRequest {}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  firstName: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string()
    .min(8, "The password must be at least 8 characters long.")
    .matches(
      /[A-Z]/,
      "The password must contain at least one uppercase letter."
    )
    .matches(
      /[a-z]/,
      "The password must contain at least one lowercase letter."
    )
    .matches(/[0-9]/, "The password must contain at least one digit.")
    .matches(
      /[\#\?!@\$%\^&\*\-]/,
      "The password must contain at least one special character (#?!@$%^&*-)."
    )
    .required("Password is required."),
});

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const router = useRouter();
  const [signup, { isLoading, isError, isSuccess, error, data }] =
    useSignupMutation(); // Destructure to get mutation states
  const [email, setEmail] = React.useState("");

  const initialValues: FormValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    activationLink: `${DOMAIN}/verify`,
    receiveNewsLetter: false,
  };
  const onSubmit = (values: FormValues) => {
    setEmail(values.email);
    signup(values);
  };

  useEffect(() => {
    if (isError) {
      console.error("Error");
    } else if (isSuccess && data) {
      router.navigate({ pathname: "/(auth)/verify", params: { email: email } });
    }
  }, [isLoading]);

  return (
    <Card style={{ marginHorizontal: "auto", backgroundColor: "white" }}>
      <Card.Content>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur
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
            <View style={testStyles.defaultContainer}>
              {/* Title */}
              <Text>Nice to meet you!</Text>
              <Text>Provide your info to proceed</Text>

              {/* Input fields */}
              <View style={{ gap: 10 }}>
                {/* Email Input */}
                <InputField
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email}
                  touched={touched.email}
                />
                {/* Name Input */}
                <InputField
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                  placeholder="First Name"
                  autoCapitalize="words"
                  error={errors.firstName}
                  touched={touched.firstName}
                />

                {/* Last name Input */}
                <InputField
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  placeholder="Last Name"
                  autoCapitalize="words"
                  error={errors.lastName}
                  touched={touched.lastName}
                />

                {/* Password Input */}
                <InputField
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="Password"
                  secureTextEntry
                  error={errors.password}
                  touched={touched.password}
                />

                {/* Newsletter Checkbox */}
                <View style={{ paddingHorizontal: 20, maxWidth: "80%" }}>
                  <CheckboxInput
                    label="I accept to be contacted with offers and relevant information."
                    isChecked={values.receiveNewsLetter}
                    onChange={(isChecked) =>
                      setFieldValue("receiveNewsLetter", isChecked)
                    }
                  />
                </View>
              </View>
              <Btn
                title="Sign Up"
                onPress={() => {
                  handleSubmit();
                }}
                disabled={isLoading}
              />
              <Text>
                Already a member?
                <Link href="/(auth)/login">Log In</Link>
              </Text>
            </View>
          )}
        </Formik>
      </Card.Content>
    </Card>
  );
};

export default Register;
