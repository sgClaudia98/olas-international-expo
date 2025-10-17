import React from 'react';
import { View, ViewProps } from 'react-native';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';
import { removeHorizontalSpaces } from '@/styles/page';

interface ViewWithoutPaddingProps extends ViewProps {
  children: React.ReactNode;
}

export const ViewWithoutPadding: React.FC<ViewWithoutPaddingProps> = ({
  children,
  style,
  ...props
}) => {
  const styles = useResponsiveStyles(removeHorizontalSpaces);

  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};
