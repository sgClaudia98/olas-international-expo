import React from "react";
import { Platform, Pressable, StyleSheet, View, Image } from "react-native";

import { useRouter } from "expo-router";

const LogoHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.logo}>
      <Pressable key={"logo-touch"} onPress={() => router.push("/")}>
        <Image
          source={require("@/assets/images/logo_large.svg")}
          style={{ alignSelf: "center" }}
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    marginLeft: 40,
  },
});

export default LogoHeader;
