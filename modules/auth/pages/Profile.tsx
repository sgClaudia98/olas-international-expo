import { Text, View, ViewProps, Image } from "react-native";
import React, { FC } from "react";
import Btn from "@/components/Btn";
import { Button, Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { logout } from "../slices/authSlice";
import { useGetProfileQuery } from "../services/api/AccountService";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { profileStyles } from "../styles/profile";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";

export const Profile: FC<ViewProps> = () => {
  const router = useRouter();
  const {t} = useTranslation();
  const { data: profile, isLoading, isError } = useGetProfileQuery();

  const styles = useResponsiveStyles(profileStyles);

  const handleSave = () => {
    // TODO
  };

  return (
    <>
      {isLoading ? (
        <ProfileSkeleton />
      ) : isError || !profile ? (
        <View>
          <Text style={{ marginBottom: 10 }}>
            You have to log in to see your profile.
          </Text>
          <Btn
            title="Login"
            onPress={() => router.navigate("/(auth)/login")}
            size="small"
          />
        </View>
      ) : (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
              <ThemedText style={styles.cardHeaderText}>
                {t("PAGE.PROFILE.HEADER")}
              </ThemedText>
          </View>
          <View style={styles.cardContent}>
            {/** This has to be  */}
            <Text>First name</Text>
            <Text>Last name</Text>
            <Text>Phonenumber</Text>
            <Text>Email</Text>
          </View>
          <View style={styles.cardFooter}>
            <Btn title={t("ACTIONS.SAVE_CHANGES")} disabled onPress={handleSave}/>
          </View>
        </View>
      )}
    </>
  );
};
