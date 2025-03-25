import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { Colors } from "@/styles";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import {profileStyles} from "../../styles/profile"
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
  const styles = useResponsiveStyles(profileStyles)

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
          <Skeleton width={"100%"} height={22} style={styles.headerText} />
      </View>

      <View style={styles.cardContent}>
        <Skeleton width={"100%"} height={70} style={{}} />
      </View>

    </View>
  );
};

export default ProfileSkeleton;
