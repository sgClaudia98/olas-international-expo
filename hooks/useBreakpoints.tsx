import { useWindowDimensions } from "react-native";

// Define breakpoints (Desktop > Tablet > Mobile)
export const BREAKPOINTS = {
  mobile: 480, 
  tablet: 768, 
  desktop: 1280, 
  // > 1280px = Big Desktop
};

type BreakpointState = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isBigDesktop: boolean;
  lessThan: {
    tablet: boolean,
    desktop: boolean,
  }
}

export function useBreakpoints(): BreakpointState {
  const { width } = useWindowDimensions();
  return {
    isMobile: width < BREAKPOINTS.mobile,
    isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
    isDesktop: width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop,
    isBigDesktop: width >= BREAKPOINTS.desktop,
    lessThan: {
      tablet: width < BREAKPOINTS.tablet,
      desktop: width < BREAKPOINTS.desktop,
    }
  };
}
