import React, { FC, useState } from "react";
import { View, Button, Modal, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export type GenericCheckoutButtonProps = {
  checkoutUrl: string;
  onSuccess?: (url: string) => void;
  onCancel?: (url: string) => void;
  label?: string;
  showLabel?: boolean;
  logo?: any;
  disabled?: boolean;
};

const GenericCheckoutButton: FC<GenericCheckoutButtonProps> = ({
  checkoutUrl,
  onSuccess,
  onCancel,
  label = "Pagar",
  showLabel = true,
  logo = null,
  disabled = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openCheckout = () => {
    if (!checkoutUrl || disabled) return;
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={openCheckout}
        disabled={!checkoutUrl || disabled}
        style={[styles.button, disabled && styles.disabled]}
      >
        {logo && <Image source={logo} style={styles.logo} />}
        {showLabel && <Text style={styles.label}>{label}</Text>}
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <WebView
          source={{ uri: checkoutUrl }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          onNavigationStateChange={(navState) => {
            const url = navState.url;
            if (url.includes("success")) {
              closeModal();
              onSuccess?.(url);
            } else if (url.includes("cancel")) {
              closeModal();
              onCancel?.(url);
            }
          }}
        />
        <Button title="Cerrar" onPress={closeModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0070BA",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  label: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
  logo: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  disabled: {
    backgroundColor: "#999",
  },
});

export default GenericCheckoutButton;
