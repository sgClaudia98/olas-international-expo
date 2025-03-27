import { BREAKPOINTS } from "@/hooks/useBreakpoints";
import { StyleSheet } from "react-native";
import { Colors } from ".";

const desktop = StyleSheet.create({
  container: {
    paddingHorizontal: 105,
    flex: 1,
    backgroundColor: "white",
  },
  subContainer: {
    borderColor: Colors.black.fourth,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  containerLeft: {
    flexDirection: "row",
  },
  containerRight: {
    backgroundColor: "transparent",
    elevation: 0,
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
});

const styles = {
  mobile: StyleSheet.create({
    ...desktop,
    container: {
      ...desktop.container,
      paddingHorizontal: 20,
    },
    containerLeft: {
      ...desktop.containerLeft,
    },
    containerRight: {
      ...desktop.containerRight,
    },
  }),
  tablet: StyleSheet.create({
    ...desktop,
    container: {
      ...desktop.container,
      paddingHorizontal: 35,
    },
    containerLeft: {
      ...desktop.containerLeft,
    },
    containerRight: {
      ...desktop.containerRight,
    },
  }),
  desktop,
};

export const breadcrumbContainer = {
  marginTop: 30,
};

export default styles;
