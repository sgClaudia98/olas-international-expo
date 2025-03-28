import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import DestinationSelector from "../DestinationSelector";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import LanguageSelector from "../LanguageSelector";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import headerStyles from "@/styles/header"
import IconSvg from "../ui/IconSvg";
import { Colors } from "@/styles";

const HeaderRight = ({ navigation }) => {
  const styles = useResponsiveStyles(headerStyles)
  const { isMobile, lessThan } = useBreakpoints();

  const router = useRouter();
  return (
    <Appbar.Header style={styles.containerRight}>
      {!isMobile && (
        <>
          <DestinationSelector />
          <LanguageSelector />
          <Pressable
            onPress={() => router.navigate("/(main)/profile")}
          >
            <IconSvg name="User" size={17} color={Colors.black.second} />
          </Pressable>
        </>
      )}
      {lessThan.tablet && (
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      )}
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
export default HeaderRight;
