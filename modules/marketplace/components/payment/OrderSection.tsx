import React, { useState } from "react";
import { View, Text } from "react-native";
import { Colors } from "@/styles";
import { paymentFormStyles as styles } from "@/modules/marketplace/styles/paymentForm";
import { DataTable, Button } from "react-native-paper";
import { UIBookingDetail } from "../../utils/bookingMapping";

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

  const { index, total } = booking;

  return (
    <View style={styles.tablet.productTableContainer}>
      <Text style={styles.tablet.orderText}>Order {index+1} / {total} </Text>
      <DataTable>
        <DataTable.Header style={styles.tablet.tableHeader}>
          <DataTable.Title>
            <Text style={styles.tablet.label}>Product</Text>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Text style={styles.tablet.label}>Quantity</Text>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Text style={styles.tablet.label}>Price</Text>
          </DataTable.Title>
        </DataTable.Header>
      </DataTable>
      {booking.items.map((item) => (
        <DataTable.Row
          key={`${booking.id}-${item.id}`}
          style={styles.tablet.tableRow}
        >
          <DataTable.Cell>
            <Text style={styles.tablet.text}>{item.name}</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.tablet.text}>{item.quantity}</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.tablet.text}>${item.price}</Text>
          </DataTable.Cell>
        </DataTable.Row>
      ))}
      <View style={styles.tablet.separator}></View>
      <View style={styles.tablet.commentsContainer}>
        <Button
          style={styles.tablet.commentsButton}
          onPress={() => setNotesEnabled(!notesEnabled)}
        >
          {notesEnabled ? "Close note" : "Open note"}
        </Button>
        {notesEnabled && (
          <textarea
            style={styles.tablet.commentsTextArea}
            rows={3}
            placeholder="Leave your comments here..."
            color={Colors.black.primary}
            onChange={(e) => onChangeNote(e.target.value)}
            value={note}
          ></textarea>
        )}
        <Text style={styles.tablet.totalPrice}>
          Total $
          {booking.items.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default OrderSection;
