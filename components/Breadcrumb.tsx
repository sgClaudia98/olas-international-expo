import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Colors } from "@/styles";
import { ThemedText } from "./ThemedText";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export interface BreadcrumbItem {
  label: string;
  route?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items = [] }) => {
  const {t} = useTranslation();
  const router = useRouter();

  const handleRouting = (route?: string) => {
    if (route) {
      router.push(route as any);
    }
  };

  return (
    <View style={styles.row}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ThemedText lightColor={Colors.black.second} style={styles.text}>{"   /   "}</ThemedText>
          )}
          {item.route ? (
            <Pressable onPress={() => handleRouting(item.route)}>
              <ThemedText lightColor={Colors.black.second} style={styles.text}>
                {t(item.label)}
              </ThemedText>
            </Pressable>
          ) : (
            <ThemedText lightColor={Colors.black.second} style={styles.text}>
              {t(item.label)}
            </ThemedText>
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    letterSpacing: 0.2,
  }
});

export default Breadcrumb;