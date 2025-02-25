import { RegisteredStyle, useWindowDimensions } from "react-native";
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

// Define breakpoints (Desktop > Tablet > Mobile)
const BREAKPOINTS = {
  mobile: 768,    // Below 768px = Mobile
  tablet: 1024,   // 768px - 1023px = Tablet
  desktop: 1280,  // 1024px+ = Desktop
};

type ResponsiveStyles<T> = {
  desktop?: NamedStyles<T> | NamedStyles<any>; // Default to Desktop (Big Screens First)
  tablet?: NamedStyles<T> | NamedStyles<any>;
  mobile: NamedStyles<T> | NamedStyles<any>; // Mobile is the fallback (default)
};

export function useResponsiveStyles<T extends NamedStyles<T>>(styles: ResponsiveStyles<T>) {
  const { width } = useWindowDimensions();

  // Prioritize Desktop > Tablet > Mobile
  if (width >= BREAKPOINTS.tablet && styles.desktop) return styles.desktop;
  if (width >= BREAKPOINTS.mobile && styles.tablet) return styles.tablet;
  
  return styles.mobile; // Default to mobile-first if no match
}
