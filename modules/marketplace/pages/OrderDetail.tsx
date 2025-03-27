import { View } from "react-native";
import React, { FC, useEffect, useMemo, useState } from "react";
import { Link, useRouter } from "expo-router";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { useSearchMarketBookingsMutation } from "../services/api/BookingService";
import { ActivityIndicator, DataTable } from "react-native-paper";
import ContentBox from "../components/payment/ContentBox";
import {
  EmailIcon,
  IdIcon,
  MapPinIcon,
  PhoneIcon,
  ProfileIcon,
} from "@/assets/icons/PaymentInfoIcons";
import { Colors } from "@/styles";
import { parsePhoneNumber } from "@/utils/PhoneNumberHelper";
import { orderStyles } from "../styles/orders";
import { mapAgencyClientBookingsToUIBookings } from "../utils/bookingMapping";

export const OrderDetail: FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const styles = useResponsiveStyles(orderStyles);

  const [searchMarketOptions, { data, isLoading }] =
    useSearchMarketBookingsMutation();

  const booking = useMemo(
    () =>
      data?.value.bookings.length
        ? mapAgencyClientBookingsToUIBookings(data.value.bookings[0])
        : null,
    [data]
  );

  useEffect(() => {
    searchMarketOptions({
      id: +id,
    });
  }, []);

  const beneficiary = booking?.details[0].beneficiary;

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <ThemedText type="defaultBold" style={styles.cardHeaderText}>
            {t("PAGE.ORDER_DETAIL")}
          </ThemedText>
          {/**AQUI FALTA EL BACK Link */}
          <Link
            style={{ color: Colors.blue.second }}
            href={"/profile/order-history"}
          >
            {t("BACK")}
          </Link>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.cardColumnLeft}>
            <View style={{ ...styles.cardContent, paddingLeft: 10 }}>
              {isLoading || !booking ? (
                <ActivityIndicator />
              ) : (
                <View style={styles.informationBoxesContainer}>
                  <View style={styles.informationBox}>
                    <ContentBox
                      title={t("RECEIVER_HEADING")}
                      data={{
                        fullName: {
                          icon: <ProfileIcon />,
                          value: beneficiary?.fullName || "N/A",
                        },
                        documentid: {
                          icon: <IdIcon />,
                          value: beneficiary?.idDocument || "N/A",
                        },
                        phoneNumber: {
                          icon: <PhoneIcon />,
                          value:
                            parsePhoneNumber(
                              beneficiary?.phone,
                              beneficiary?.country?.code,
                              1
                            ) || "N/A",
                        },
                        address: {
                          icon: <MapPinIcon />,
                          value: [
                            beneficiary?.address?.line1,
                            beneficiary?.address?.line2,
                            beneficiary?.address?.city,
                            beneficiary?.address?.state,
                            beneficiary?.address?.zipCode,
                          ]
                            .filter((value) => value?.trim())
                            .join(", "),
                        },
                      }}
                      contentBoxStyle={{
                        paddingHorizontal: 20,
                        paddingVertical: 0,
                      }}
                      backgroundColor={Colors.white.default}
                    />
                  </View>
                  <View style={styles.verticalSeparator}></View>

                  <View style={styles.informationBox}>
                    <ContentBox
                      title={t("CUSTOMER_HEADING")}
                      data={{
                        fullName: {
                          icon: <ProfileIcon />,
                          value: booking.client.fullName || "N/A",
                        },

                        phoneNumber: {
                          icon: <PhoneIcon />,
                          value:
                            parsePhoneNumber(
                              booking.client.phone,
                              booking.client?.country?.code,
                              1
                            ) || "N/A",
                        },
                        email: {
                          icon: <EmailIcon />,
                          value: booking.client.email || "N/A",
                        },
                      }}
                      contentBoxStyle={{
                        paddingHorizontal: 20,
                        paddingVertical: 0,
                      }}
                      backgroundColor={Colors.white.default}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.cardColumnRight}>
            <View style={{ ...styles.cardContent, flex: 1 }}>
              <ThemedText type="defaultBold">{t("SUMMARY_HEADING")}</ThemedText>
              {isLoading || !booking ? (
                <ActivityIndicator />
              ) : (
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <View>
                    <View style={styles.resumeItem}>
                      <ThemedText>
                        {t("PRODUCTS_HEADING")} ({booking.total})
                      </ThemedText>
                      <ThemedText>$ {booking.price.toFixed(2)}</ThemedText>
                    </View>
                    <View style={styles.resumeItem}>
                      <ThemedText>{t("SHIPPING")}</ThemedText>
                      <ThemedText>
                        $ {booking?.details[0].bookingFee.toFixed(2)}
                      </ThemedText>
                    </View>
                    <View style={styles.resumeItem}>
                      <ThemedText>{t("DISCOUNT")}</ThemedText>
                      <ThemedText>
                        -$ {booking?.details[0].discount.toFixed(2)}
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.resumeTotal}>
                    <ThemedText>{t("TOTAL")}</ThemedText>
                    <ThemedText type="defaultBold">
                      $ {booking.totalPrice.toFixed(2)}
                    </ThemedText>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.cardContent}>
          {isLoading || !booking ? (
            <>
              <ThemedText type="defaultBold">{t("SHIPPING")}</ThemedText>
              <ActivityIndicator />
            </>
          ) : (
            booking.details.map((shipment) => (
              <>
                <View style={styles.shipmentHeader}>
                  <ThemedText type="defaultBold">
                    {t("SHIPPING")} {shipment.index + 1}
                  </ThemedText>
                  <ThemedText style={styles.badge}>
                    {t("PRODUCTS.TOTAL", {
                      count: shipment.total,
                    }).toLowerCase()}
                  </ThemedText>
                </View>

                <ThemedText>{shipment.status}</ThemedText>
                <DataTable>
                  <DataTable.Header style={styles.tableProductHeader}>
                    <DataTable.Title>
                      <ThemedText style={styles.tableLabel}>Product</ThemedText>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                      <ThemedText style={styles.tableLabel}>
                        Quantity
                      </ThemedText>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                      <ThemedText style={styles.tableLabel}>Price</ThemedText>
                    </DataTable.Title>
                  </DataTable.Header>
                  {shipment.items.map((item) => (
                    <DataTable.Row
                      key={`${booking.id}-${item.id}`}
                      style={styles.tableProductRow}
                    >
                      <DataTable.Cell>
                        <ThemedText>{item.name}</ThemedText>
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        <ThemedText>{item.quantity}</ThemedText>
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        <ThemedText>${item.price.toFixed(2)}</ThemedText>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </>
            ))
          )}
        </View>
      </View>
    </>
  );
};
