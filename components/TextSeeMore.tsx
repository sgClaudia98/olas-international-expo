import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Colors } from '@/styles';  // Assuming you have predefined colors
import { useTranslation } from 'react-i18next';

interface TextSeeMoreProps {
  isExpandable?: boolean;
  numberOfLines?: number; // Default is 3, but can be customized
  children: React.ReactNode; // Accept text or any React nodes as children
  style?: ViewStyle
}

const TextSeeMore: React.FC<TextSeeMoreProps> = ({ children, style, numberOfLines = 3 , isExpandable = true}) => {
  const {t} = useTranslation();
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
    <View style={style} ref={containerRef}>
      <Text
        ref={textRef}
        style={styles.text}
        numberOfLines={isExpanded ? 0 : numberOfLines} // Show full text if expanded, else truncate
        onLayout={onTextLayout} // Trigger layout measurement when text layout changes
      >
        {children}
      </Text>

      {isTruncated && isExpandable && (
        <Pressable onPress={toggleText}>
          <Text style={styles.seeMoreText}>
            {isExpanded ? t("VIEW_LESS") : t("VIEW_MORE")}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
