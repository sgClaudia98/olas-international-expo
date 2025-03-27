import { StyleSheet } from "react-native";
import { Colors } from "@/styles";
import typography from "@/styles/typography";
import theme from "@/styles/paperTheme";

const desktop = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(8, 51, 102, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    maxWidth: 800,
    backgroundColor: "white",
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
    modalOverlay: {
      ...desktop.modalOverlay,
    },
    modalContent: {
      ...desktop.modalContent,
      maxWidth: 360,
    },
    closeModalButton: {
      ...desktop.closeModalButton,
    },
    formContainer: {
      ...desktop.formContainer,
      minWidth: 320,
      paddingBottom: 20,
    },
    title: {
      ...desktop.title,
    },
    error: {
      ...desktop.error,
    },
    buttonContainer: {
      ...desktop.buttonContainer,
    },
    button: {
      ...desktop.button,
    },
    input: {
      ...desktop.input,
    },
    label: {
      ...desktop.label,
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
      minHeight: 'auto',
    },
    text: {
      ...desktop.text,
    },
    productTableContainer: {
      ...desktop.productTableContainer,
    },
    orderText: {
      ...desktop.orderText,
    },
    tableHeader: {
      ...desktop.tableHeader,
    },
    tableRow: {
      ...desktop.tableRow,
    },
    separator: {
      ...desktop.separator,
    },
    commentsContainer: {
      ...desktop.commentsContainer,
    },
    commentsButton: {
      ...desktop.commentsButton,
    },
    commentsTextArea: {
      ...desktop.commentsTextArea,
    },
    totalPrice: {
      ...desktop.totalPrice,
    },
  }),
  tablet: StyleSheet.create({
    modalOverlay: {
      ...desktop.modalOverlay,
    },
    modalContent: {
      ...desktop.modalContent,
      maxWidth: 600,
    },
    closeModalButton: {
      ...desktop.closeModalButton,
    },
    formContainer: {
      ...desktop.formContainer,
      maxWidth: 600,
      minWidth: 400,
    },
    title: {
      ...desktop.title,
    },
    error: {
      ...desktop.error,
    },
    buttonContainer: {
      ...desktop.buttonContainer,
    },
    button: {
      ...desktop.button,
    },
    input: {
      ...desktop.input,
    },
    label: {
      ...desktop.label,
    },
    twoColumnContainer: {
      ...desktop.twoColumnContainer,
    },
    columnLeft: {
      ...desktop.columnLeft,
    },
    columnRight: {
      ...desktop.columnRight,
    },
    column: {
      ...desktop.column,
    },
    contentBoxStyle: {
      ...desktop.contentBoxStyle
    },
    text: {
      ...desktop.text,
    },
    productTableContainer: {
      ...desktop.productTableContainer,
    },
    orderText: {
      ...desktop.orderText,
    },
    tableHeader: {
      ...desktop.tableHeader,
    },
    tableRow: {
      ...desktop.tableRow,
    },
    separator: {
      ...desktop.separator,
    },
    commentsContainer: {
      ...desktop.commentsContainer,
    },
    commentsButton: {
      ...desktop.commentsButton,
    },
    commentsTextArea: {
      ...desktop.commentsTextArea,
    },
    totalPrice: {
      ...desktop.totalPrice,
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
    backgroundColor: Colors.black.fifth,
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
    color: Colors.black.fifth,
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
    backgroundColor: Colors.black.fifth,
    flex: 1,
    marginHorizontal: 4,
    marginTop: -25,
    alignSelf: "center",
    width: 100,
  },
  lineCompleted: {
    backgroundColor: Colors.black.primary,
  },
});

export const stepProgressStyles = {
  mobile: StyleSheet.create({
    container: {
      ...stepProgressDesktop.container,
      marginBottom: 25,
    },
    stepWrapper: {
      ...stepProgressDesktop.stepWrapper,
    },
    stepContainer: {
      ...stepProgressDesktop.stepContainer,
    },
    step: {
      ...stepProgressDesktop.step,
    },
    stepActive: {
      ...stepProgressDesktop.stepActive,
    },
    stepCompleted: {
      ...stepProgressDesktop.stepCompleted,
    },
    stepNumber: {
      ...stepProgressDesktop.stepNumber,
    },
    stepNumberActive: {
      ...stepProgressDesktop.stepNumberActive,
    },
    stepNumberCompleted: {
      ...stepProgressDesktop.stepNumberCompleted,
    },
    stepText: {
      ...stepProgressDesktop.stepText,
    },
    stepTextActive: {
      ...stepProgressDesktop.stepTextActive,
    },
    stepTextCompleted: {
      ...stepProgressDesktop.stepTextCompleted,
    },
    line: {
      ...stepProgressDesktop.line,
      width: 40,
    },
    lineCompleted: {
      ...stepProgressDesktop.lineCompleted,
    },
  }),
  tablet: StyleSheet.create({
    container: {
      ...stepProgressDesktop.container,
    },
    stepWrapper: {
      ...stepProgressDesktop.stepWrapper,
    },
    stepContainer: {
      ...stepProgressDesktop.stepContainer,
    },
    step: {
      ...stepProgressDesktop.step,
    },
    stepActive: {
      ...stepProgressDesktop.stepActive,
    },
    stepCompleted: {
      ...stepProgressDesktop.stepCompleted,
    },
    stepNumber: {
      ...stepProgressDesktop.stepNumber,
    },
    stepNumberActive: {
      ...stepProgressDesktop.stepNumberActive,
    },
    stepNumberCompleted: {
      ...stepProgressDesktop.stepNumberCompleted,
    },
    stepText: {
      ...stepProgressDesktop.stepText,
    },
    stepTextActive: {
      ...stepProgressDesktop.stepTextActive,
    },
    stepTextCompleted: {
      ...stepProgressDesktop.stepTextCompleted,
    },
    line: {
      ...stepProgressDesktop.line,
      width: 65,
    },
    lineCompleted: {
      ...stepProgressDesktop.lineCompleted,
    },
  }),
  desktop: StyleSheet.create({
    ...stepProgressDesktop,
  }),
};
