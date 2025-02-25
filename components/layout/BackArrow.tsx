import React from 'react';
import { Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { ArrowBackIcon } from '@/assets/icons/ArrowBackIcon';


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
      <ArrowBackIcon />
    </Pressable>
  );
};

export default BackArrow;