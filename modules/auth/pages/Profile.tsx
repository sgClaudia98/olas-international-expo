import { Text, View, ViewProps, Image } from "react-native";
import React, { FC } from "react";
import Btn from "@/components/Btn";
import { Button, Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { logout } from "../slices/authSlice";
import { useGetProfileQuery } from "../services/api/AccountService";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { profileStyles } from "@/modules/marketplace/styles/profile";
import ProfileSkeleton from "@/modules/marketplace/components/skeletons/ProfileSkeleton";

export const Profile: FC<ViewProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: profile, isLoading, isError } = useGetProfileQuery();

  const styles = useResponsiveStyles(profileStyles);

  const handleLogout = () => {
    dispatch(logout());
    router.navigate("/(auth)/login");
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
        <Card style={styles.profileCard}>
          <View style={styles.cardHeader}>
            <Image
              source={{ uri: "https://placehold.co/75x75" }}
              width={75}
              height={75}
              style={styles.avatar}
              resizeMode="contain"
            />
            <View style={styles.profileInfoWrapper}>
              <Text style={styles.profileInfo}>
                {profile.client.fullName || "Unknown"}
              </Text>
              <Text style={styles.profileInfo}>{profile.client.email}</Text>
            </View>
          </View>
          <Card.Content style={styles.cardContent}>
            <Text>Mi cuenta</Text>
            <Text>Saldo</Text>
            <Text>Historial</Text>
            <Text>Métodos de pago</Text>
            <Text>Tarjetas de regalo</Text>
          </Card.Content>
          <Card.Actions style={styles.cardFooter}>
            <Button onPress={handleLogout}>Cerrar sesión</Button>
          </Card.Actions>
        </Card>
      )}
    </>
  );
};
