import React, { ReactNode } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import MainFooterComponent from "./MainFooterComponent";
import { ThemedView } from "../ThemedView";

interface PageProps {
  children: ReactNode; // Define el tipo para los hijos del componente
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        {children}
        <MainFooterComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 10,
  },
});
export default Page;
