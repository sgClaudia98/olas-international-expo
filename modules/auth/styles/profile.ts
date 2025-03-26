import { StyleSheet } from "react-native";
import { cardStyle } from "@/styles/card";

const desktop = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 10,
    width: "100%",
    gap: 18,
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

export const profileStyles = {
  mobile: StyleSheet.create({
    ...cardStyle.mobile,
    card: {
      ...cardStyle.mobile,
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
      ...cardStyle.tablet,
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
