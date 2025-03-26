import React from "react";
import { Formik } from "formik";
import { IAccountResponse } from "../services/interfaces/account";
import { parseStringToPhoneNumber } from "@/modules/marketplace/components/payment/PhoneNumberHelper";
import { ThemedText } from "@/components/ThemedText";
import { TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import PhoneNumberSelector from "@/modules/marketplace/components/payment/PhoneNumberSelector";
import { Toast } from "toastify-react-native";
import { Colors } from "@/styles";
import { useTranslation } from "react-i18next";
import { profileStyles } from "../styles/profile";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";

interface UpdateProfileFormProps {
  profile: IAccountResponse;
}

export const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({ profile }) => {
  const { t } = useTranslation();
  const styles = useResponsiveStyles(profileStyles)

  const initialValues = {
    firstName: profile.client.firstName ?? "",
    lastName: profile.client.lastName ?? "",
    phone: profile.client.phone
      ? parseStringToPhoneNumber(profile.client.phone)
      : {
          number: "",
          code: "",
        },
    email: profile.client.email ?? "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => Toast.success("Editing profile info")}
    >
      {({
        handleChange,
        handleBlur,
        errors,
        values,
        isSubmitting,
        validateForm,
      }) => (
        <View style={styles.formContainer}>
          <View style={styles.formRow}>
            <View style={styles.formColumn}>
              <ThemedText
                lightColor={Colors.black.second}
                style={styles.formLabel}
              >
                {t("FORMLABEL.FIRST_NAME")}
              </ThemedText>
              <TextInput
                style={styles.formInput}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName || ""}
                textColor={Colors.black.primary}
                placeholderTextColor={Colors.black.primary}
                error={!!errors.firstName}
              />
              {errors.firstName && (
                <ThemedText lightColor={Colors.red.primary}>
                  {errors.firstName}
                </ThemedText>
              )}
            </View>
            <View style={styles.formColumn}>
              <ThemedText
                lightColor={Colors.black.second}
                style={styles.formLabel}
              >
                {t("FORMLABEL.LAST_NAME")}
              </ThemedText>
              <TextInput
                style={styles.formInput}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName || ""}
                textColor={Colors.black.primary}
                placeholderTextColor={Colors.black.primary}
                error={!!errors.lastName}
              />
              {errors.lastName && (
                <ThemedText lightColor={Colors.red.primary}>
                  {errors.lastName}
                </ThemedText>
              )}
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={styles.formColumn}>
              <ThemedText
                lightColor={Colors.black.second}
                style={styles.formLabel}
              >
                {t("FORMLABEL.PHONE_NUMBER")}
              </ThemedText>
              <PhoneNumberSelector
                inputStyles={{ ...styles.formInput, marginBottom: 0 }}
                name="phone"
                defaultCountryCode="US"
                error={!!errors.phone?.number}
              />
              {errors.phone?.number && (
                <ThemedText lightColor={Colors.red.primary}>
                  {errors.phone?.number}
                </ThemedText>
              )}
            </View>
            <View style={styles.formColumn}>
              <ThemedText
                lightColor={Colors.black.second}
                style={styles.formLabel}
              >
                {t("FORMLABEL.EMAIL")}
              </ThemedText>
              <TextInput
                style={styles.formInput}
                inputMode="email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email || ""}
                textColor={Colors.black.primary}
                placeholderTextColor={Colors.black.primary}
                error={!!errors.email}
              />
              {errors.email && (
                <ThemedText lightColor={Colors.red.primary}>
                  {errors.email}
                </ThemedText>
              )}
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};
