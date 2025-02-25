import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '@/styles';  // Assuming you have predefined colors

interface TextSeeMoreProps {
  numberOfLines?: number; // Default is 3, but can be customized
  children: React.ReactNode; // Accept text or any React nodes as children
}

const TextSeeMore: React.FC<TextSeeMoreProps> = ({ children, numberOfLines = 3 }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTruncated, setIsTruncated] = useState(false); // To track if text is truncated
  const textRef = useRef<Text>(null);
  const containerRef = useRef<View>(null);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const onTextLayout = () => {
    if (textRef.current && containerRef.current && !isTruncated) {
      containerRef.current.measure((x, y, width, height) => {
        const lineHeight = 24; // Adjust this according to your text's line height
        const lines = Math.floor(height / lineHeight);
        console.log("AAAAA", lines , height, x, y , width)
        if (lines > numberOfLines) {
          setIsTruncated(true);
          setIsExpanded(false)
        }
      });
    }
  };

  useEffect(() => {
    // Trigger the layout calculation on mount
    onTextLayout();
  }, []);

  return (
    <View style={styles.container} ref={containerRef}>
      <Text
        ref={textRef}
        style={styles.text}
        numberOfLines={isExpanded ? 0 : numberOfLines} // Show full text if expanded, else truncate
        onLayout={onTextLayout} // Trigger layout measurement when text layout changes
      >
        {children}
      </Text>

      {isTruncated && (
        <Pressable onPress={toggleText}>
          <Text style={styles.seeMoreText}>
            {isExpanded ? 'See less' : 'See more'}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.black.primary,
    lineHeight: 24,
  },
  seeMoreText: {
    fontSize: 16,
    color: Colors.blue.primary, // Assuming you have a blue color for the link
    marginTop: 4,
    textDecorationLine: 'underline', // Optional, for underlining the link
  },
});

export default TextSeeMore;
