import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { orderStyles } from "../../styles/orders";
import React from "react";
import { DataTable, Icon } from "react-native-paper";
import { AgencyClientBooking } from "../../services/interfaces/bookingDetail";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/styles";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import IconSvg from "@/components/ui/IconSvg";

export const OrdersTable = ({ bookings }: { bookings: AgencyClientBooking[] }) => {
  const styles = useResponsiveStyles(orderStyles);

  const { t } = useTranslation();

  return (
    <>
      <DataTable>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.tableColBig}>
            <ThemedText lightColor={Colors.black.second}>{t("NUMBER")}</ThemedText>
          </DataTable.Title>
          <DataTable.Title style={styles.tableCol}>
            <ThemedText lightColor={Colors.black.second}>{t("DATE")}</ThemedText>
          </DataTable.Title>
          <DataTable.Title style={styles.tableCol}>
            <ThemedText lightColor={Colors.black.second}>{t("PRICE")}</ThemedText>
          </DataTable.Title>
          <DataTable.Title style={styles.tableCol}>
            <ThemedText lightColor={Colors.black.second}>{t("STATUS")}</ThemedText>
          </DataTable.Title>
          <DataTable.Title  style={styles.tableColActions}>
            <ThemedText></ThemedText>
          </DataTable.Title>
        </DataTable.Header>
      </DataTable>
      {bookings &&
        bookings?.map((booking) => (
          <DataTable.Row key={`bkid-${booking.id}`} style={styles.tableRow}>
            <DataTable.Cell style={styles.tableColBig}>
              <ThemedText >
                {booking.reference}
              </ThemedText>
            </DataTable.Cell >
            <DataTable.Cell style={styles.tableCol}>
              <ThemedText >
                {new Date(booking.bookingDate)
                  .toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(".", "")}
              </ThemedText>
            </DataTable.Cell>
            <DataTable.Cell style={styles.tableCol}>
              <ThemedText >
                {booking.totalPrice} USD
              </ThemedText>
            </DataTable.Cell>
            <DataTable.Cell style={styles.tableCol}>
              <ThemedText >
                {booking.status}
              </ThemedText>
            </DataTable.Cell>
            <DataTable.Cell style={styles.tableColActions}>
              <Link href={`/profile/order-history/${booking.id}`}>
                <IconSvg name="Visible" size={20} color={Colors.blue.second} />
              </Link>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
    </>
  );
};
