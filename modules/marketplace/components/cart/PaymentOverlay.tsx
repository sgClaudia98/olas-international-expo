import React from "react";
import { View, Modal } from "react-native";
import { paymentFormStyles } from "../../styles/paymentForm";
import { Button } from "react-native-paper";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import IconSvg from "@/components/ui/IconSvg";
import { Colors } from "@/styles";

interface PaymentOverlayProps<T extends { id: number }> {
  visible: boolean;
  renderForm: (onClose: () => void) => React.JSX.Element;
  setPaymentFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentOverlay = <T extends { id: number }>({
  visible,
  renderForm,
  setPaymentFormVisible,
}: PaymentOverlayProps<T>) => {
  const styles = useResponsiveStyles(paymentFormStyles);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setPaymentFormVisible(false)}
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
          {renderForm(() => setPaymentFormVisible(false))}
        </View>
      </View>
    </Modal>
  );
};

export default PaymentOverlay;
