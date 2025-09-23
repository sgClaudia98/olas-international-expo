import { Text, View, ViewProps, Image } from "react-native";
import React, { FC } from "react";
import Btn from "@/components/Btn";
import { Button, Card, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { logout } from "../slices/authSlice";
import { useGetProfileQuery } from "../services/api/AccountService";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { profileStyles } from "../styles/profile";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { UpdateProfileForm } from "../components/UpdateProfileForm";
import { useAuth } from "../context/AuthContext";

export const Profile: FC<ViewProps> = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: profile, isLoading, isError } = useGetProfileQuery();

  const styles = useResponsiveStyles(profileStyles);

  return (
    <>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <ThemedText style={styles.cardHeaderText}>
              {t("PAGE.PROFILE.HEADER")}
            </ThemedText>
          </View>
          <UpdateProfileForm profile={profile} />
        </View>
      )}
    </>
  );
};
