import { View } from "react-native";
import React, { FC, useEffect, useMemo, useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { useSearchMarketBookingsMutation } from "../services/api/BookingService";
import { ActivityIndicator, Button, DataTable } from "react-native-paper";
import ContentBox from "../components/payment/ContentBox";
import { Colors } from "@/styles";
import { parsePhoneNumber } from "@/utils/PhoneNumberHelper";
import { orderStyles } from "../styles/orders";
import { mapAgencyClientBookingsToUIBookings } from "../utils/bookingMapping";
import IconSvg from "@/components/ui/IconSvg";
import { OrdersStatus } from "../components/orders/OrdersStatus";
import { Toast } from "toastify-react-native";
import OrderPayOverlay from "../components/orders/OrderPayOverlay";

export const OrderDetail: FC<{ id: string }> = ({ id }) => {
  const [paymentFormVisible, setPaymentFormVisible] = useState(false);
  const params = useLocalSearchParams();
  const { t } = useTranslation();
  const styles = useResponsiveStyles(orderStyles);

  const [searchMarketOptions, { data, isLoading }] =
    useSearchMarketBookingsMutation();

  const booking = useMemo(
    () =>
      data?.value.bookings.length
        ? mapAgencyClientBookingsToUIBookings(data?.value.bookings[0])
        : null,
    [data]
  );

  useEffect(() => {
    searchMarketOptions({
      id: +id,
    });
    if (params.paymentSuccess === "true") {
      Toast.success(t("MARKET.PAYMENT.NOTIFICATIONS.PAYMENT_SUCCESS"));
    } else if (params.paymentSuccess === "false") {
      Toast.error(t("MARKET.PAYMENT.NOTIFICATIONS.PAYMENT_ERROR"));
    }
  }, []);

  const beneficiary = booking?.details[0].beneficiary;

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <ThemedText type="defaultBold" style={styles.cardHeaderText}>
            {t("PAGE.ORDER_DETAIL")}
          </ThemedText>
          <Link
            style={{
              alignItems: "center",
              display: "flex",
              color: Colors.blue.second,
            }}
            href={"/profile/order-history"}
          >
            <IconSvg name="GoBack" size={14} />
            <ThemedText
              style={{ fontSize: 16, marginStart: 5 }}
              lightColor={Colors.blue.second}
            >
              {t("BACK")}
            </ThemedText>
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
                          icon: (
                            <IconSvg
                              color={Colors.black.primary}
                              name="User2"
                              size={17}
                            />
                          ),
                          value: beneficiary?.fullName || "N/A",
                        },
                        documentid: {
                          icon: (
                            <IconSvg
                              color={Colors.black.primary}
                              name="Id"
                              size={17}
                            />
                          ),
                          value: beneficiary?.idDocument || "N/A",
                        },
                        phoneNumber: {
                          icon: (
                            <IconSvg
                              color={Colors.black.primary}
                              name="Phone"
                              size={17}
                            />
                          ),
                          value:
                            parsePhoneNumber(
                              beneficiary?.phone,
                              beneficiary?.country?.code,
                              1
                            ) || "N/A",
                        },
                        address: {
                          icon: (
                            <IconSvg
                              color={Colors.black.primary}
                              name="Location"
                              size={17}
                            />
                          ),
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
                          icon: (
                            <IconSvg
                              color={Colors.black.primary}
                              name="User2"
                              size={17}
                            />
                          ),
                          value: booking.client.fullName || "N/A",
                        },

                        phoneNumber: {
                          icon: (
                            <IconSvg
                              color={Colors.black.primary}
                              name="Phone"
                              size={17}
                            />
                          ),
                          value:
                            parsePhoneNumber(
                              booking.client.phone,
                              booking.client?.country?.code,
                              1
                            ) || "N/A",
                        },
                        email: {
                          icon: (
                            <IconSvg
                              color={Colors.black.primary}
                              name="Email"
                              size={17}
                            />
                          ),
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
                      <ThemedText>{t("PAYMENT_FEE")}</ThemedText>
                      <ThemedText>
                        $ {booking?.paymentFee?.toFixed(2)}
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
                    {t("TOTAL", {
                      count: shipment.total,
                    }).toLowerCase()}
                  </ThemedText>
                </View>
                {booking.paidStatus !== "AcceptedPaid" && (
                  <Button
                    mode="contained"
                    onPress={() => setPaymentFormVisible(true)}
                  >
                    {t("MARKET.PAYMENT.STATUS.PAY").toUpperCase()}
                  </Button>
                )}

                <OrdersStatus status={booking.status} />
                <DataTable>
                  <DataTable.Header style={styles.tableProductHeader}>
                    <DataTable.Title style={styles.tableColBig}>
                      <ThemedText style={styles.tableLabel}>Product</ThemedText>
                    </DataTable.Title>
                    <DataTable.Title style={styles.tableCol} numeric>
                      <ThemedText style={styles.tableLabel}>
                        Quantity
                      </ThemedText>
                    </DataTable.Title>
                    <DataTable.Title style={styles.tableCol} numeric>
                      <ThemedText style={styles.tableLabel}>Price</ThemedText>
                    </DataTable.Title>
                  </DataTable.Header>
                  {shipment.items.map((item) => (
                    <DataTable.Row
                      key={`${booking.id}-${item.id}`}
                      style={styles.tableProductRow}
                    >
                      <DataTable.Cell style={styles.tableColBig}>
                        <ThemedText>{item.name}</ThemedText>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.tableCol} numeric>
                        <ThemedText>{item.quantity}</ThemedText>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.tableCol} numeric>
                        <ThemedText>${item.price.toFixed(2)}</ThemedText>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </>
            ))
          )}
        </View>
        <OrderPayOverlay
          visible={paymentFormVisible}
          setPaymentFormVisible={setPaymentFormVisible}
          preview={booking}
        />
      </View>
    </>
  );
};
