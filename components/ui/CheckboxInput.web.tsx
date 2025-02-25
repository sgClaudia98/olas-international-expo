import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-web';  // Import Checkbox from react-native-web
import * as Colors from '@/styles/colors';

interface CheckboxInputProps {
    label: string;
    isChecked: boolean;
    onChange: (checked: boolean) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, isChecked, onChange }) => {

    const handleCheck = () => {
        onChange(!isChecked);
    };

    return (
        <View style={styles.container}>
            {/* Web-specific Checkbox component */}
            <CheckBox
                value={isChecked}
                onValueChange={handleCheck}
                style={styles.checkbox}
                color={isChecked ? Colors.blue.primary: Colors.black.third}
            />
            {/* Label as Pressable */}
            <Pressable onPress={handleCheck}>
                <Text style={styles.text}>
                    {label}
                </Text>
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
        height: 15,
        borderBlockColor: Colors.black.third
    },
    text: {
        fontSize: 16,
        color: Colors.black.second,
    },
});

export default CheckboxInput;
