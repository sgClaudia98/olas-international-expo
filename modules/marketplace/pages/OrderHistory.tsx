import { Text, View, ViewProps, Image } from "react-native";
import React, { FC } from "react";
import Btn from "@/components/Btn";
import { useRouter } from "expo-router";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { orderStyles } from "../styles/orders";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";

export const OrderHistory: FC<ViewProps> = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const styles = useResponsiveStyles(orderStyles);

  const handleSave = () => {
    // TODO
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <ThemedText style={styles.headerText}>
            {t("PAGE.ORDER_HISTORY")}
          </ThemedText>
        </View>
        <View style={styles.cardContent}>
          {/** This has to be  */}
          <Text>Order 1</Text>
          <Text>Order 2</Text>
          <Text>Order 3</Text>
        </View>
      </View>
    </>
  );
};
