import { useWindowDimensions } from "react-native";

// Define breakpoints (Desktop > Tablet > Mobile)
export const BREAKPOINTS = {
  mobile: 768, // Below 768px = Mobile
  tablet: 1024, // 768px - 1023px = Tablet
  desktop: 1280, // 1024px+ = Desktop
  // > 1280px = Big Desktop
};

type BreakpointState = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isBigDesktop: boolean;
}

export function useBreakpoints(): BreakpointState {
  const { width } = useWindowDimensions();

  return {
    isMobile: width < BREAKPOINTS.mobile,
    isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
    isDesktop: width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop,
    isBigDesktop: width >= BREAKPOINTS.desktop,
  };
}
