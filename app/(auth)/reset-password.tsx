import Page from "@/components/layout/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/styles";

export default function ResetPasswordScreen() {
  return (
    <Page backgroundColor={Colors.black.fifth}>
      <ThemedText type="title">Reset pswd</ThemedText>
      <ThemedText>This is a new screen</ThemedText>
    </Page>
  );
}
