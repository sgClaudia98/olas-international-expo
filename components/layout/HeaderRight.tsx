import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import DestinationSelector from "../DestinationSelector";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import LanguageSelector from "../LanguageSelector";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import headerStyles from "@/styles/header";
import IconSvg from "../ui/IconSvg";
import { Colors } from "@/styles";
import { useAppSelector } from "@/hooks/useAppDispatch";

const HeaderRight = ({ navigation }) => {
  const styles = useResponsiveStyles(headerStyles);
  const token = useAppSelector((state) => state.auth.token);
  const { isMobile, lessThan } = useBreakpoints();

  const router = useRouter();

  const handleUserPress = () => {
    if (token) router.push("/(main)/profile");
    else router.push("/(auth)/login");
  };

  return (
    <Appbar.Header style={styles.containerRight}>
      {!isMobile && (
        <>
          <DestinationSelector />
          <LanguageSelector />
          <Pressable onPress={handleUserPress}>
            <IconSvg
              name="User"
              size={17}
              color={Colors.black.second}
              style={{ marginLeft: 2 }}
            />
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
