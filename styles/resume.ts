import { Colors } from "."
import { StyleSheet } from "react-native";

export const resumeStyles =  StyleSheet.create({
  resumeTotal: {
    marginTop: 29,
    width: "100%",
    backgroundColor: Colors.black.fifth,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap:10,
  },
  resumeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
    lineHeight: 25,
  }
})

