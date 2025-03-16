import React, { ReactNode } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import Footer from "./MainFooterComponent";
import { ThemedView } from "../ThemedView";

interface PageProps {
  children: ReactNode; // Define el tipo para los hijos del componente
}


// This needs to be refactored so you can place a footer dynamically from outside this component using the LayoutContext
const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
      <View
          style={{
            display: 'flex',
            minHeight: '100%',
            backgroundColor: 'white',
            paddingTop: 20,
            paddingHorizontal: 20,
          }}>
          {children}
        </View>
        <Footer />
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
