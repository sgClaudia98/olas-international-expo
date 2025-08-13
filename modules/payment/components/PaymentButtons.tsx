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
});
