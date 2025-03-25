import Page from "@/components/layout/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Register from "@/modules/auth/pages/Register";
import { Colors } from "@/styles";

export default function RegisterScreen() {
  return (
    <Page backgroundColor={Colors.black.fifth}>
      <Register />
    </Page>
  );
}
