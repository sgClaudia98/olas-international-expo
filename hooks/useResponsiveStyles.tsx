import { RegisteredStyle, useWindowDimensions } from "react-native";
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { BREAKPOINTS } from "./useBreakpoints";

type NamedStyles<T> = {[P in keyof T]: any};

type ResponsiveStyles<T> = {
  bigDesktop?: NamedStyles<T> ; 
  desktop?: NamedStyles<T> ;
  tablet?: NamedStyles<T>;
  mobile: NamedStyles<T> ; // Mobile is the fallback (default)
};

export function useResponsiveStyles<T extends NamedStyles<T>>(styles: ResponsiveStyles<T>) {
  const { width } = useWindowDimensions();

  // Prioritize Desktop > Tablet > Mobile
  if (width >= BREAKPOINTS.desktop && styles.bigDesktop){
    console.debug("BIGDESKTOP")
    return styles.bigDesktop
  }
  if (width >= BREAKPOINTS.tablet && styles.desktop){
    console.debug("DESKTOP")
    return styles.desktop;}
  if (width >= BREAKPOINTS.mobile && styles.tablet) {
    console.debug("TABLET")
    return styles.tablet
  };
  console.debug("MOBILE", width)
  return styles.mobile; // Default to mobile-first if no match
}
