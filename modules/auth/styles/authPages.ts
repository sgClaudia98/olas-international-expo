import { StyleSheet } from "react-native";
import { cardStyle } from "@/styles/card";
import { Colors } from "@/styles";

const desktop = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
    },
    actionsContainer: {
        gap: 12,
        alignItems: "center" 
    },
    headerContainer: {
        marginTop: 36,
        marginBottom: 36,
        alignItems: "center",
    },
    headerText: {
        fontSize: 22,
        lineHeight: 26,
        letterSpacing: 0.2,
        color: Colors.black.primary,
        marginBottom: 6
    },
    subheaderText: {
        fontSize: 16,
        lineHeight: 24,
        color: Colors.black.second, 
    },
  formContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 43,
  },
  formRow: {
    gap: 25,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  formColumn: {
    width: "40%",
  },
  formLabel: {
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 5,
  },
  formInput: {
    backgroundColor: "transparent",
    height: 35,
  },
});

export const authPagesStyles = {
  mobile: StyleSheet.create({
    ...cardStyle.mobile,
    card: {
      ...cardStyle.mobile.card,
      width: '100%',
    },
    ...desktop,
    formContainer: {
      ...desktop.formContainer,
      width: "100%",
    },
    formRow: {
      ...desktop.formRow,
      gap: 0,
    },
    formColumn: {
      ...desktop.formColumn,
      width: "100%",
      gap: 18,
    }
  }),
  tablet: StyleSheet.create({
    ...cardStyle.tablet,
    card: {
      ...cardStyle.tablet.card,
      width: '100%',
    },
    ...desktop,
    formContainer: {
      ...desktop.formContainer,
      width: "100%",
    },
    formRow: {
      ...desktop.formRow,
      gap: 15,
    },
    formColumn: {
      ...desktop.formColumn,
      width: "100%",      
    },
  }),
  desktop: StyleSheet.create({
    ...cardStyle.desktop,
    ...desktop,
  }),
};
