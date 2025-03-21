import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Colors } from "@/styles";
import typography from "@/styles/typography";

const desktop = StyleSheet.create({
  container: {
    backgroundColor: Colors.black.primary,
    paddingVertical: 60,
    paddingHorizontal: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 25,
    gap: 40,
    width: "100%",
    marginHorizontal: "auto",
  },
  logoSection: {
    minWidth: 200,
  },
  footerMenu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 80,
  },
  logo: {
    marginBottom: 25,
  },
  text: {
    color: Colors.blue.fourth,
    marginBottom: 12,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 10,
  },
  sectionTitle: {
    ...typography.bodyHighlight,
    color: Colors.blue.fourth,
    fontWeight: "600",
    marginBottom: 27,
  },
  footerItemText: {
    color: Colors.blue.third,
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  bottomSection: {
    marginVertical: 20,
    width: "100%",
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  copyright: {
    color: Colors.black.primary,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 400,
  },
  paymentMethods: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  footerItemContainer: {
    flexDirection: "column",
    gap: 18,
  }
})

const styles = {
  mobile: StyleSheet.create({
    ...desktop,
    container: {
      ...desktop.container,
      paddingHorizontal: 50,
      flexDirection: "column",
      width: "auto",
      marginHorizontal: 20 ,
    },
    logoSection: {
      ...desktop.logoSection,
      minWidth: "100%",
    },
    footerMenu: {
      ...desktop.footerMenu,
      flexDirection: "column",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 40,
    },
    footerItemContainer: {
      ...desktop.footerItemContainer,
      gap: 14,
    },
    footerItemText: {
      ...desktop.footerItemText,
      lineHeight: 14,
    },
    sectionTitle: {
      ...desktop.sectionTitle,
      marginBottom: 12,
    },
    bottomSection: {
      ...desktop.bottomSection,
      flexDirection: "column",
      marginHorizontal: 56,
      alignItems: "center",
      width: "auto",
    },
    copyright: {
      ...desktop.copyright,
      flexWrap: "wrap",
      textAlign: "center",
      marginBottom: 16,
    },
  }),
  tablet: StyleSheet.create({
    ...desktop,
    container: {
      ...desktop.container,
      flexDirection: "column",
      alignItems: "center",
      width: "auto",
      marginHorizontal: 20 ,
    },
  }),
  desktop
};

export default styles;
