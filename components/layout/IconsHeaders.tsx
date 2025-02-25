import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import DestinationSelector from "../DestinationSelector";

const IconsHeader = () => {
  const router = useRouter();
  return (
    <Appbar.Header style={styles.appbar}>
      <DestinationSelector/>
      <Appbar.Action icon="globe-model" />
      <Appbar.Action
        icon="account-circle-outline"
        onPress={() => router.navigate("/(main)/profile")}
      />
    </Appbar.Header>
  );
};
/**
 * <Pressable
      testID="notify-icon"
      onPress={() => {}}
      role="button">
      <NotifyIcon />
    </Pressable>
 */
const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "transparent",
    elevation: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  language: {
    fontSize: 16,
    color: "#555",
    marginRight: 8,
  },
  flexGrow: {
    flexGrow: 1,
  },
  categoryScroll: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  chip: {
    marginRight: 8,
    backgroundColor: "#e6e6e6",
  },
});
export default IconsHeader;
