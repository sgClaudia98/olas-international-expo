import { useWindowDimensions } from "react-native";
import { BREAKPOINTS } from "@/hooks/useBreakpoints";

// Target aspect ratios for different screen sizes
const ASPECT_RATIOS = {
  desktop: 1228 / 500, // ~2.456:1
  mobile: 320 / 181,   // ~1.768:1
} as const;

// Target dimensions for reference
const TARGET_DIMENSIONS = {
  desktop: { width: 1228, height: 500 },
  mobile: { width: 320, height: 181 },
} as const;

interface ResponsiveImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

/**
 * Calculate responsive image dimensions based on screen width
 * Maintains proper aspect ratios while optimizing for device size
 */
export const useResponsiveImageDimensions = (
  baseHeight?: number,
  horizontalPadding?: number
): ResponsiveImageDimensions => {
  const { width: screenWidth } = useWindowDimensions();

  // Determine if we're on mobile or desktop based on screen width
  const isMobile = screenWidth < BREAKPOINTS.tablet;

  // Select appropriate aspect ratio
  const aspectRatio = isMobile ? ASPECT_RATIOS.mobile : ASPECT_RATIOS.desktop;

  // Calculate available width considering padding
  const totalPadding = horizontalPadding ? horizontalPadding * 2 : 0;
  const availableWidth = screenWidth - totalPadding;

  // Calculate dimensions
  let width: number;
  let height: number;

  if (baseHeight) {
    // If height is provided, calculate width based on aspect ratio
    height = baseHeight;
    width = Math.floor(height * aspectRatio); // Ensure integer value
  } else {
    // Use available width accounting for padding
    if (isMobile) {
      width = Math.floor(availableWidth); // Use available width after padding
      height = Math.floor(width / aspectRatio); // Ensure integer value
    } else {
      // For desktop, use a reasonable max width but proportional to available space
      width = Math.floor(Math.min(availableWidth, TARGET_DIMENSIONS.desktop.width));
      height = Math.floor(width / aspectRatio); // Ensure integer value
    }
  }
  
  return {
    width,
    height,
    aspectRatio,
  };
};

/**
 * Generate responsive image URL with appropriate dimensions
 */
export const getResponsiveImageUrl = (
  baseUrl: string,
  mediaId: number,
  dimensions: ResponsiveImageDimensions
): string => {
  
  // For high-DPI screens, request 2x resolution
  const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

  const finalWidth = dimensions.width;  
  const finalHeight = dimensions.height;
  return `${baseUrl}${mediaId}?width=${finalWidth}&height=${finalHeight}`;
};

/**
 * Get optimal image dimensions for a specific screen width
 * Useful for server-side rendering or when screen width is known
 */
export const getImageDimensionsForWidth = (
  screenWidth: number,
  baseHeight?: number,
  horizontalPadding?: number
): ResponsiveImageDimensions => {
  const isMobile = screenWidth < BREAKPOINTS.tablet;
  const aspectRatio = isMobile ? ASPECT_RATIOS.mobile : ASPECT_RATIOS.desktop;

  // Calculate available width considering padding
  const totalPadding = horizontalPadding ? horizontalPadding * 2 : 0;
  const availableWidth = screenWidth - totalPadding;

  let width: number;
  let height: number;

  if (baseHeight) {
    height = baseHeight;
    width = Math.floor(height * aspectRatio); // Ensure integer value
  } else {
    // Use available width accounting for padding
    if (isMobile) {
      width = Math.floor(availableWidth); // Use available width after padding
      height = Math.floor(width / aspectRatio); // Ensure integer value
    } else {
      // For desktop, use a reasonable max width but proportional to available space
      width = Math.floor(Math.min(availableWidth, TARGET_DIMENSIONS.desktop.width));
      height = Math.floor(width / aspectRatio); // Ensure integer value
    }
  }

  return {
    width,
    height,
    aspectRatio,
  };
};

/**
 * Generate srcSet for responsive images (useful for web)
 */
export const getResponsiveImageSrcSet = (
  baseUrl: string,
  mediaId: number
): string => {
  const mobileDimensions = getImageDimensionsForWidth(BREAKPOINTS.mobile - 1);
  const tabletDimensions = getImageDimensionsForWidth(BREAKPOINTS.tablet);
  const desktopDimensions = getImageDimensionsForWidth(BREAKPOINTS.desktop);

  return [
    `${baseUrl}${mediaId}?width=${mobileDimensions.width}&height=${mobileDimensions.height} ${mobileDimensions.width}w`,
    `${baseUrl}${mediaId}?width=${tabletDimensions.width}&height=${tabletDimensions.height} ${tabletDimensions.width}w`,
    `${baseUrl}${mediaId}?width=${desktopDimensions.width}&height=${desktopDimensions.height} ${desktopDimensions.width}w`,
  ].join(', ');
};

/**
 * Get sizes attribute for responsive images
 */
export const getResponsiveImageSizes = (): string => {
  return [
    `(max-width: ${BREAKPOINTS.tablet}px) 100vw`,
    `(max-width: ${BREAKPOINTS.desktop}px) 90vw`,
    `${TARGET_DIMENSIONS.desktop.width}px`,
  ].join(', ');
};