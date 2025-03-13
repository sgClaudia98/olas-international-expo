import React from "react";
import { View, Modal } from "react-native";
import { cartStyles as styles } from "../../styles/cart";
import { Button } from "react-native-paper";
import { CloseIcon } from "@/assets/icons/CloseIcon";

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
            style={{...styles.closeModalButton }}
          >
            <CloseIcon />
          </Button>
          {renderForm(() => setPaymentFormVisible(false))}
        </View>
      </View>
    </Modal>
  );
};

export default PaymentOverlay;
