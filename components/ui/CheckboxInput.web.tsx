import React from 'react';
import { View, Text, Pressable, StyleSheet, TextStyle } from 'react-native';
import { CheckBox } from 'react-native-web';  // Import Checkbox from react-native-web
import * as Colors from '@/styles/colors';
import { ThemedText } from '../ThemedText';

interface CheckboxInputProps {
    label: string;
    isChecked: boolean;
    onChange: (checked: boolean) => void;
    labelStyle?: TextStyle; // Optional style for the label text
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, isChecked, onChange, labelStyle }) => {

    const handleCheck = () => {
        onChange(!isChecked);
    };

    return (
        <Pressable onPress={handleCheck} style={styles.container}>
            {/* Web-specific Checkbox component */}
            <CheckBox
                value={isChecked}
                onValueChange={handleCheck}
                style={styles.checkbox}
                color={isChecked ? Colors.blue.primary: Colors.black.third}
            />
            {/* Label as Pressable */}
                <ThemedText style={StyleSheet.flatten([styles.text, labelStyle])}>
                    {label}
                </ThemedText>
            </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 10,
        width: 15,
        height: 15,
        borderBlockColor: Colors.black.third
    },
    text: {
        fontSize: 16,
        flexShrink: 1,
        color: Colors.black.second,
    },
});

export default CheckboxInput;
