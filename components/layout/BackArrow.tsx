import React from 'react';
import { Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import IconSvg from '../ui/IconSvg';


interface BackArrowProps {
  fallback?: () => void;
}

const BackArrow: React.FC<BackArrowProps> = ({ fallback }) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      fallback && fallback(); // Call the fallback function if provided
    }
  };

  return (
    <Pressable
      testID='back-arrow'
      onPress={goBack}
      role="button"
      style={{ marginLeft: -16, paddingVertical: 4, paddingHorizontal: 8 }}>
      <IconSvg name='ArrowBack' />
    </Pressable>
  );
};

export default BackArrow;