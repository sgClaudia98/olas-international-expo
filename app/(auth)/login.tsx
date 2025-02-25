import Page from "@/components/layout/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Login from "@/modules/auth/pages/Login";

export default function LoginScreen() {
  return (
    <Page>
      <Login />
    </Page>
  );
}
