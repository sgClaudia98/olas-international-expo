import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '@/styles';
import typography from '@/styles/typography';

interface ContentBoxProps {
  title?: string;
  data: Record<string, string>;
  backgroundColor: string;
}

const ContentBox: React.FC<ContentBoxProps> = ({title, data, backgroundColor}) => {
  return (
    <View style={[styles.contentBox, {backgroundColor}]}>
      <Text style={styles.title}>{title}</Text>
      {Object.entries(data).map(([key, value]) => (
        <Text
          key={key}
          style={styles.text}>
          {value}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...typography.bodyHighlight,
    color: Colors.black.primary,
    fontWeight: 600,
    marginBottom: 15,
  },
  contentBox: {
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 20,
    minHeight: 215,
    marginHorizontal: 5,
  },
  text: {
    ...typography.label,
    color: Colors.black.primary,
  },
});

export default ContentBox;
