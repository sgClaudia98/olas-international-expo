import React, { useMemo, useRef, useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from "react-native";

import { URL_IMAGE } from "@/constants";
import { useBanner } from "../../hooks/useBanner";
import { Colors } from "@/styles";
import { BannerSliderSkeleton } from "../skeletons/BannerSliderSkeleton";

const BannerSlider = ({ height = 250 }: { height?: number }) => {
  const { banners, loading } = useBanner();
  const { width } = useWindowDimensions();

  const mediaList = useMemo(
    () =>
      banners
        .flatMap((b) => b.views)
        .filter((view) => view.mediaId !== 0)
        .sort((a, b) => a.position - b.position),
    [banners]
  );

  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    // const isFar = Math.abs(index - activeIndex) > 2;
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  };

  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / width);

    if (currentIndex >= mediaList.length) {
      scrollToIndex(0);
    } else {
      setActiveIndex(currentIndex);
    }
  };

  return (
    <>
      {loading ? (
        <BannerSliderSkeleton height={height} />
      ) : (
        <View style={styles.container}>
          <FlatList
            scrollEnabled={false}
            ref={flatListRef}
            data={mediaList}
            keyExtractor={(item, index) => `media-${item.mediaId}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image
                source={{
                  uri: `${URL_IMAGE}${item.mediaId}?width=600&height=250`,
                }}
                style={{ width, height, borderRadius: 5 }}
                resizeMode="cover"
              />
            )}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            windowSize={3}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
          />

          <View style={styles.dotsContainer}>
            {mediaList.map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => scrollToIndex(i)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityLabel={`Go to banner ${i + 1}`}
              >
                <View
                  style={[styles.dot, activeIndex === i && styles.activeDot]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: "relative",
  },
  dotsContainer: {
    bottom: 40,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.white.default,
    marginHorizontal: 6,
    backgroundColor: "transparent",
  },
  activeDot: {
    backgroundColor: Colors.white.default,
  },
  empty: {
    textAlign: "center",
    padding: 20,
    fontSize: 16,
    color: "#999",
  },
});

export default BannerSlider;
