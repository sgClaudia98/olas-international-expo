import React from "react"
import { useState, useRef, useEffect } from "react"
import { View, ScrollView, StyleSheet, TouchableOpacity, type ViewStyle, useWindowDimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useBreakpoints } from "@/hooks/useBreakpoints"

interface ResponsiveSliderProps {
  data: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  showArrows?: boolean
  containerStyle?: ViewStyle
  separation?: number
  dotStyle?: ViewStyle
  activeDotStyle?: ViewStyle
  arrowStyle?: ViewStyle
  arrowColor?: string
}

const ResponsiveSlider: React.FC<ResponsiveSliderProps> = ({
  data,
  renderItem,
  showArrows = true,
  containerStyle,
  separation = 25,
  dotStyle,
  activeDotStyle,
  arrowStyle,
  arrowColor = "#000",
}) => {
  const scrollViewRef = useRef<ScrollView>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { width: screenWidth } = useWindowDimensions()
  const { isBigDesktop, isDesktop, isTablet, isMobile } = useBreakpoints()

  const getItemsPerScreen = () => {
    if (isDesktop || isBigDesktop) return 3
    if (isTablet) return 2
    return 1
  }

  const itemsPerScreen = getItemsPerScreen()

  // Calculate item width accounting for separation between items
  const totalSeparationSpace = separation * (itemsPerScreen - 1)
  const adjust = isMobile ? separation*1.8 : separation
  const itemWidth = (screenWidth - totalSeparationSpace) / itemsPerScreen - adjust

  // Calculate the total number of pages
  const totalPages = Math.max(1, Math.ceil(data.length - (itemsPerScreen - 1)))

  // Recalculate current index when screen size changes
  useEffect(() => {
    setCurrentIndex(0)
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: false })
    }
  }, [itemsPerScreen])

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    // Calculate the slide width (item width + separation)
    const slideWidth = itemWidth + separation
    const newIndex = Math.round(contentOffsetX / slideWidth)

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalPages) {
      setCurrentIndex(newIndex)
    }
  }

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      // Calculate the exact position to scroll to
      const slideWidth = itemWidth + separation
      scrollViewRef.current.scrollTo({
        x: index * slideWidth,
        animated: true,
      })
    }
  }

  const handlePrev = () => {
    const newIndex = Math.max(0, currentIndex - 1)
    scrollToIndex(newIndex)
  }

  const handleNext = () => {
    const newIndex = Math.min(totalPages - 1, currentIndex + 1)
    scrollToIndex(newIndex)
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={itemWidth + separation}
        snapToAlignment="start"
        contentContainerStyle={{ margin: 'auto' }}
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              width: itemWidth,
              marginRight: index < data.length - 1 ? separation : 0,
            }}
          >
            {renderItem(item, index)}
          </View>
        ))}
      </ScrollView>

      <View style={styles.controls}>
        {showArrows && (
          <TouchableOpacity style={[styles.arrow, arrowStyle]} onPress={handlePrev} disabled={currentIndex === 0}>
            <Ionicons name="chevron-back" size={24} color={currentIndex === 0 ? "#ccc" : arrowColor} />
          </TouchableOpacity>
        )}

        <View style={styles.dotsContainer}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                dotStyle,
                currentIndex === index && styles.activeDot,
                currentIndex === index && activeDotStyle,
              ]}
              onPress={() => scrollToIndex(index)}
            />
          ))}
        </View>

        {showArrows && (
          <TouchableOpacity
            style={[styles.arrow, arrowStyle]}
            onPress={handleNext}
            disabled={currentIndex >= totalPages - 1}
          >
            <Ionicons name="chevron-forward" size={24} color={currentIndex >= totalPages - 1 ? "#ccc" : arrowColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 15,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    marginTop: 50,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#007AFF",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  arrow: {
    padding: 10,
  },
})

export default ResponsiveSlider

