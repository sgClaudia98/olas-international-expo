import { View } from "react-native";
import React, { FC, useEffect } from "react";
import { useRouter } from "expo-router";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { useSearchMarketBookingsMutation } from "../services/api/BookingService";
import { ActivityIndicator } from "react-native-paper";
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
import { useGetProfileQuery } from "@/modules/auth/services/api/AccountService";
import { orderStyles } from "../styles/orders";

export const OrderDetail: FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const styles = useResponsiveStyles(orderStyles);

  const [searchMarketOptions, { data, isLoading }] =
    useSearchMarketBookingsMutation();

  const {
    data: profile,
    isLoading: loadingProfile,
    isError,
  } = useGetProfileQuery();

  useEffect(() => {
    searchMarketOptions({
      id: +id,
    });
  }, []);

  const beneficiary = data?.value.bookings[0]?.details[0].beneficiary;

  console.log(data)

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <ThemedText
            lightColor={Colors.black.primary}
            type="defaultBold"
            style={styles.cardHeaderText}
          >
            {t("PAGE.ORDER_DETAIL")}
          </ThemedText>
          {/**AQUI FALTA EL BACK Link */}
        </View>
        <View style={styles.cardRow}>
          <View style={styles.cardColumnLeft}>
            <View style={{ ...styles.cardContent, paddingLeft: 10 }}>
              {isLoading ? (
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
                  {!loadingProfile && (
                    <View style={styles.informationBox}>
                      <ContentBox
                        title={t("CUSTOMER_HEADING")}
                        data={{
                          fullName: {
                            icon: <ProfileIcon />,
                            value: profile.client.fullName || "N/A",
                          },
                          email: {
                            icon: <EmailIcon />,
                            value: profile.client.email || "N/A",
                          },
                          phoneNumber: {
                            icon: <PhoneIcon />,
                            value:
                              parsePhoneNumber(
                                profile.client.phone,
                                profile.client?.country?.code,
                                1
                              ) || "N/A",
                          },
                        }}
                        contentBoxStyle={{
                          paddingHorizontal: 20,
                          paddingVertical: 0,
                        }}
                        backgroundColor={Colors.white.default}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
          <View style={styles.cardColumnRight}>
            <View style={styles.cardContent}>
              <ThemedText lightColor={Colors.black.primary} type="defaultBold">
                {t("SUMMARY_HEADING")}
              </ThemedText>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <View>
                  <ThemedText lightColor={Colors.black.primary}>
                    {t("PRODUCTS")} ({data?.value.totals}){" "}
                  </ThemedText>
                  {data?.value.bookings.map((booking) => (
                    <View>
                      <View>
                        <ThemedText lightColor={Colors.black.primary}>
                          {t("SHIPPING")} ${booking?.details[0].bookingFee}
                        </ThemedText>
                      </View>
                      <View>
                        <ThemedText lightColor={Colors.black.primary}>
                          {t("DISCOUNT")} ${booking?.details[0].discount}
                        </ThemedText>
                      </View>
                      <View>
                        <ThemedText lightColor={Colors.black.primary}>
                          Total ${booking.totalPrice}
                        </ThemedText>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.cardContent}>
          <ThemedText lightColor={Colors.black.primary} type="defaultBold">
            {t("SHIPPING")}
          </ThemedText>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              {data?.value.bookings.map((booking) => (
                <View>
                  <ThemedText>{booking.reference}</ThemedText>
                  <ThemedText>{booking.bookingDate}</ThemedText>
                  <ThemedText>{booking.totalPrice} USD</ThemedText>
                  <ThemedText>{booking.status}</ThemedText>
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    </>
  );
};
