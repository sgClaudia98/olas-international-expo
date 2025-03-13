import { MD3LightTheme as DefaultTheme, MD3Theme } from 'react-native-paper';
import { Colors } from '.';

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
};

export default theme