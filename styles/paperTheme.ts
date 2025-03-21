import { DefaultTheme as DefaultTheme, MD3Theme } from 'react-native-paper';
import { Colors } from '.';
import Fonts from './fonts';

type ExtendedMD3Theme = MD3Theme & Record<string, unknown>;
const theme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue.primary,
    primaryContainer: Colors.blue.primary,
    onPrimary: Colors.white.default,
    onPrimaryContainer: Colors.white.default,
    surfaceDisabled: Colors.black.third,
    onSurfaceDisabled: Colors.white.default,
    onSurface: Colors.black.second,
    onSurfaceVariant: Colors.black.primary,
    error: Colors.red.primary,
    elevation: {
      ...DefaultTheme.colors.elevation,
      level2: Colors.white.default,
      level3: Colors.black.fifth,
    },
    outline: Colors.blue.primary // buttons use it
  },
  fonts: {
    default: {
      ...DefaultTheme.fonts.default,
      fontFamily: Fonts.regular,
    },
    displayLarge: {
      ...DefaultTheme.fonts.displayLarge,
      fontFamily: Fonts.regular,
    },
    displayMedium: {
      ...DefaultTheme.fonts.displayMedium,
      fontFamily: Fonts.regular,
    },
    displaySmall: {
      ...DefaultTheme.fonts.displaySmall,
      fontFamily: Fonts.regular,
    },
    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontFamily: Fonts.regular,
    },
    headlineMedium: {
      ...DefaultTheme.fonts.headlineMedium,
      fontFamily: Fonts.regular,
    },
    headlineSmall: {
      ...DefaultTheme.fonts.headlineSmall,
      fontFamily: Fonts.regular,
    },
    titleLarge: {
      ...DefaultTheme.fonts.titleLarge,
      fontFamily: Fonts.regular,
    },
    titleMedium: {
      ...DefaultTheme.fonts.titleMedium,
      fontFamily: Fonts.regular,
    },
    titleSmall: {
      ...DefaultTheme.fonts.titleSmall,
      fontFamily: Fonts.regular,
    },
    labelLarge: {
      ...DefaultTheme.fonts.labelLarge,
      fontFamily: Fonts.regular,
    },
    labelMedium: {
      ...DefaultTheme.fonts.labelMedium,
      fontFamily: Fonts.regular,
    },
    labelSmall: {
      ...DefaultTheme.fonts.labelSmall,
      fontFamily: Fonts.regular,
    },
    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontFamily: Fonts.regular,
    },
    bodyMedium: {
      ...DefaultTheme.fonts.bodyMedium,
      fontFamily: Fonts.regular,
    },
    bodySmall: {
      ...DefaultTheme.fonts.bodySmall,
      fontFamily: Fonts.regular,
    },
  }
};

export default theme