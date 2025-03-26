import { StyleSheet } from "react-native";

const desktop = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  pageContainer: {
    display: "flex",
    minHeight: "100%",
    padding: 20,
    marginHorizontal: 85
  },
});

const styles = {
  mobile: StyleSheet.create({
    ...desktop,
    pageContainer: {
      paddingHorizontal: 10,
      marginHorizontal: 10
    },
  }),
  desktop,
};

export default styles;
