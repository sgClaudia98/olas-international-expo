import { StyleSheet } from "react-native";

const tablet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  pageContainer: {
    display: "flex",
    minHeight: "100%",
    backgroundColor: "white",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
});

const styles = {
  mobile: StyleSheet.create({
    ...tablet,
    pageContainer: {
      ...tablet.pageContainer,
      paddingHorizontal: 10,
    },
  }),
  tablet,
};

export default styles;
