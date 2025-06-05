import { View, ViewProps } from "react-native";
import React, { FC, useEffect } from "react";
import { useRouter } from "expo-router";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { useSearchMarketBookingsMutation } from "../services/api/BookingService";
import { ActivityIndicator } from "react-native-paper";
import { OrdersTable } from "../components/orders/OrdersTable";
import { orderStyles } from "../styles/orders";
import PaginatedContent from "@/components/Pagination";

const MAX_PER_PAGE = 5;

export const OrderHistory: FC<ViewProps> = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const styles = useResponsiveStyles(orderStyles);

  const [searchMarketOptions, { data, isLoading }] =
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
          <PaginatedContent
            data={data?.value}
            fetchItems={searchMarketOptions}
            pageSize={MAX_PER_PAGE}
            loading={isLoading}
            fallback={<ActivityIndicator />}
          >
            <OrdersTable bookings={data?.value.bookings} />
          </PaginatedContent>
        </View>
      </View>
    </>
  );
};
