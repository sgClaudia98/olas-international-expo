import { Colors } from "@/styles";
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 4;
const ROW_COUNT = 5;
const ITEM_WIDTH = width / COLUMN_COUNT - 16;

const ProductWrapperSkeleton = () => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

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

  const SkeletonItem = () => (
    <View style={styles.itemContainer}>
      <Animated.View
        style={[
          styles.imageContainer,
          styles.skeletonBase,
          { opacity: fadeAnim },
        ]}
      />

      <Animated.View
        style={[
          styles.titleContainer,
          styles.skeletonBase,
          { opacity: fadeAnim },
        ]}
      />

      <Animated.View
        style={[
          styles.priceContainer,
          styles.skeletonBase,
          { opacity: fadeAnim },
        ]}
      />

      <View style={styles.quantityContainer}>
        <Animated.View
          style={[
            styles.minusButton,
            styles.skeletonBase,
            { opacity: fadeAnim },
          ]}
        />
        <Animated.View
          style={[
            styles.quantityInput,
            styles.skeletonBase,
            { opacity: fadeAnim },
          ]}
        />
        <Animated.View
          style={[
            styles.plusButton,
            styles.skeletonBase,
            { opacity: fadeAnim },
          ]}
        />
      </View>

      <Animated.View
        style={[styles.addButton, styles.skeletonBase, { opacity: fadeAnim }]}
      />
    </View>
  );

  const renderSkeletonGrid = () => {
    const skeletonItems = [];

    for (let row = 0; row < ROW_COUNT; row++) {
      const rowItems = [];

      for (let col = 0; col < COLUMN_COUNT; col++) {
        rowItems.push(<SkeletonItem key={`skeleton-${row}-${col}`} />);
      }

      skeletonItems.push(
        <View key={`row-${row}`} style={styles.row}>
          {rowItems}
        </View>
      );
    }

    return skeletonItems;
  };

  return <View style={styles.container}>{renderSkeletonGrid()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: Colors.white.default,
    padding: 8,
    elevation: 2,
  },
  skeletonBase: {
    backgroundColor: "#e0e0e0",
  },
  imageContainer: {
    width: "100%",
    height: ITEM_WIDTH,
    borderRadius: 8,
    marginBottom: 8,
  },
  titleContainer: {
    height: 16,
    marginBottom: 8,
    borderRadius: 4,
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
    marginBottom: 12,
    height: 30,
  },
  minusButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  quantityInput: {
    width: 40,
    height: 30,
    borderRadius: 4,
  },
  plusButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  addButton: {
    height: 40,
    borderRadius: 20,
  },
});

export default ProductWrapperSkeleton;
