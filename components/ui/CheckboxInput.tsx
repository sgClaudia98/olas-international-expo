import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextStyle } from 'react-native';
import CheckBox from 'expo-checkbox';
import * as Colors from '@/styles/colors'
import { ThemedText } from '../ThemedText';

interface CheckboxInputProps {
    label: string; // The label text for the checkbox
    isChecked: boolean; // Determines whether the checkbox is checked or not
    onChange: (checked: boolean) => void; // Function to handle state change when checkbox is clicked
    labelStyle?: TextStyle; // Optional style for the label text
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, isChecked, onChange, labelStyle }) => {

    const handleCheck = () => {
        onChange(!isChecked)
    };

    return (
        <View style={styles.container}>
            <CheckBox
                value={isChecked}
                onValueChange={handleCheck}
                style={styles.checkbox}
                color={Colors.blue.primary}
            />
            <Pressable onPress={handleCheck}>
                <ThemedText style={StyleSheet.flatten([styles.text, labelStyle])} >
                    {label}
                </ThemedText>
            </Pressable>

        </View>
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
        height: 15
    },
    text: {
        fontSize: 16,
        color: Colors.black.primary
    },
});

export default CheckboxInput;
