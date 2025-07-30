import React from "react";
import { View, Modal, ScrollView } from "react-native";
import { paymentFormStyles } from "../../../../styles/reused/paymentForm";
import { Button } from "react-native-paper";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import IconSvg from "@/components/ui/IconSvg";
import { Colors } from "@/styles";

interface PaymentOverlayProps{
  visible: boolean;
  renderForm: (onClose: () => void) => React.JSX.Element;
  setPaymentFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentOverlay = ({
  visible,
  renderForm,
  setPaymentFormVisible,
}: PaymentOverlayProps) => {
  const styles = useResponsiveStyles(paymentFormStyles);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setPaymentFormVisible(false)}
    >
      <ScrollView style={styles.modalScrollContainer} contentContainerStyle={styles.modalScrollContent}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Button
            mode="contained"
            onPress={() => setPaymentFormVisible(false)}
            style={styles.closeModalButton}
            >
            <IconSvg name="Close" color={Colors.black.primary} />
          </Button>
          {renderForm(() => setPaymentFormVisible(false))}
        </View>
      </View>
      </ScrollView>
    </Modal>
  );
};

export default PaymentOverlay;
