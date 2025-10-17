import React, { useMemo, useRef, useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from "react-native";

import { URL_IMAGE } from "@/constants";
import { useBanner } from "../../hooks/useBanner";
import { Colors } from "@/styles";
import { BannerSliderSkeleton } from "../skeletons/BannerSliderSkeleton";
import { useResponsiveImageDimensions, getResponsiveImageUrl } from "./ResponsiveImageHelper";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { useRouter } from "expo-router";
import { useSearchContext } from "../../context/SearchContext";
import { handleBannerAction } from "../../utils/bannerActions";

/**
 * Responsive Banner Slider Component
 *
 * Features:
 * - Automatically calculates optimal image dimensions based on screen size
 * - Desktop: 1228x500 (~2.456:1 aspect ratio)
 * - Mobile: 320x181 (~1.768:1 aspect ratio)
 * - Requests appropriate image size from backend API
 * - Maintains proper aspect ratios across all devices
 * - Smooth transitions between breakpoints
 *
 * @param height - Optional fixed height, if not provided uses responsive calculation
 */
const BannerSlider = ({ height }: { height?: number }) => {
  const { banners, loading } = useBanner();
  const { width } = useWindowDimensions();
  const { isMobile, isTablet } = useBreakpoints();
  const router = useRouter();
  const { setSelection } = useSearchContext();

  // Header-style responsive padding
  const horizontalPadding = isMobile ? 20 : isTablet ? 35 : 105;

  // Get responsive image dimensions for API request with padding consideration
  // Desktop: 1228x500 (~2.456:1), Mobile: 320x181 (~1.768:1)
  const responsiveImageDimensions = useResponsiveImageDimensions(height, horizontalPadding);

  // Display dimensions: use full screen width and proportional height
  const displayWidth = width;
  const displayHeight = height || responsiveImageDimensions.height;

  const mediaList = useMemo(
    () =>
      banners
        .flatMap((banner) =>
          banner.views.map((view) => ({ view, banner }))
        )
        .filter((item) => item.view.mediaId !== 0)
        .sort((a, b) => a.view.position - b.view.position),
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
        <BannerSliderSkeleton height={displayHeight} style={{ paddingHorizontal: horizontalPadding }} />
      ) : (
        <View style={styles.container}>
          <FlatList
            scrollEnabled={false}
            ref={flatListRef}
            data={mediaList}
            keyExtractor={(item, index) => `media-${item.view.mediaId}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>{
                  console.log("Banner pressed:", item.banner); 
                  handleBannerAction(
                    item.banner.action,
                    { departmentId: item.banner.departmentId },
                    setSelection
                  )
                }}
              >
                <Image
                  source={{
                    uri: getResponsiveImageUrl(URL_IMAGE, item.view.mediaId, responsiveImageDimensions),
                  }}
                  style={{
                    width: displayWidth, // Use full screen width for display
                    height: displayHeight,
                    zIndex: 10
                  }}
                  resizeMode="contain"
                />
              </Pressable>
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
    position: "relative",
    borderRadius: 5,
    overflow: 'hidden',
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: 'absolute',
    width: '100%',
    bottom: 20,
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
