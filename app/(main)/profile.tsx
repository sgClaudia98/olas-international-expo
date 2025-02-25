import Btn from "@/components/Btn";
import Page from "@/components/layout/Page";
import { ThemedText } from "@/components/ThemedText";
import { useGetProfileQuery } from "@/modules/auth/services/api/AccountService";
import { Colors } from "@/styles";
import { useRouter } from "expo-router";
import {StyleSheet, Text, View, ViewProps} from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { data: profile, isLoading, isError } = useGetProfileQuery();

  return (
    <Page>
      {isLoading ? (
        <Text>Loading...</Text>
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
        <View style={styles.profileCard}>
          <Text>Profile</Text>
          <Text>{JSON.stringify(profile, null, 2)}</Text>
        </View>
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    padding: 20,
    backgroundColor: Colors.black.fifth,
    shadowColor: Colors.black.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.5,
    borderRadius: 5,
    width: '50%',
  },
});