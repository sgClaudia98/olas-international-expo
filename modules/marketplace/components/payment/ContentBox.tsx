import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Colors } from "@/styles";
import typography from "@/styles/typography";
import { ThemedText } from "@/components/ThemedText";

interface ContentBoxProps {
  title?: string;
  data: Record<string, { icon?: JSX.Element; value: string } | string>;
  contentBoxStyle?: ViewStyle;
  backgroundColor: string;
  shadow?: boolean;
}

const ContentBox: React.FC<ContentBoxProps> = ({
  title,
  data,
  backgroundColor,
  contentBoxStyle = {
    borderRadius: 8,
    minHeight: 240,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  shadow,
}) => {
  return (
    <View style={[contentBoxStyle, shadow ? styles.shadowStyles : '', { backgroundColor }]}>
      {title && <ThemedText type="defaultBold" style={styles.title}>{title}</ThemedText>}
      {Object.entries(data).map(([key, item]) => {
        const { icon, value } =
          typeof item === "object" && item !== null
            ? item
            : { icon: null, value: item };

        return (
          <View key={key} style={styles.row}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <ThemedText style={styles.text}>
              {typeof value === "string" ? value : ""}
            </ThemedText>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.black.primary,
    fontWeight: "600",
    marginBottom: 15,
  },
  shadowStyles: {
    elevation: 3, // shadow in Android
    shadowColor: "#000", // Shadow in iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    marginTop: 4,
  },
  text: {
    ...typography.label,
    color: Colors.black.primary,
    flexShrink: 1,
  },
});

export default ContentBox;
