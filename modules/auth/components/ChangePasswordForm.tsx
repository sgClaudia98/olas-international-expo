import React from "react";
import { Formik } from "formik";
import { View } from "react-native";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Toast } from "toastify-react-native";
import PasswordInput from "@/components/ui/PasswordInput";
import Btn from "@/components/Btn";
import { ThemedText } from "@/components/ThemedText";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { profileStyles } from "../styles/profile";
import { useChangePasswordMutation } from "../services/api/AccountService";
import { Colors } from "@/styles";

interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ChangePasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const styles = useResponsiveStyles(profileStyles);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const initialValues: ChangePasswordFormValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .min(
        8,
        t("FORM.ERRORS.MIN_LENGTH", {
          field: t("AUTH.CHANGE_PASSWORD.FORM.CURRENT_PASSWORD.LABEL"),
          length: 8,
        })
      )
      .required(
        t("FORM.ERRORS.REQUIRED", {
          field: t("AUTH.CHANGE_PASSWORD.FORM.CURRENT_PASSWORD.LABEL"),
        })
      ),
    newPassword: Yup.string()
      .min(
        8,
        t("FORM.ERRORS.MIN_LENGTH", {
          field: t("AUTH.CHANGE_PASSWORD.FORM.NEW_PASSWORD.LABEL"),
          length: 8,
        })
      )
      .matches(/[A-Z]/, t("FORM.ERRORS.PASSWORD_UPPERCASE"))
      .matches(/[a-z]/, t("FORM.ERRORS.PASSWORD_LOWERCASE"))
      .matches(/\\d/, t("FORM.ERRORS.PASSWORD_DIGIT"))
      .matches(/[@$!%*?&]/, t("FORM.ERRORS.PASSWORD_SPECIAL"))
      .required(
        t("FORM.ERRORS.REQUIRED", {
          field: t("AUTH.CHANGE_PASSWORD.FORM.NEW_PASSWORD.LABEL"),
        })
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        t("FORM.ERRORS.PASSWORDS_MUST_MATCH")
      )
      .required(
        t("FORM.ERRORS.REQUIRED", {
          field: t("AUTH.CHANGE_PASSWORD.FORM.CONFIRM_PASSWORD.LABEL"),
        })
      ),
  });

  const onSubmit = async (
    values: ChangePasswordFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap();

      Toast.success(t("AUTH.CHANGE_PASSWORD.SUCCESS"));
      resetForm();
    } catch (error) {
      console.error("Change password error:", error);
      Toast.error(t("AUTH.CHANGE_PASSWORD.ERROR"));
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <ThemedText style={styles.cardHeaderText}>
          {t("AUTH.CHANGE_PASSWORD.TITLE")}
        </ThemedText>
      </View>
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
          isValid,
          dirty,
        }) => (
          <>
            <View style={styles.cardContent}>
              <View style={styles.formContainer}>
                {/* Current Password */}
                <View style={styles.formRow}>
                  <View style={styles.formColumn}>
                    <ThemedText
                      lightColor={Colors.black.second}
                      style={styles.formLabel}
                    >
                      {t("AUTH.CHANGE_PASSWORD.FORM.CURRENT_PASSWORD.LABEL")}
                    </ThemedText>
                    <PasswordInput
                      onChangeText={handleChange("oldPassword")}
                      onBlur={handleBlur("oldPassword")}
                      value={values.oldPassword}
                      placeholder={t("AUTH.CHANGE_PASSWORD.FORM.CURRENT_PASSWORD.PLACEHOLDER")}
                      error={errors.oldPassword}
                      touched={touched.oldPassword}
                    />
                  </View>
                </View>

                {/* New Password */}
                <View style={styles.formRow}>
                  <View style={styles.formColumn}>
                    <ThemedText
                      lightColor={Colors.black.second}
                      style={styles.formLabel}
                    >
                      {t("AUTH.CHANGE_PASSWORD.FORM.NEW_PASSWORD.LABEL")}
                    </ThemedText>
                    <PasswordInput
                      onChangeText={handleChange("newPassword")}
                      onBlur={handleBlur("newPassword")}
                      value={values.newPassword}
                      placeholder={t("AUTH.CHANGE_PASSWORD.FORM.NEW_PASSWORD.PLACEHOLDER")}
                      error={errors.newPassword}
                      touched={touched.newPassword}
                      autoComplete="new-password"
                      textContentType="newPassword"
                    />
                  </View>
                </View>

                {/* Confirm Password */}
                <View style={styles.formRow}>
                  <View style={styles.formColumn}>
                    <ThemedText
                      lightColor={Colors.black.second}
                      style={styles.formLabel}
                    >
                      {t("AUTH.CHANGE_PASSWORD.FORM.CONFIRM_PASSWORD.LABEL")}
                    </ThemedText>
                    <PasswordInput
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                      placeholder={t("AUTH.CHANGE_PASSWORD.FORM.CONFIRM_PASSWORD.PLACEHOLDER")}
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                      autoComplete="new-password"
                      textContentType="newPassword"
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <Btn
                title={t("AUTH.CHANGE_PASSWORD.BUTTONS.CHANGE_PASSWORD")}
                disabled={!isValid || !dirty || isLoading}
                onPress={() => handleSubmit()}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};