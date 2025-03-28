import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import React from "react";
import { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { productInfoSkeletonStyles } from "../../styles/product";

const ProductDetailSkeleton = () => {
  const styles = useResponsiveStyles(productInfoSkeletonStyles);

  const pulseAnimation = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(pulseAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnimation, {
        toValue: 0.3,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulse).start();

    return () => {
      pulseAnimation.stopAnimation();
    };
  }, []);

  const SkeletonItem = ({ style }) => (
    <Animated.View
      style={[styles.skeletonBase, style, { opacity: pulseAnimation }]}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.breadcrumb}>
        <SkeletonItem style={{ width: 40, height: 16 }} />
        <View style={styles.separator} />
        <SkeletonItem style={{ width: 80, height: 16 }} />
        <View style={styles.separator} />
        <SkeletonItem style={{ width: 70, height: 16 }} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.imageContainer}>
          <SkeletonItem style={styles.image} />
        </View>

        <View style={styles.detailsContainer}>
          <SkeletonItem style={styles.title} />

          <View style={styles.priceContainer}>
            <SkeletonItem style={styles.currentPrice} />
            <SkeletonItem style={styles.oldPrice} />
            <SkeletonItem style={styles.discount} />
          </View>

          <View style={styles.descriptionContainer}>
            <SkeletonItem style={styles.descLine} />
            <SkeletonItem style={styles.descLine} />
            <SkeletonItem style={styles.descLine} />
            <SkeletonItem style={[styles.descLine, { width: "25%" }]} />
          </View>

          <View style={styles.divider} />

          <View style={styles.actionsContainer}>
            <SkeletonItem style={styles.quantityControl} />
            <SkeletonItem style={styles.addButton} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailSkeleton;
