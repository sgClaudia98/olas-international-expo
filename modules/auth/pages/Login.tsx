import React, { useEffect } from "react";
import { FunctionComponent } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/ui/InputField";
import Btn from "@/components/Btn";
import { Colors } from "@/styles";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { authPagesStyles } from "../styles/authPages";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const style = useResponsiveStyles(authPagesStyles);
  const [isLoading, setIsLoading] = React.useState(false);
  const { login } = useAuth();

  const initialValues: FormValues = {
    email: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        t("FORM.ERRORS.INVALID", { field: t("AUTH.LOGIN.FORM.EMAIL.LABEL") })
      )
      .required(
        t("FORM.ERRORS.REQUIRED", { field: t("AUTH.LOGIN.FORM.EMAIL.LABEL") })
      ),
    password: Yup.string()
      .min(
        8,
        t("FORM.ERRORS.MIN_LENGTH", {
          field: t("AUTH.LOGIN.FORM.PASSWORD.LABEL"),
          length: 8,
        })
      )
      .required(
        t("FORM.ERRORS.REQUIRED", {
          field: t("AUTH.LOGIN.FORM.PASSWORD.LABEL"),
        })
      ),
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      await login(values);
      // ✅ Login exitoso
      console.log("Login successful");
      // Redirigir o mostrar mensaje de éxito
      router.replace("/(main)");
    } catch (error) {
      // ❌ Login falló
      console.error("Login failed:", error);
      //TODO: Mostrar mensaje de error al usuario
    } finally {
      setIsLoading(false);
    }
  };

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
                  {t("AUTH.LOGIN.TITLE")}
                </ThemedText>
                <ThemedText style={style.subheaderText}>
                  {t("AUTH.LOGIN.SUBTITLE")}
                </ThemedText>
              </View>
              {/* Input fields */}
              <View style={style.formContainer}>
                {/* Email Input */}
                <InputField
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder={t("AUTH.LOGIN.FORM.EMAIL.PLACEHOLDER")}
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
                  placeholder={t("AUTH.LOGIN.FORM.PASSWORD.PLACEHOLDER")}
                  error={errors.password}
                  touched={touched.password}
                  secureTextEntry
                />

                {/* Remember me and forgot password */}
                <View
                  style={{
                    ...style.formRow,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  {/* Remember me checkbox 
                  <CheckboxInput
                    label="Remember me"
                    isChecked={values.remember}
                    onChange={(value) => setFieldValue("remember", value)}
                    labelStyle={{ fontSize: 14, lineHeight:20,  color: Colors.black.primary }}
                  />
                  */}
                  <Link
                    href={{
                      pathname: "/(auth)/reset-password",
                      params: { email: values.email },
                    }}
                    style={{ color: Colors.blue.primary }}
                  >
                    {t("AUTH.LOGIN.BUTTONS.FORGOT_PASSWORD")}
                  </Link>
                </View>
              </View>

              <View style={style.actionsContainer}>
                {/* Login Button */}
                <Btn
                  title={t("AUTH.LOGIN.BUTTONS.LOGIN")}
                  onPress={() => handleSubmit()}
                  disabled={isLoading}
                />

                {/* Sign up navigation */}
                <ThemedText style={style.secondaryActionText}>
                  {t("AUTH.LOGIN.BUTTONS.NO_ACCOUNT")}{" "}
                  <Link
                    href="/(auth)/register"
                    style={{ color: Colors.blue.primary }}
                  >
                    {t("AUTH.LOGIN.BUTTONS.SIGN_UP")}
                  </Link>
                </ThemedText>
                <Btn
                  title={t("AUTH.LOGIN.BUTTONS.OMIT_BUTTON")}
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
