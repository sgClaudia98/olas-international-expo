import React from 'react';
import {View, Text} from 'react-native';
import {stepProgressStyles as styles} from '../../styles/paymentForm';

const StepProgress = ({step}: {step: number}) => {
  const steps = ['Client', 'Beneficiary', 'Book'];

  return (
    <View style={styles.container}>
      {steps.map((label, index) => {
        const isActive = step === index;
        const isCompleted = index < step;

        return (
          <View
            key={index}
            style={styles.stepWrapper}>
            {index !== 0 && <View style={[styles.line, step >= 2 ? styles.lineCompleted : {}]} />}

            <View style={styles.stepContainer}>
              <View
                style={[
                  styles.step,
                  isActive ? styles.stepActive : isCompleted ? styles.stepCompleted : {},
                ]}>
                <Text
                  style={[
                    styles.stepNumber,
                    isCompleted
                      ? styles.stepNumberCompleted
                      : isActive
                        ? styles.stepNumberActive
                        : {},
                  ]}>
                  {index + 1}
                </Text>
              </View>

              <Text
                style={[
                  styles.stepText,
                  isActive ? styles.stepTextActive : isCompleted ? styles.stepTextCompleted : {},
                ]}>
                {label}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default StepProgress;