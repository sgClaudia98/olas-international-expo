import { View, ViewProps } from "react-native";
import React, { FC } from "react";
import { useGetProfileQuery } from "../services/api/AccountService";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { profileStyles } from "../styles/profile";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { UpdateProfileForm } from "../components/UpdateProfileForm";
import { ChangePasswordForm } from "../components/ChangePasswordForm";
import { useAuth } from "../context/AuthContext";

export const Profile: FC<ViewProps> = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const { data: profile, isLoading } = useGetProfileQuery(token);

  const styles = useResponsiveStyles(profileStyles);

  return (
    <>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <View style={{ gap: 20 }}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <ThemedText style={styles.cardHeaderText}>
                {t("PAGE.PROFILE.HEADER")}
              </ThemedText>
            </View>
            <UpdateProfileForm profile={profile} />
          </View>
          <ChangePasswordForm />
        </View>
      )}
    </>
  );
};
