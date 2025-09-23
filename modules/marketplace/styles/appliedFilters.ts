import { Colors } from "@/styles";
import { StyleSheet } from "react-native";

const base = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.default,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.black.fourth,
  },
  mainRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clearButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: Colors.blue.fifth,
    marginTop: 3,
  },
  clearButtonText: {
    fontSize: 12,
    color: Colors.black.second,
    fontWeight: '400',
  },
  filtersContainer: {
    flex: 1,
    marginRight: 8,
  },
  chip: {
    backgroundColor: Colors.black.fifth,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 3,
    borderColor: Colors.black.fourth,
    cursor: 'pointer',
  },
  chipText: {
    fontSize: 11,
  },
});

const styles = {
  mobile: StyleSheet.create({
    ...base,
    container: {
      ...base.container,
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    clearButtonText: {
      ...base.clearButtonText,
      fontSize: 12,
    },
    clearButton: {
      ...base.clearButton,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    chip: {
      ...base.chip,
      height: 26,
      paddingHorizontal: 2,
      marginRight: 4,
    },
    chipText: {
      ...base.chipText,
      fontSize: 12,
    },
  }),
  tablet: StyleSheet.create({
    ...base,
  }),
  desktop: StyleSheet.create({
    ...base,
    container: {
      ...base.container,
      paddingVertical: 14,
    },
  }),
};

export default styles;