import { StyleSheet } from "react-native";
import { cardStyle } from "@/styles/card";
import { header } from "@/modules/marketplace/layout/header";

const desktop = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 10,
    width: "100%",
    gap: 18,
  },
  formRow: {
    gap: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  formColumn: {
    flex: 1,
    minWidth: 280,
    maxWidth: 400,
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
      minWidth: 'auto',
      maxWidth: 'auto',
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
      minWidth: 'auto',
      maxWidth: 'auto',
    },
  }),
  desktop: StyleSheet.create({
    ...cardStyle.desktop,
    ...desktop,
  }),
};
