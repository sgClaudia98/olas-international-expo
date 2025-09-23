import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Colors } from "@/styles";
import { paymentFormStyles } from "../../../../styles/reused/paymentForm";
import { DataTable, Button } from "react-native-paper";
import { UIBookingDetail } from "../../utils/bookingMapping";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";

interface OrderSectionProps {
  booking: UIBookingDetail;
  note: string;
  onChangeNote: (value: string) => void;
}

const OrderSection: React.FC<OrderSectionProps> = ({
  booking,
  note,
  onChangeNote,
}) => {
  const [notesEnabled, setNotesEnabled] = useState(false);
  const styles = useResponsiveStyles(paymentFormStyles);

  const { index, total } = booking;

  return (
    <View style={styles.productTableContainer}>
      <Text style={styles.orderText}>Order {index+1} / {total}</Text>
      <DataTable>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>
            <Text style={styles.label}>Product</Text>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Text style={styles.label}>Quantity</Text>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Text style={styles.label}>Price</Text>
          </DataTable.Title>
        </DataTable.Header>
      </DataTable>
      {booking.items.map((item) => (
        <DataTable.Row
          key={`${booking.id}-${item.id}`}
          style={styles.tableRow}
        >
          <DataTable.Cell>
            <Text style={styles.text}>{item.name}</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.text}>{item.quantity}</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.text}>${item.price}</Text>
          </DataTable.Cell>
        </DataTable.Row>
      ))}
      <View style={styles.separator} />
      <View style={styles.commentsContainer}>
        <Button
          style={styles.commentsButton}
          onPress={() => setNotesEnabled(!notesEnabled)}
        >
          {notesEnabled ? "Close note" : "Open note"}
        </Button>
        {notesEnabled && (
          <TextInput
            style={[styles.commentsTextArea, { minHeight: 60 }]}
            multiline
            numberOfLines={3}
            placeholder="Leave your comments here..."
            placeholderTextColor={Colors.black.third}
            onChangeText={onChangeNote}
            value={note}
          />
        )}
        <Text style={styles.totalPrice}>
          Total $
          {booking.items.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default OrderSection;
