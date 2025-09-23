import React from "react";
import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { shouldUseNativeDriver } from "@/utils/animationHelper";

interface SkeletonBannerProps {
  height?: number;
  style?: object;
}

export const BannerSliderSkeleton: React.FC<SkeletonBannerProps> = ({
  height = 250,
  style = {},
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startShimmerAnimation = () => {
      Animated.loop(
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: shouldUseNativeDriver(),
        })
      ).start();
    };

    startShimmerAnimation();

    return () => {
      shimmerAnim.stopAnimation();
    };
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      -Dimensions.get("window").width,
      Dimensions.get("window").width,
    ],
  });

  return (
    <View style={[styles.container, { height }, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />

      <View style={styles.paginationContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === 3 ? styles.activePaginationDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  shimmer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(150, 150, 150, 0.2)",
    marginHorizontal: 3,
  },
  activePaginationDot: {
    backgroundColor: "rgba(150, 150, 150, 0.6)",
  },
});
