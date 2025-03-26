import { Text, View, ViewProps, Image } from "react-native";
import React, { FC, useEffect } from "react";
import Btn from "@/components/Btn";
import { useRouter } from "expo-router";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { orderStyles } from "../styles/orders";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { useSearchMarketBookingsMutation } from "../services/api/BookingService";
import { ActivityIndicator } from "react-native-paper";

const MAX_PER_PAGE = 5;

export const OrderHistory: FC<ViewProps> = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const styles = useResponsiveStyles(orderStyles);

  const [searchMarketOptions, { data , isLoading}] =
    useSearchMarketBookingsMutation();

  useEffect(() => {
    searchMarketOptions({
      offset: 0,
      limit: MAX_PER_PAGE,
    });
  }, []);

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <ThemedText style={styles.cardHeaderText}>
            {t("PAGE.ORDER_HISTORY")}
          </ThemedText>
        </View>
        <View style={styles.cardContent}>
          {isLoading && <ActivityIndicator/>}
          {data?.value.bookings.map((booking) => (
            <View style={{flexDirection: "row", gap: 10}}>

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
