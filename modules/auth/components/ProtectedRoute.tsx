
import { ReactNode, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Slot, useRouter, useSegments } from "expo-router";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import Btn from "@/components/Btn";
import { View } from "react-native";

const ProtectedRoute = ({
  children,
  publicRoutes = [
    "/(auth)/login",
    "/(auth)/register",
    "/(auth)/verify",
    "/(auth)/reset-password",
  ],
  redirectTo = "/(auth)/login",
  authenticatedRedirect = "/(main)/profile",
}: {
  children: ReactNode;
  publicRoutes?: string[];
  redirectTo?: string;
  authenticatedRedirect?: string;
}) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const pathname = "/" + segments.join("/");

  // Verificar autenticación y redirigir según el estado
  useEffect(() => {
    const checkProtectedRoute = async () => {
      let retry = 3;
      if (!isInitialized) {
        console.warn("Auth not initialized yet, skipping auth check");
        return;
      }
      do {
        console.log(
          "Retrying auth check...",
          router,
          isAuthenticated,
          authenticatedRedirect
        );
        try {
          const isPublic = publicRoutes.includes(pathname);
          if (!isAuthenticated && !isPublic) {
            console.log("Redirecting to login", redirectTo);
            router.replace(redirectTo as any);
          } else if (isAuthenticated && isPublic) {
            router.replace(authenticatedRedirect as any);
          }
        } catch (error) {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Esperar 1 segundo antes de reintentar
          console.error("Error during auth check:", error);
        }
      } while (!isAuthenticated && retry-- > 0);
    };
    checkProtectedRoute();
  }, [isAuthenticated, publicRoutes, redirectTo, authenticatedRedirect]);

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <View>
      <ThemedText style={{ marginBottom: 10 }}>
        You have to log in to see your profile.
      </ThemedText>
      <Btn
        title="Login"
        onPress={() => router.navigate("/(auth)/login")}
        size="small"
      />
    </View>
  );
};

export default ProtectedRoute;
