import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import responsiveStyles from "../../styles/productWrapper";
import { useBreakpoints } from "@/hooks/useBreakpoints";

const ProductWrapperSkeleton = () => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;
  const stylesResponsive = useResponsiveStyles(responsiveStyles);
  const { isMobile } = useBreakpoints();
  const skeletonCount = isMobile ? 6 : 12

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => fadeAnim.stopAnimation();
  }, [fadeAnim]);

  

  const SkeletonItem = (index: number) => (
    <View key={index} style={[stylesResponsive.productOpen, isMobile && {width: '40%'}]}>
      <Animated.View
        style={[s.imageContainer, s.skeletonBase, { opacity: fadeAnim }]}
      />
      <Animated.View
        style={[s.titleContainer, s.skeletonBase, { opacity: fadeAnim }]}
      />
      <Animated.View
        style={[s.priceContainer, s.skeletonBase, { opacity: fadeAnim }]}
      />

      <View style={s.actionsRow}>
        <Animated.View
          style={[s.qtyButton, s.skeletonBase, { opacity: fadeAnim }]}
        />
        <Animated.View
          style={[s.addButton, s.skeletonBase, { opacity: fadeAnim }]}
        />
      </View>
    </View>
  );

  const skeletons = Array.from({ length: skeletonCount }, (_, i) => SkeletonItem(i));

  return <View style={[stylesResponsive.products, isMobile && {flexWrap: 'wrap'}]}>{skeletons}</View>;
};

const s = StyleSheet.create({
  skeletonBase: {
    backgroundColor: "#e0e0e0",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  titleContainer: {
    height: 16,
    marginBottom: 8,
    borderRadius: 4,
    width: "100%",
  },
  priceContainer: {
    height: 20,
    width: "60%",
    marginBottom: 12,
    borderRadius: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    height: 30,
  },
  qtyButton: {
    height: 40,
    borderRadius: 20,
    width: "30%",
  },
  addButton: {
    height: 40,
    borderRadius: 20,
    width: "50%",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
});

export default ProductWrapperSkeleton;
