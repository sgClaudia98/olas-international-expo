import Page from "@/components/layout/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Verify from "@/modules/auth/pages/Verify";
import { useLocalSearchParams } from "expo-router";

export default function VerifyScreen() {
  const { email } = useLocalSearchParams();

  return (
    <Page>
      <Verify email={email as string}></Verify>
    </Page>
  );
}
