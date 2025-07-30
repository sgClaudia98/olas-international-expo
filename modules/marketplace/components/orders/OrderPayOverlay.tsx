import React from "react";
import { View, Modal, ScrollView } from "react-native";
import { paymentFormStyles } from "../../../../styles/reused/paymentForm";
import { Button } from "react-native-paper";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import IconSvg from "@/components/ui/IconSvg";
import { Colors } from "@/styles";
import OrderPayForm from "./OrderPayForm";
import { UIBooking } from "../../utils/bookingMapping";

interface PaymentOverlayProps {
  visible: boolean;
  setPaymentFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  preview: UIBooking;
}

const OrderPayOverlay = ({
  visible,
  setPaymentFormVisible,
  preview,
}: PaymentOverlayProps) => {
  const styles = useResponsiveStyles(paymentFormStyles);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setPaymentFormVisible(false)}
    >
      <ScrollView
        style={styles.modalScrollContainer}
        contentContainerStyle={styles.modalScrollContent}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Button
              mode="contained"
              onPress={() => setPaymentFormVisible(false)}
              style={styles.closeModalButton}
            >
              <IconSvg name="Close" color={Colors.black.primary} />
            </Button>
            <OrderPayForm
              onClose={() => setPaymentFormVisible(false)}
              preview={preview}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default OrderPayOverlay;
