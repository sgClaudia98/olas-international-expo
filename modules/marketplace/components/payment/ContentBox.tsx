import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/styles";
import typography from "@/styles/typography";

interface ContentBoxProps {
  title?: string;
  data: Record<string, { icon?: JSX.Element; value: string } | string>;
  backgroundColor: string;
}

const ContentBox: React.FC<ContentBoxProps> = ({
  title,
  data,
  backgroundColor,
}) => {
  return (
    <View style={[styles.contentBox, { backgroundColor }]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {Object.entries(data).map(([key, item]) => {
        const { icon, value } =
          typeof item === "object" && item !== null
            ? item
            : { icon: null, value: item };

        return (
          <View key={key} style={styles.row}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text style={styles.text}>{typeof value === "string" ? value : ""}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...typography.bodyHighlight,
    color: Colors.black.primary,
    fontWeight: "600",
    marginBottom: 15,
  },
  contentBox: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 18,
    minHeight: 240,
    marginHorizontal: 5,
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
