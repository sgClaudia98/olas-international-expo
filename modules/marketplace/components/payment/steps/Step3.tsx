import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import { Colors } from "@/styles";
import { paymentFormStyles as styles } from "@/modules/marketplace/styles/paymentForm";
import ContentBox from "../ContentBox";
import OrderSection from "../OrderSection";
import { PaymentFormValues } from "../PaymentFormHelper";

const Step3 = ({ preview }) => {
  const { values, handleChange } = useFormikContext<PaymentFormValues>();

  return (
    <>
      <View style={styles.tablet.twoColumnContainer}>
        <View style={styles.tablet.column}>
          <ContentBox
            title="Client"
            data={{
              fullName: values.client.fullName || "",
              email: values.client.email || "",
              phoneNumber: values.client.phone || "",
            }}
            backgroundColor={Colors.black.fifth}
          />
        </View>
        <View style={styles.tablet.column}>
          <ContentBox
            title="Beneficiary"
            data={{
              name:
                values.beneficiary.firstName +
                " " +
                values.beneficiary.lastName,
              identification: values.beneficiary.idDocument || "",
              phoneNumber: values.beneficiary.phone || "",
              address: values.beneficiary.address?.line1 || "",
            }}
            backgroundColor={Colors.blue.fifth}
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
