import { Colors } from "@/styles";
import { layout } from "@/styles/sizing";
import { StyleSheet } from "react-native";

const desktop = StyleSheet.create({
  filters: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 225, // Fixed width for left panel
    gap: 5,
    alignSelf: "stretch",
  },
  filterHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

const styles = {
  mobile: StyleSheet.create({
    filters: {
      ...desktop.filters,
      width: '100%',
    },
    filterHeader: {
      ...desktop.filterHeader,
      fontSize: 14,
    },
  }),
  tablet: StyleSheet.create({
    filters: {
      ...desktop.filters,
    },
    filterHeader: {
      ...desktop.filterHeader
    },
  }),
  ...desktop
};

export default styles;
