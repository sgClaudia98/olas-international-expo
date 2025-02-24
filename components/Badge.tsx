import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';

interface BadgeProps {
  text: string;
  color?: string;
  textColor?: string;
  width?: number;
  height?: number;
  style?: ViewStyle
}

const Badge: React.FC<BadgeProps> = ({
  text,
  color = '#1A94F7',
  textColor = 'white',
  width = 50,
  height = 20,
  style
}) => {
  return (
    <View style={{ ...style, width, height, justifyContent: 'center', alignItems: 'center' }} >
      <Svg
        width={width}
        height={height}
        viewBox="0 0 50 20"
        fill="none"
      >
        <Path
          d="M1.29531 18.3764L7.05594 11.1556C7.33434 10.8066 7.34772 10.3154 7.08872 9.95177L1.12557 1.58017C0.65402 0.91817 1.12729 0 1.94007 0L49 0C49.5523 0 50 0.44772 50 1V19C50 19.5523 49.5523 20 49 20H2.07703C1.23915 20 0.772781 19.0313 1.29531 18.3764Z"
          fill={color}
        />
        <SvgText
          x="30"
          y="13"
          textAnchor="middle"
          fontSize="12"
          fill={textColor}
          fontWeight="700"
        >
          {text}
        </SvgText>
      </Svg>
    </View>
  );
};

export default Badge;
