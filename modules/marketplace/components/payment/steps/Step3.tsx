import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import { Colors } from "@/styles";
import {
  paymentFormStyles,
} from "@/styles/reused/paymentForm";
import ContentBox from "../ContentBox";
import OrderSection from "../OrderSection";
import { PaymentFormValues } from "../PaymentFormHelper";
import { parsePhoneNumber } from "@/utils/PhoneNumberHelper";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import IconSvg from "@/components/ui/IconSvg";

const Step3 = ({ preview}) => {
  const { values, handleChange } = useFormikContext<PaymentFormValues>();

  const styles = useResponsiveStyles(paymentFormStyles);

  return (
    <>
      <View style={styles.twoColumnContainer}>
        <View style={styles.column}>
          <ContentBox
            title="Client"
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
                value:
                  parsePhoneNumber(
                    values.client.phone.number,
                    values.client.phone.code,
                    1
                  ) || "N/A",
              },
            }}
            backgroundColor={Colors.black.fifth}
            contentBoxStyle={styles.contentBoxStyle}
          />
        </View>
        <View style={styles.column}>
          <ContentBox
            title="Beneficiary"
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
                  `${values.beneficiary.firstName} ${values.beneficiary.lastName}` ||
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
                value:
                  parsePhoneNumber(
                    values.beneficiary.phone.number,
                    values.beneficiary.phone.code,
                    1
                  ) || "N/A",
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
