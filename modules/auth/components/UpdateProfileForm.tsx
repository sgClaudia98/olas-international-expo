import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import { IAccountResponse } from "../services/interfaces/account";
import {
  parsePhoneNumber,
  parseStringToPhoneNumber,
} from "@/utils/PhoneNumberHelper";
import { ThemedText } from "@/components/ThemedText";
import { TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import PhoneNumberSelector from "@/components/PhoneNumberSelector";
import { Toast } from "toastify-react-native";
import { Colors } from "@/styles";
import { TransWithoutContext, useTranslation } from "react-i18next";
import { profileStyles } from "../styles/profile";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { validationSchema } from "./UpdateProfileFormHelper";
import Btn from "@/components/Btn";
import { useProfileMutation } from "../services/api/AccountService";
import { isEqual } from "lodash";
import { Client } from "../models/ClientModel";

interface UpdateProfileFormProps {
  profile: IAccountResponse;
}

interface FormikValues {
  firstName: string;
  lastName: string;
  phone: {
    code: any;
    number: any;
  };
  email: string;
}

function mapClient(client?: Client) {
  return {
    firstName: client?.firstName ?? "",
    lastName: client?.lastName ?? "",
    phone: client?.phone
      ? parseStringToPhoneNumber(client.phone)
      : {
          number: undefined,
          code: undefined,
        },
    email: client?.email ?? "",
  };
}

export const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  profile,
}) => {
  const { t, i18n } = useTranslation();
  const styles = useResponsiveStyles(profileStyles);
  const [updateProfile] = useProfileMutation();

  const initialValues: FormikValues = mapClient(profile?.client);
  console.debug("init", initialValues);
  const onSave = (values: FormikValues, { resetForm }) => {
    console.debug(values, "Vals");
    updateProfile({
      lastName: values.lastName,
      firstName: values.firstName,
      phone: parsePhoneNumber(values.phone.number, values.phone.code, 0) || "",
      preferredLanguage: i18n.language,
      receiveNewsLetter: false,
    })
      .unwrap()
      .then((resp) => {
        if (resp.success) {
          Toast.success(t("MESSAGES.SUCCESS_PROFILE_UPDATE"));
          resetForm({ values });
        } else {
          Toast.error(t("MESSAGES.ERROR_PROFILE_UPDATE"));
        }
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSave}
    >
      {({
        handleChange,
        handleBlur,
        errors,
        values,
        isSubmitting,
        touched,
        validateForm,
        submitForm,
      }) => (
        <>
          <View style={styles.cardContent}>
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
                      {errors.phone?.number as string}
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
          </View>
          <View style={{ ...styles.cardFooter }}>
            <Btn
              title={t("ACTIONS.SAVE_CHANGES")}
              disabled={isEqual(values, initialValues)}
              onPress={submitForm}
            />
          </View>
        </>
      )}
    </Formik>
  );
};
