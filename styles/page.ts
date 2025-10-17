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

export const removeHorizontalSpaces = {
  mobile: StyleSheet.create({
    container: {
      marginHorizontal: -20, // Counteract mobile scrollContent padding + margin (10 + 10)
    },
  }),
  tablet: StyleSheet.create({
    container: {
      marginHorizontal: -45, // Counteract tablet scrollContent padding + margin (20 + 25)
    },
  }),
  desktop: StyleSheet.create({
    container: {
      marginHorizontal: -105, // Counteract desktop scrollContent padding + margin (20 + 85)
    },
  }),
  bigDesktop: StyleSheet.create({
    container: {
      marginHorizontal: -105, // Counteract bigDesktop scrollContent padding + margin (20 + 85)
    },
  }),
};

export default styles;
