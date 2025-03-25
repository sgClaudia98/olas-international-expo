import { StyleSheet } from "react-native";

const tablet = StyleSheet.create({
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
    ...tablet,
    pageContainer: {
      ...tablet.pageContainer,
      paddingHorizontal: 10,
      marginHorizontal: 0,
      minHeight: 0
    },
  }),
  tablet,
};

export default styles;
