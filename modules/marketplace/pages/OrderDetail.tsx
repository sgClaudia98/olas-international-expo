import { Text, View, ViewProps, Image } from "react-native";
import React, { FC, useEffect } from "react";
import Btn from "@/components/Btn";
import { Link, useRouter } from "expo-router";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { orderStyles } from "../styles/orders";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { useSearchMarketBookingsMutation } from "../services/api/BookingService";
import { ActivityIndicator } from "react-native-paper";

export const OrderDetail: FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const styles = useResponsiveStyles(orderStyles);

  const [searchMarketOptions, { data, isLoading }] =
    useSearchMarketBookingsMutation();

  useEffect(() => {
    searchMarketOptions({
      id: +id,
    });
  }, []);

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <ThemedText style={styles.cardHeaderText}>
            {t("PAGE.ORDER_DETAIL")}
          </ThemedText>
          {/**AQUI FALTA EL BACK Link */}
        </View>
        <View style={styles.cardContent}>
          {isLoading && <ActivityIndicator />}
          {data?.value.bookings.map((booking) => (
            <View>
              <ThemedText>{booking.reference}</ThemedText>
              <ThemedText>{booking.bookingDate}</ThemedText>
              <ThemedText>{booking.totalPrice} USD</ThemedText>
              <ThemedText>{booking.status}</ThemedText>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};
