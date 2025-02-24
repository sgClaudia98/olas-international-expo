    import { ThemedText } from "@/components/ThemedText";
    import { ThemedView } from "@/components/ThemedView";
    
    export default function NewScreen() {
      return (
        <ThemedView>
          <ThemedText type="title">Detail ID</ThemedText>
          <ThemedText>This is a new screen</ThemedText>
        </ThemedView>
      );
    }
    