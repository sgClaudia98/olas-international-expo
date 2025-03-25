import { StyleSheet } from "react-native";
import { cardStyle } from "@/styles/card";

const desktop = StyleSheet.create({
    
})

export const orderStyles = {
  mobile: StyleSheet.create({
    ...cardStyle.mobile,
    ...desktop
  }),
  tablet: StyleSheet.create({
    ...cardStyle.tablet,
    ...desktop
  }),
  desktop: StyleSheet.create({
    ...cardStyle.desktop,
    ...desktop
  }),
};
