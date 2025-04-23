import React, { ReactNode } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet, ViewStyle } from "react-native";
import Footer from "./Footer";
import { ThemedView } from "../ThemedView";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import responsiveStyle from "../../styles/page";
import { Colors } from "@/styles";
interface PageProps {
  children: ReactNode; // Define el tipo para los hijos del componente
  backgroundColor?: string;
  style?: ViewStyle
}

// This needs to be refactored so you can place a footer dynamically from outside this component using the LayoutContext
const Page: React.FC<PageProps> = ({ children, backgroundColor = Colors.white.default, style = {} }) => {
  const styles = useResponsiveStyles(responsiveStyle);
  return (
    <SafeAreaView style={{...styles.container, ...style, backgroundColor}}>
      
      <ScrollView
        style={{...styles.scrollContent, backgroundColor}}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>

        <View style={{...styles.pageContainer, backgroundColor}}>{children}</View>
      
        <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;
