import { Colors } from "@/styles";
import React, { FC, useState, Fragment } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Switch,
} from "react-native";
import { paymentIcons } from "../utils/mapPaymentIcon";
import { PayPalBig } from "@/components/icons";
import { useTranslation } from "react-i18next";

type PaymentMethod = {
  id: string;
  name: string;
  fee: number;
};

interface PaymentButtonsProps {
  paymentMethods: PaymentMethod[];
  amount: number;
  selectedMethod?: string;
  setSelectedMethod: (id: string) => void;
}

const PaymentButtons: FC<PaymentButtonsProps> = ({
  paymentMethods,
  amount,
  selectedMethod,
  setSelectedMethod,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.method,
              selectedMethod === item.id && styles.methodSelected,
            ]}
            onPress={() => setSelectedMethod(item.id)}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={styles.radioButton}>
                  {selectedMethod === item.id && (
                    <View style={styles.radioButtonSelected} />
                  )}
                </View>
                <View>
                  <Text style={styles.methodText}>{item.name}</Text>
                  <Text style={styles.feeText}>${item.fee} {t("FEE")}</Text>
                </View>
              </View>
              {paymentIcons.hasOwnProperty(item.id) && (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                  {paymentIcons[item.id].map((IconComponent, index) => (
                      <IconComponent  key={index} />
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PaymentButtons;

const styles = StyleSheet.create({
  container: { flex: 1 },
  method: {
    padding: 18,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: Colors.black.fifth,
  },
  methodSelected: {
    backgroundColor: Colors.blue.fifth,
  },
  methodText: {
    fontSize: 16,
    color: Colors.black.primary,
    fontWeight: "600",
  },
  feeText: {
    fontSize: 14,
    color: Colors.black.second,
    marginTop: 4
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.black.second,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.blue.primary,
  },
});
