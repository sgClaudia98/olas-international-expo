import { Platform } from 'react-native';

/**
 * Returns whether to use native driver for animations.
 * Web doesn't support native driver, so we return false for web platform.
 */
export const shouldUseNativeDriver = (): boolean => {
  return Platform.OS !== 'web';
};