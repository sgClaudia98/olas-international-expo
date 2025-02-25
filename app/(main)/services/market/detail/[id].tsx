import { ThemedText } from "@/components/ThemedText";
import ProductDetail from "@/modules/marketplace/pages/ProductDetail";
import { useLocalSearchParams } from "expo-router"; // Changed import

export default function NewScreen() {
  const { id } = useLocalSearchParams();
  if (typeof id !== "string") {
    return <ThemedText>Invalid product ID</ThemedText>; // Handle the case where id is not a string
  }

  return <ProductDetail id={id} />;
}
