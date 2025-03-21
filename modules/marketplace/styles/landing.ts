import { StyleSheet } from "react-native";
import { Colors } from "@/styles";
import typography from "@/styles/typography";

export const categoriesStyles = {
  mobile: StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      rowGap: 20,
      paddingHorizontal: 20,
    },
    categoryContainer: {
      width: "45%",
      flexDirection: "row",
      gap: 25,
      alignItems: "center",
    },
    iconContainer: {
      backgroundColor: Colors.blue.fifth,
      borderRadius: "50%",
      width: 72,
      height: 72,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    name: {
      ...typography.body,
      color: Colors.black.primary,
    },
  }),
  tablet: StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    categoryContainer: {
      width: "15%",
      flexDirection: "row",
      gap: 25,
      alignItems: "center",
    },
    iconContainer: {
      backgroundColor: Colors.blue.fifth,
      borderRadius: "50%",
      width: 72,
      height: 72,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    name: {
      ...typography.body,
      color: Colors.black.primary,
    },
  }),
};

export const categoriesSliderStyles = StyleSheet.create({
  container: {
    marginVertical: 150,
    flexDirection: "column",
    alignItems: "center",
  },
  smallHeading: {
    ...typography.bodyHighlight,
    color: Colors.black.primary,
  },
  heading: {
    ...typography.h1,
    color: Colors.black.primary,
  },
  sliderContainer: {
    marginTop: 50,
  },
});

export const popularBrandsStyles = StyleSheet.create({
  container: {
    marginBottom: 150,
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 980,
    marginHorizontal: "auto",
    paddingHorizontal: 20,
  },
  heading: {
    ...typography.h2,
    color: Colors.black.primary,
    fontWeight: 700,
  },
  brandsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 60,
    marginTop: 80,
  },
});

export const shopExperienceStyles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: 1180,
      marginHorizontal: "auto",
      marginBottom: 150,
    },
    textContent: {
      flexDirection: "column",
      width: "45%",
    },
    heading: {
      ...typography.h1,
      color: Colors.black.primary,
      marginBottom: 75,
    },
    itemsContainer: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 40,
    },
    iconContainer: {
        width: 50,
        height: 50,
        backgroundColor: Colors.black.primary,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flexDirection: 'column',
        gap: 8,
        width: 350
    },
    text: {
      ...typography.title2B,
      color: Colors.black.primary,
      fontWeight: 600,
    },
    subText: {
      ...typography.label,
      color: Colors.black.primary,
    },
    imageContainer: {
        width: '50%'
    },
    image: {
      width: 695,
      height: 895,
    },
  });

  export const productSliderStyles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        maxWidth: 980,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    }, 
    heading: {
        ...typography.h2,
        color: Colors.black.primary
    }
  })