import React, { ReactNode } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import Footer from "./MainFooterComponent";
import { ThemedView } from "../ThemedView";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import responsiveStyle from "../../styles/page";
interface PageProps {
  children: ReactNode; // Define el tipo para los hijos del componente
}

// This needs to be refactored so you can place a footer dynamically from outside this component using the LayoutContext
const Page: React.FC<PageProps> = ({ children }) => {
  const styles = useResponsiveStyles(responsiveStyle);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.pageContainer}>{children}</View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;
