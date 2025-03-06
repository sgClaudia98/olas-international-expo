import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import { Colors } from "@/styles";
import { paymentFormStyles as styles } from "@/modules/marketplace/styles/paymentForm";
import ContentBox from "../ContentBox";
import OrderSection from "../OrderSection";
import { PaymentFormValues } from "../PaymentFormHelper";
import {
  EmailIcon,
  IdIcon,
  MapPinIcon,
  PhoneIcon,
  ProfileIcon,
} from "@/assets/icons/PaymentInfoIcons";

const Step3 = ({ preview }) => {
  const { values, handleChange } = useFormikContext<PaymentFormValues>();

  return (
    <>
      <View style={styles.tablet.twoColumnContainer}>
        <View style={styles.tablet.column}>
          <ContentBox
            title="Client"
            data={{
              fullName: {
                icon: <ProfileIcon />,
                value: values.client.fullName || "N/A",
              },
              email: {
                icon: <EmailIcon />,
                value: values.client.email || "N/A",
              },
              phoneNumber: {
                icon: <PhoneIcon />,
                value: values.client.phone || "N/A",
              },
            }}
            backgroundColor={Colors.black.fifth}
          />
        </View>
        <View style={styles.tablet.column}>
          <ContentBox
            title="Beneficiary"
            data={{
              name: {
                icon: <ProfileIcon />,
                value:
                  `${values.beneficiary.firstName} ${values.beneficiary.lastName}` ||
                  "N/A",
              },
              identification: {
                icon: <IdIcon />,
                value: values.beneficiary.idDocument || "N/A",
              },
              phoneNumber: {
                icon: <PhoneIcon />,
                value: values.beneficiary.phone || "N/A",
              },
              address: {
                icon: <MapPinIcon />,
                value: [
                  values.beneficiary.address?.line1,
                  values.beneficiary.address?.line2,
                  values.beneficiary.address?.city,
                  values.beneficiary.address?.state,
                  values.beneficiary.address?.zipCode,
                ]
                  .filter((value) => value?.trim())
                  .join(", "),
              },
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
