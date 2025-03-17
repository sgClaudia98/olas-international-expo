import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { Colors } from "@/styles";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";

const Skeleton = ({ width, height, style }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: Colors.black.third,
          borderRadius: 4,
          opacity,
        },
        style,
      ]}
    />
  );
};

const ProfileSkeleton = () => {
  const styles = useResponsiveStyles(profileSkeletonStyles)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Skeleton width={75} height={75} style={styles.avatar} />

        <View style={styles.textContainer}>
          <Skeleton width={100} height={20} style={styles.nameText} />
          <Skeleton width={160} height={16} style={styles.emailText} />
        </View>
      </View>

      <View style={styles.content}>
        <Skeleton width={100} height={20} style={styles.menuItem} />
        <Skeleton width={80} height={20} style={styles.menuItem} />
        <Skeleton width={90} height={20} style={styles.menuItem} />
        <Skeleton width={130} height={20} style={styles.menuItem} />
        <Skeleton width={120} height={20} style={styles.menuItem} />
      </View>

      <View style={styles.footer}>
        <Skeleton width={120} height={40} style={styles.button} />
      </View>
    </View>
  );
};

const profileSkeletonStyles = {
  mobile: StyleSheet.create({
    container: {
      width: "100%",
      borderRadius: 12,
      backgroundColor: Colors.black.fifth,
      shadowColor: Colors.black.default,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      overflow: "hidden",
    },
    header: {
      backgroundColor: Colors.blue.primary,
      paddingTop: 40,
      paddingBottom: 30,
      paddingHorizontal: 30,
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      borderRadius: 37.5,
    },
    textContainer: {
      marginLeft: 16,
      justifyContent: "center",
    },
    nameText: {
      marginBottom: 8,
    },
    emailText: {},
    content: {
      padding: 16,
      backgroundColor: Colors.black.fifth,
    },
    menuItem: {
      marginBottom: 16,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: Colors.black.third,
      alignItems: "flex-end",
    },
    button: {
      borderRadius: 20,
    },
  }),
  tablet: StyleSheet.create({
    container: {
      width: "35%",
      borderRadius: 12,
      backgroundColor: Colors.black.fifth,
      shadowColor: Colors.black.default,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      overflow: "hidden",
    },
    header: {
      backgroundColor: Colors.blue.primary,
      paddingTop: 40,
      paddingBottom: 30,
      paddingHorizontal: 30,
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      borderRadius: 37.5,
    },
    textContainer: {
      marginLeft: 16,
      justifyContent: "center",
    },
    nameText: {
      marginBottom: 8,
    },
    emailText: {},
    content: {
      padding: 16,
      backgroundColor: Colors.black.fifth,
    },
    menuItem: {
      marginBottom: 16,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: Colors.black.third,
      alignItems: "flex-end",
    },
    button: {
      borderRadius: 20,
    },
  }),
};

export default ProfileSkeleton;
