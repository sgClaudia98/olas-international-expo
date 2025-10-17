import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import { Colors } from "@/styles";
import { paymentFormStyles } from "@/styles/reused/paymentForm";
import ContentBox from "../ContentBox";
import OrderSection from "../OrderSection";
import { PaymentFormValues } from "../PaymentFormHelper";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import IconSvg from "@/components/ui/IconSvg";
import { useTranslation } from "react-i18next";
import { formatPhoneNumberInternational } from "@/utils/PhoneNumberHelper";

const Step3 = ({ preview }) => {
  const { values, handleChange } = useFormikContext<PaymentFormValues>();
  const styles = useResponsiveStyles(paymentFormStyles);
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.twoColumnContainer}>
        <View style={styles.column}>
          <ContentBox
            title={t("CUSTOMER_HEADING")}
            data={{
              fullName: {
                icon: (
                  <IconSvg
                    color={Colors.black.primary}
                    name="User2"
                    size={17}
                  />
                ),
                value: values.client.fullName || "N/A",
              },
              email: {
                icon: (
                  <IconSvg
                    color={Colors.black.primary}
                    name="Email"
                    size={17}
                  />
                ),
                value: values.client.email || "N/A",
              },
              phoneNumber: {
                icon: (
                  <IconSvg
                    color={Colors.black.primary}
                    name="Phone"
                    size={17}
                  />
                ),
                value: values.client.phone ? formatPhoneNumberInternational(values.client.phone) : "N/A",
              },
            }}
            backgroundColor={Colors.black.fifth}
            contentBoxStyle={styles.contentBoxStyle}
          />
        </View>

        <View style={styles.column}>
          <ContentBox
            title={t("RECEIVER_HEADING")}
            data={{
              name: {
                icon: (
                  <IconSvg
                    color={Colors.black.primary}
                    name="User2"
                    size={17}
                  />
                ),
                value:
                  `${values.beneficiary.firstName} ${values.beneficiary.lastName}`.trim() ||
                  "N/A",
              },
              identification: {
                icon: (
                  <IconSvg color={Colors.black.primary} name="Id" size={17} />
                ),
                value: values.beneficiary.idDocument || "N/A",
              },
              phoneNumber: {
                icon: (
                  <IconSvg
                    color={Colors.black.primary}
                    name="Phone"
                    size={17}
                  />
                ),
                value: values.beneficiary.phone ? formatPhoneNumberInternational(values.beneficiary.phone) : "N/A",
              },
              address: {
                icon: (
                  <IconSvg
                    color={Colors.black.primary}
                    name="Location"
                    size={17}
                  />
                ),
                value: [
                  values.beneficiary.address?.line1,
                  values.beneficiary.address?.line2,
                  values.beneficiary.address?.city,
                  values.beneficiary.address?.state,
                  values.beneficiary.address?.zipCode,
                ]
                  .filter((value) => value?.trim())
                  .join(", ") || "N/A",
              },
            }}
            backgroundColor={Colors.blue.fifth}
            contentBoxStyle={styles.contentBoxStyle}
          />
        </View>
      </View>

      {preview &&
        preview.details.map((booking) => (
          <OrderSection
            key={booking.id}
            booking={booking}
            note={values.notes[booking.id]}
            onChangeNote={(value) => handleChange(`notes.${booking.id}`)(value)}
          />
        ))}
    </>
  );
};

export default Step3;
