import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { Colors } from "@/styles";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import {profileStyles} from "../../styles/profile"
import Skeleton from "@/components/Skeleton";


const ProfileSkeleton = () => {
  const styles = useResponsiveStyles(profileStyles)

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
          <Skeleton width={"100%"} height={22} style={{}} />
      </View>

      <View style={styles.cardContent}>
        <Skeleton width={"100%"} height={70} style={{}} />
      </View>

    </View>
  );
};

export default ProfileSkeleton;
