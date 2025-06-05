import { Colors } from "@/styles";
import React, { FC, useState } from "react";
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
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text style={styles.methodText}>{item.name}</Text>
                <Text style={styles.feeText}>${item.fee} fee</Text>
              </View>
              {paymentIcons[item.id] && (
                <View>
                  {paymentIcons[item.id]}
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
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  method: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginVertical: 5,
  },
  methodSelected: {
    borderColor: Colors.blue.primary,
    backgroundColor: "#e6f0ff",
  },
  methodText: { fontSize: 16 },
  feeText: { fontSize: 12, color: "gray", marginTop: 4 },
});
