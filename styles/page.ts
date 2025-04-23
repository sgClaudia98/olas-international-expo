import { BREAKPOINTS } from "@/hooks/useBreakpoints";
import { StyleSheet } from "react-native";

const desktop = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
    width: "100%",
    minHeight: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    marginHorizontal: 85,
  },
  pageContainer: {
    display: "flex",
    paddingBottom: 40,
  },
});

const styles = {
  mobile: StyleSheet.create({
    ...desktop,
    scrollContent: {
      ...desktop.scrollContent,
      paddingHorizontal: 10,
      marginHorizontal: 10,
      paddingBottom: 20,
    },
  }),
  tablet: StyleSheet.create({
    ...desktop,
    scrollContent: {
      ...desktop.scrollContent,
      marginHorizontal: 25,
    },
  }),
  desktop,
  bigDesktop: StyleSheet.create({
    ...desktop,
    innerContainer: {
      flex: 1,
      marginHorizontal: "auto",
      maxWidth: BREAKPOINTS.desktop,
    },
  }),
};

export const breadcrumbContainer = {
  marginTop: 30,
};

export default styles;
