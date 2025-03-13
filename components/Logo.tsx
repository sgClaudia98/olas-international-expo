import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Image } from "react-native";

const Logo = () => {
  const router = useRouter();
  return (
    <Pressable key={"logo-touch"} onPress={() => router.navigate("/(main)")}>
      <Image
        source={require("@/assets/images/logo_large.svg")}
        style={{ alignSelf: "center" }}
      />
    </Pressable>
  );
};

export default Logo;
