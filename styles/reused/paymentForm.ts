import { StyleSheet } from "react-native";
import { Colors } from "@/styles";
import typography from "@/styles/typography";
import theme from "@/styles/paperTheme";
import { resumeStyles } from "../resume";

const desktop = StyleSheet.create({
  ...resumeStyles,
  modalScrollContainer: {
    flex: 1,
    backgroundColor: "rgba(8, 51, 102, 0.25)",
  },
  modalScrollContent: {
    flexGrow: 1,
  },
  paymentButtonsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    maxWidth: 800,
    backgroundColor: "white",
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  closeModalButton: {
    position: "absolute",
    right: 0,
    top: 20,
    backgroundColor: "transparent",
    zIndex: 999,
  },
  formContainer: {
    paddingVertical: 40,
    maxWidth: 800,
    minWidth: 700,
    marginHorizontal: "auto",
  },
  title: {
    ...typography.h3,
    marginBottom: 15,
    textAlign: "center",
    color: Colors.black.primary,
  },
  error: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 5,
  },
  input: {
    ...typography.body,
    color: Colors.black.primary,
    borderBottomColor: Colors.black.third,
    backgroundColor: Colors.black.fifth,
    height: 40,
    marginBottom: 15,
  },
  label: {
    ...typography.label,
    marginBottom: 5,
    color: Colors.black.second,
  },
  twoColumnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  columnLeft: {
    flex: 1,
    marginRight: 10,
  },
  columnRight: {
    flex: 2,
  },
  column: {
    flex: 1,
  },
  contentBoxStyle: {
    borderRadius: 8,
    minHeight: 240,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  text: {
    ...typography.label,
    color: Colors.black.primary,
  },
  productTableContainer: {
    marginTop: 60,
  },
  orderText: {
    ...typography.title2B,
    fontWeight: 600,
    color: Colors.black.primary,
    marginBottom: 15,
  },
  tableHeader: {
    borderBottomColor: Colors.black.fourth,
  },
  tableRow: {
    borderBottomWidth: 0,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.black.fourth,
  },
  commentsContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 15,
  },
  commentsButton: {
    alignSelf: "flex-start",
  },
  commentsTextArea: {
    backgroundColor: Colors.black.fifth,
    borderRadius: 5,
    borderWidth: 0,
    padding: 15,
  },
  totalPrice: {
    ...typography.title2B,
    color: Colors.black.primary,
    alignSelf: "flex-end",
    marginTop: 15,
  },
});

export const paymentFormStyles = {
  mobile: StyleSheet.create({
    ...desktop,
    modalContent: {
      ...desktop.modalContent,
      maxWidth: 360,
    },
    formContainer: {
      ...desktop.formContainer,
      minWidth: 320,
      paddingBottom: 20,
    },
    twoColumnContainer: {
      ...desktop.twoColumnContainer,
      flexDirection: "column",
    },
    columnLeft: {
      ...desktop.columnLeft,
      flex: 1,
      marginRight: 0,
    },
    columnRight: {
      ...desktop.columnRight,
      flex: 1,
    },
    column: {
      ...desktop.column,
      flex: 1,
    },
    contentBoxStyle: {
      ...desktop.contentBoxStyle,
      minHeight: "auto",
    },
  }),
  tablet: StyleSheet.create({
    ...desktop,
    modalContent: {
      ...desktop.modalContent,
      maxWidth: 600,
    },
    formContainer: {
      ...desktop.formContainer,
      maxWidth: 600,
      minWidth: 400,
    },
  }),
  desktop: StyleSheet.create({
    ...desktop,
  }),
};

const stepProgressDesktop = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 45,
  },
  stepWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepContainer: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.black.third,
    justifyContent: "center",
    alignItems: "center",
  },
  stepActive: {
    backgroundColor: Colors.blue.second,
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  stepCompleted: {
    backgroundColor: Colors.black.primary,
  },
  stepNumber: {
    color: Colors.white.default,
    fontWeight: "bold",
    fontSize: 14,
  },
  stepNumberActive: {
    color: Colors.white.default,
  },
  stepNumberCompleted: {
    color: Colors.white.default,
  },
  stepText: {
    color: Colors.black.third,
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  stepTextActive: {
    color: Colors.blue.second,
  },
  stepTextCompleted: {
    color: Colors.black.primary,
  },
  line: {
    height: 2,
    backgroundColor: Colors.black.third,
    flex: 1,
    marginHorizontal: 4,
    marginTop: -25,
    alignSelf: "center",
    flexGrow: 1,
  },
  lineCompleted: {
    backgroundColor: Colors.black.primary,
  },
});

export const stepProgressStyles = {
  mobile: StyleSheet.create({
    ...stepProgressDesktop,
    container: {
      ...stepProgressDesktop.container,
      marginBottom: 25,
    },
    line: {
      ...stepProgressDesktop.line,
    },
  }),
  tablet: StyleSheet.create({
    ...stepProgressDesktop,
    line: {
      ...stepProgressDesktop.line,
    },
  }),
  desktop: StyleSheet.create({
    ...stepProgressDesktop,
  }),
};

const stepProgressDesktopMinimal = StyleSheet.create({
  ...stepProgressDesktop,
  step: {
    ...stepProgressDesktop.step,
    width: 20,
    height: 20,
  },
  stepText: {
    ...stepProgressDesktop.stepText,
    fontSize: 14,
    fontWeight: "400",
  },
  stepActive: {
    ...stepProgressDesktop.stepActive,
    backgroundColor: Colors.white.default,
    borderWidth: 2,
    width: 24,
    height: 24,
    borderColor: Colors.black.primary,
  },
  stepNumber: {
    ...stepProgressDesktop.stepNumber,
    fontSize: 11,
  },
  stepNumberActive: {
    color: Colors.black.primary,
    fontSize: 14,
  },
  stepNumberCompleted: {
    color: Colors.black.primary,
  },

  stepTextActive: {
    color: Colors.black.primary,
  },
  stepTextCompleted: {
    color: Colors.black.primary,
  },
});

export const stepProgressStylesMinimal = {
  mobile: StyleSheet.create({
    ...stepProgressDesktopMinimal,
    container: {
      ...stepProgressDesktopMinimal.container,
      marginBottom: 25,
    },
    line: {
      ...stepProgressDesktopMinimal.line,
    },
  }),
  tablet: StyleSheet.create({
    ...stepProgressDesktopMinimal,
    line: {
      ...stepProgressDesktopMinimal.line,
    },
  }),
  desktop: StyleSheet.create({
    ...stepProgressDesktopMinimal,
  }),
};
