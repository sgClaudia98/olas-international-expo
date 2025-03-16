import { Colors } from "@/styles";
import typography from "@/styles/typography";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

interface NoSearchResultsProps {
  message?: string;
}

const NotFoundIcon = (props) => (
  <Svg width={50} height={50} fill="none" {...props}>
    <Path
      stroke="#CED6E0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4.4}
      d="M25 47c12.15 0 22-9.85 22-22S37.15 3 25 3 3 12.85 3 25s9.85 22 22 22ZM16.201 31.6h17.6M18.4 18.4h.022M31.6 18.4h.022"
    />
  </Svg>
);

const NoSearchResults: React.FC<NoSearchResultsProps> = ({
  message = "Sorry! There are no results for your search.",
}) => {
  return (
    <View style={styles.container}>
      <NotFoundIcon />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
    paddingVertical: 60,
    marginHorizontal: 'auto',
  },
  message: {
    ...typography.bodyHighlight,
    fontWeight: 600,
    color: Colors.black.primary
  },
});

export default NoSearchResults;
