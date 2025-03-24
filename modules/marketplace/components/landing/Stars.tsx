import React from "react";
import { View } from "react-native";
import { StarIcon } from "@/assets/icons/StarIcon";

export const Stars: React.FC<{
  number: number;
  fillColor?: string;
  emptyStarColor?: string;
}> = ({ number, fillColor, emptyStarColor }) => {
  const totalStars = 5;

  return (
    number > 0 &&
    number <= totalStars && (
      <View style={{ flexDirection: "row", gap: 3 }}>
        {Array.from({ length: totalStars }, (_, i) =>
          i < number ? (
            <StarIcon key={String(i)} stroke={fillColor} />
          ) : (
            <StarIcon key={String(i)} stroke={emptyStarColor} />
          )
        )}
      </View>
    )
  );
};
