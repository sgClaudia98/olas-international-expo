import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { FunctionComponent } from "react";
import { View } from "react-native";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/ui/InputField";
import Btn from "@/components/Btn";
import CheckboxInput from "@/components/ui/CheckboxInput";
import { Link, useRouter } from "expo-router";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { ThemedText } from "@/components/ThemedText";
import { authPagesStyles } from "../styles/authPages";
import { useTranslation } from "react-i18next";
import { DOMAIN } from "@/constants";
import { useSignupMutation } from "../services/api/AccountService";
import { IAccountCreateRequest } from "../services/interfaces/account";
import { Colors } from "@/styles";
import { Toast } from "toastify-react-native";

interface FormValues extends IAccountCreateRequest {}

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const style = useResponsiveStyles(authPagesStyles);
  const [signup, { isLoading, isError, isSuccess, error, data }] =
    useSignupMutation();
  const [email, setEmail] = React.useState("");

  const initialValues: FormValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    activationLink: `${DOMAIN}/verify`,
    receiveNewsLetter: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(
        t("FORM.ERRORS.INVALID", { field: t("AUTH.REGISTER.FORM.EMAIL.LABEL") })
      )
      .required(
        t("FORM.ERRORS.REQUIRED", {
          field: t("AUTH.REGISTER.FORM.EMAIL.LABEL"),
        })
      ),
    firstName: Yup.string().required(
      t("FORM.ERRORS.REQUIRED", {
        field: t("AUTH.REGISTER.FORM.FIRST_NAME.LABEL"),
      })
    ),
    lastName: Yup.string().required(
      t("FORM.ERRORS.REQUIRED", {
        field: t("AUTH.REGISTER.FORM.LAST_NAME.LABEL"),
      })
    ),
    password: Yup.string()
      .min(
        8,
        t("FORM.ERRORS.MIN_LENGTH", {
          field: t("AUTH.REGISTER.FORM.PASSWORD.LABEL"),
          length: 8,
        })
      )
      .matches(/[A-Z]/, t("FORM.ERRORS.PASSWORD_UPPERCASE"))
      .matches(/[a-z]/, t("FORM.ERRORS.PASSWORD_LOWERCASE"))
      .matches(/[0-9]/, t("FORM.ERRORS.PASSWORD_DIGIT"))
      .matches(/[\#\?!@\$%\^&\*\-]/, t("FORM.ERRORS.PASSWORD_SPECIAL"))
      .required(
        t("FORM.ERRORS.REQUIRED", {
          field: t("AUTH.REGISTER.FORM.PASSWORD.LABEL"),
        })
      ),
  });

  const onSubmit = (values: FormValues) => {
    setEmail(values.email);
    signup(values);
  };

  useEffect(() => {
    if (isError) {
      if (error && "data" in error) {
        const errorData = (error.data as any).Error?.InnerErrors as any[];
        if (errorData) {
          const errorCode = errorData[0]?.Code;
          if (errorCode) {
            const errorMessage = t(`ERROR_CODE.${errorCode}`, {
              defaultValue: t("ERROR_CODE.UNKNOWN_ERROR"),
            });
            Toast.error(errorMessage);
          }
        } else {
          Toast.error(t("ERROR_CODE.UNKNOWN_ERROR"));
        }
      }
      console.error("Error");
    } else if (isSuccess && data) {
      router.push({ pathname: "/(auth)/verify", params: { email: email } });
    }
  }, [isLoading]);

  return (
    <View style={{ ...style.card, maxWidth: 476, marginHorizontal: "auto" }}>
      <View style={style.cardContent}>
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
            <View style={style.container}>
              {/* Title */}
              <View style={style.headerContainer}>
                <ThemedText type="defaultBold" style={style.headerText}>
                  {t("AUTH.REGISTER.TITLE")}
                </ThemedText>
                <ThemedText style={style.subheaderText}>
                  {t("AUTH.REGISTER.SUBTITLE")}
                </ThemedText>
              </View>

              {/* Input fields */}
              <View style={style.formContainer}>
                {/* First Name Input */}
                <InputField
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                  placeholder={t("AUTH.REGISTER.FORM.FIRST_NAME.PLACEHOLDER")}
                  autoCapitalize="words"
                  error={errors.firstName}
                  keyboardType="default"
                  autoComplete="name"
                  touched={touched.firstName}
                />
                {/* Last Name Input */}
                <InputField
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  placeholder={t("AUTH.REGISTER.FORM.LAST_NAME.PLACEHOLDER")}
                  autoCapitalize="words"
                  keyboardType="default"
                  autoComplete="family-name"
                  error={errors.lastName}
                  touched={touched.lastName}
                />
                {/* Email Input */}
                <InputField
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder={t("AUTH.REGISTER.FORM.EMAIL.PLACEHOLDER")}
                  keyboardType="email-address"
                  autoComplete="email"
                  error={errors.email}
                  touched={touched.email}
                />
                {/* Password Input */}
                <InputField
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder={t("AUTH.REGISTER.FORM.PASSWORD.PLACEHOLDER")}
                  secureTextEntry
                  autoComplete="new-password"
                  textContentType="newPassword"
                  autoCapitalize="none"
                  error={errors.password}
                  touched={touched.password}
                />
                {/* Newsletter Checkbox */}
                <View style={{ paddingHorizontal: 20, flexWrap: "wrap" }}>
                  <CheckboxInput
                    label={t("AUTH.REGISTER.FORM.NEWSLETTER.LABEL")}
                    isChecked={values.receiveNewsLetter}
                    labelStyle={{
                      fontSize: 14,
                      lineHeight: 20,
                      color: Colors.black.primary,
                    }}
                    onChange={(isChecked) =>
                      setFieldValue("receiveNewsLetter", isChecked)
                    }
                  />
                </View>
              </View>
              <View style={style.actionsContainer}>
                <Btn
                  title={t("AUTH.REGISTER.BUTTONS.SIGN_UP")}
                  onPress={() => {
                    handleSubmit();
                  }}
                  disabled={isLoading}
                />
                <ThemedText style={style.secondaryActionText}>
                  {t("AUTH.REGISTER.BUTTONS.ALREADY_MEMBER")}{" "}
                  <Link
                    href="/(auth)/login"
                    style={{ color: Colors.blue.primary }}
                  >
                    {t("AUTH.REGISTER.BUTTONS.LOG_IN")}
                  </Link>
                </ThemedText>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Register;
