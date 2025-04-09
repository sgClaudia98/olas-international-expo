import React from "react";
import { View, Text } from "react-native";
import { stepProgressStyles, stepProgressStylesMinimal } from "../../styles/paymentForm";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { useTranslation } from "react-i18next";
import { ThemedText } from "@/components/ThemedText";

interface StepProgressProps {
  step: number | string; // `step` can be a number (index) or a string (label)
  steps: string[]; // Array of step labels
  i18nPrefix?: string; // Optional prefix for i18n translation
  styleType?: "default" | "minimal"; // Type of style to apply
}

const StepProgress = ({ step, steps, i18nPrefix, styleType = "default" }: StepProgressProps) => {
  const { t } = useTranslation();

  // Handle the case when `step` is a string (label) or a number (index)
  const currentStepIndex =
    typeof step === "number" ? step : steps.indexOf(step);

  const styles = useResponsiveStyles(styleType == "default" ? stepProgressStyles : stepProgressStylesMinimal);


  return (
    <View style={styles.container}>
      {steps.flatMap((label, index) => {
  const isActive = currentStepIndex === index;
  const isCompleted = index < currentStepIndex;

  const stepComponent = (
    <View key={`step-${index}`} style={styles.stepWrapper}>
      <View style={styles.stepContainer}>
        <View
          style={[
            styles.step,
            isActive ? styles.stepActive : isCompleted ? styles.stepCompleted : {},
          ]}>
          <ThemedText
            type="defaultBold"
            style={[
              styles.stepNumber,
              isCompleted
                ? styles.stepNumberCompleted
                : isActive
                ? styles.stepNumberActive
                : {},
            ]}>
            {index + 1}
          </ThemedText>
        </View>

        <ThemedText
          style={[
            styles.stepText,
            isActive ? styles.stepTextActive : isCompleted ? styles.stepTextCompleted : {},
          ]}>
          {t(i18nPrefix ? `${i18nPrefix}.${label}` : label)}
        </ThemedText>
      </View>
    </View>
  );

  // Add a separator before every step except the first one
  if (index === 0) return [stepComponent];

  const separator = (
    <View
      key={`separator-${index}`}
      style={[styles.line, currentStepIndex >= index ? styles.lineCompleted : {}]}
    />
  );

  return [separator, stepComponent];
})}
    </View>
  );
};

export default StepProgress;
