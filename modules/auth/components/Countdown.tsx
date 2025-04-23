import React, { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextStyle } from "react-native";

interface CountdownProps {
  duration: number; // Duration in seconds
  onComplete?: () => void; // Callback when countdown completes
  style?: TextStyle; // Custom style for the countdown text
  storageKey: string; // Key to save the timestamp in AsyncStorage
}

const Countdown: React.FC<CountdownProps> = ({
  duration,
  onComplete,
  style,
  storageKey,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const restoreCountdown = async () => {
      let expireAt = await AsyncStorage.getItem(storageKey);
      if (!expireAt) {
        expireAt = (Date.now() + duration * 1000).toString();
      }
      if (expireAt && duration > 0) {
        const currentTime = Date.now();
        const remainingTime = Math.max(
          0,
          Math.floor((parseInt(expireAt) - currentTime) / 1000)
        );
        setTimeLeft(remainingTime);

        if (remainingTime > 0) {
          startCountdown(remainingTime);
        } else {
          if (onComplete) onComplete();
        }
      } else {
        setTimeLeft(duration);
      }
    };

    restoreCountdown();
  }, [duration, onComplete, storageKey]);

  const startCountdown = async (initialTime: number) => {
    const now = Date.now();
    const expireAt = now + initialTime * 1000;
    await AsyncStorage.setItem(storageKey, expireAt.toString());

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          AsyncStorage.removeItem(storageKey);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <ThemedText style={style}>
      {timeLeft > 0 ? formatTime(timeLeft) : "00:00"}
    </ThemedText>
  );
};

export default Countdown;
