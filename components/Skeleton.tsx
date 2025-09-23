import React from "react";
import { Colors } from "@/styles";
import { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { shouldUseNativeDriver } from "@/utils/animationHelper";

const Skeleton = ({ width, height, style }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: shouldUseNativeDriver(),
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: shouldUseNativeDriver(),
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

export default Skeleton;