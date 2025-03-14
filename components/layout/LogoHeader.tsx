import React from "react";
import { Platform, Pressable, StyleSheet, View, Image } from "react-native";

import { useRouter } from "expo-router";
import Logo from "../Logo";

const LogoHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.logo}>
      <Logo />
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    marginLeft: 40,
  },
});

export default LogoHeader;
