import { Colors } from "@/styles";
import { StyleSheet } from "react-native";
import { hexToRgb } from "@/styles/utils";
import typography from "@/styles/typography";

export const profileStyles = {
  mobile: StyleSheet.create({
    profileCard: {
      paddingBottom: 10,
      backgroundColor: Colors.black.fifth,
      boxShadow: `0px 2px 8px rgba(${hexToRgb(Colors.black.primary)}, 0.5)`,
      borderRadius: 12,
      width: "100%",
    },
    cardHeader: {
      paddingTop: 40,
      paddingBottom: 30,
      paddingHorizontal: 30,
      backgroundColor: Colors.blue.primary,
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 30,
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12,
    },
    avatar: {
      width: 75,
      height: 75,
      borderRadius: 100,
      borderWidth: 4,
      borderColor: Colors.white.default,
    },
    profileInfoWrapper: {
      flexDirection: "column",
      justifyContent: "center",
      gap: 10,
    },
    profileInfo: {
      color: Colors.white.default,
      fontSize: 20,
      lineHeight: 24,
    },
    cardContent: {
      paddingVertical: 40,
      paddingHorizontal: 30,
      gap: 10,
    },
    cardFooter: {
      paddingHorizontal: 30,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: Colors.black.third,
    },
  }),
  tablet: StyleSheet.create({
    profileCard: {
      paddingBottom: 10,
      backgroundColor: Colors.black.fifth,
      boxShadow: `0px 2px 8px rgba(${hexToRgb(Colors.black.primary)}, 0.5)`,
      borderRadius: 12,
      width: "100%",
    },
    cardHeader: {
      paddingTop: 40,
      paddingBottom: 30,
      paddingHorizontal: 30,
      backgroundColor: Colors.blue.primary,
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 30,
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12,
    },
    avatar: {
      width: 75,
      height: 75,
      borderRadius: 100,
      borderWidth: 4,
      borderColor: Colors.white.default,
    },
    profileInfoWrapper: {
      flexDirection: "column",
      justifyContent: "center",
      gap: 10,
    },
    profileInfo: {
      color: Colors.white.default,
      fontSize: 20,
      lineHeight: 24,
    },
    cardContent: {
      paddingVertical: 40,
      paddingHorizontal: 30,
      gap: 10,
    },
    cardFooter: {
      paddingHorizontal: 30,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: Colors.black.third,
    },
  }),
  desktop: StyleSheet.create({
    profileCard: {
      paddingBottom: 10,
      backgroundColor: Colors.black.fifth,
      boxShadow: `0px 2px 8px rgba(${hexToRgb(Colors.black.primary)}, 0.5)`,
      borderRadius: 12,
      width: "35%",
    },
    cardHeader: {
      paddingTop: 40,
      paddingBottom: 30,
      paddingHorizontal: 30,
      backgroundColor: Colors.blue.primary,
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 30,
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12,
    },
    avatar: {
      width: 75,
      height: 75,
      borderRadius: 100,
      borderWidth: 4,
      borderColor: Colors.white.default,
    },
    profileInfoWrapper: {
      flexDirection: "column",
      justifyContent: "center",
      gap: 10,
    },
    profileInfo: {
      color: Colors.white.default,
      fontSize: 20,
      lineHeight: 24,
    },
    cardContent: {
      paddingVertical: 40,
      paddingHorizontal: 30,
      gap: 10,
    },
    cardFooter: {
      paddingHorizontal: 30,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: Colors.black.third,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
};
