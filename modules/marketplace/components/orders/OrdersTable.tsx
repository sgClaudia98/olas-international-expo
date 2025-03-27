import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { orderStyles } from "../../styles/orders";
import React from "react";
import { DataTable, Icon } from "react-native-paper";
import { AgencyClientBooking } from "../../services/interfaces/bookingDetail";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/styles";
import { Link } from "expo-router";

export const OrdersTable = ({ bookings }: { bookings: AgencyClientBooking[] }) => {
  const styles = useResponsiveStyles(orderStyles);

  return (
    <>
      <DataTable>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>
            <ThemedText lightColor={Colors.black.second}>Número</ThemedText>
          </DataTable.Title>
          <DataTable.Title>
            <ThemedText lightColor={Colors.black.second}>Fecha</ThemedText>
          </DataTable.Title>
          <DataTable.Title>
            <ThemedText lightColor={Colors.black.second}>Precio</ThemedText>
          </DataTable.Title>
          <DataTable.Title>
            <ThemedText lightColor={Colors.black.second}>Estatus</ThemedText>
          </DataTable.Title>
          <DataTable.Title>
            <ThemedText></ThemedText>
          </DataTable.Title>
        </DataTable.Header>
      </DataTable>
      {bookings &&
        bookings?.map((booking) => (
          <DataTable.Row key={`bkid-${booking.id}`} style={styles.tableRow}>
            <DataTable.Cell>
              <ThemedText lightColor={Colors.black.primary}>
                {booking.reference}
              </ThemedText>
            </DataTable.Cell>
            <DataTable.Cell>
              <ThemedText lightColor={Colors.black.primary}>
                {new Date(booking.bookingDate)
                  .toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(".", "")}
              </ThemedText>
            </DataTable.Cell>
            <DataTable.Cell>
              <ThemedText lightColor={Colors.black.primary}>
                {booking.totalPrice} USD
              </ThemedText>
            </DataTable.Cell>
            <DataTable.Cell>
              <ThemedText lightColor={Colors.black.primary}>
                {booking.status}
              </ThemedText>
            </DataTable.Cell>
            <DataTable.Cell>
              <Link href={`/profile/order-history/${booking.id}`}>
                <Icon source={"eye"} size={20} color={Colors.blue.second} />
              </Link>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
    </>
  );
};
