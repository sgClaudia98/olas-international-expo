import { StyleSheet } from "react-native";
import { Colors } from "@/styles";
import typography from "@/styles/typography";

const categoriesDesktop = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 50,
    maxWidth: 1280,
    marginHorizontal: "auto",
    marginTop: 80,
    paddingHorizontal: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 240,
    gap: 25,
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
});

export const categoriesStyles = {
  mobile: StyleSheet.create({
    ...categoriesDesktop,
    container: {
      ...categoriesDesktop.container,
      gap: 25,
    },
    categoryContainer: {
      ...categoriesDesktop.categoryContainer,
      width: "100%",
    },
  }),
  tablet: StyleSheet.create({
    ...categoriesDesktop,
  }),
  desktop: StyleSheet.create({
    ...categoriesDesktop,
  }),
};

const categoriesSliderDesktop = StyleSheet.create({
  container: {
    marginVertical: 150,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  smallHeading: {
    ...typography.bodyHighlight,
    color: Colors.black.primary,
    fontWeight: 600,
  },
  heading: {
    ...typography.h1,
    color: Colors.black.primary,
  },
  reviewsWrapper: {
    marginTop: 50,
    width: "100%",
  },
  reviewContainer: {
    padding: 30,
    flexDirection: "column",
    alignItems: "center",
    gap: 25,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: Colors.blue.second,
  },
  text: {
    ...typography.label,
    color: Colors.black.primary,
    textAlign: "center",
  },
  authorText: {
    ...typography.label,
    color: Colors.black.primary,
    fontWeight: 700,
  },
  activeColor: {
    backgroundColor: Colors.blue.second,
  },
  dotColor: {
    backgroundColor: Colors.blue.third,
  },
});

export const categoriesSliderStyles = {
  mobile: StyleSheet.create({
    ...categoriesSliderDesktop,
    container: {
      ...categoriesSliderDesktop.container,
      marginVertical: 60,
    },
    heading: {
      ...categoriesSliderDesktop.heading,
      fontSize: 24,
      lineHeight: 32,
    },
    smallHeading: {
      ...categoriesSliderDesktop.smallHeading,
      fontSize: 12,
      lineHeight: 18,
    },
  }),
  tablet: StyleSheet.create({
    ...categoriesSliderDesktop,
    container: {
      ...categoriesSliderDesktop.container,
      marginVertical: 60,
    },
  }),
  desktop: StyleSheet.create({
    ...categoriesSliderDesktop,
  }),
};

const popularBrandsDesktop = StyleSheet.create({
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

export const popularBrandsStyles = {
  mobile: StyleSheet.create({
    ...popularBrandsDesktop,
  }),
  tablet: StyleSheet.create({
    ...popularBrandsDesktop,
  }),
  desktop: StyleSheet.create({
    ...popularBrandsDesktop,
  }),
};

const shopExperienceDesktop = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: "auto",
    paddingTop: 150,
    width: "100%",
  },
  textContent: {
    flexDirection: "column",
    width: 540,
    paddingLeft: 160,
  },
  heading: {
    ...typography.h1,
    width: 540,
    color: Colors.black.primary,
    marginBottom: 75,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 40,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.black.primary,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    width: 300,
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
    position: "absolute",
    zIndex: -1,
    right: 0,
    width: "100%",
  },
  image: {
    aspectRatio: 0.87,
  },
});

export const shopExperienceStyles = {
  mobile: StyleSheet.create({
    ...shopExperienceDesktop,
    container: {
      ...shopExperienceDesktop.container,
      marginTop: 60,
      flexDirection: "column",
      width: "100%",
    },
    heading: {
      ...shopExperienceDesktop.heading,
      fontSize: 24,
      lineHeight: 32,
      marginBottom: 50,
    },
    textContent: {
      ...shopExperienceDesktop.textContent,
      width: "100%",
      paddingLeft: 40,
      paddingRight: 40,
    },
    textContainer: {
      ...shopExperienceDesktop.textContainer,
      width: 260,
      position: "relative",
    },
    itemsContainer: {
      ...shopExperienceDesktop.itemsContainer,
      marginBottom: 20,
    },
    imageContainer: {
      ...shopExperienceDesktop.imageContainer,
      width: "100%",
      position: "relative",
    },
    image: {
      ...shopExperienceDesktop.image,
      height: "auto",
      width: "auto",
      aspectRatio: 0.87,
      objectFit: "cover",
    },
  }),
  tablet: StyleSheet.create({
    ...shopExperienceDesktop,
    container: {
      ...shopExperienceDesktop.container,
      marginTop: 60,
      flexDirection: "column",
      width: "100%",
    },
    heading: {
      ...shopExperienceDesktop.heading,

      width: "100%",
    },
    textContent: {
      ...shopExperienceDesktop.textContent,
      width: "100%",
      paddingLeft: 40,
      paddingRight: 40,
    },
    textContainer: {
      ...shopExperienceDesktop.textContainer,
      width: 420,
    },
    imageContainer: {
      ...shopExperienceDesktop.imageContainer,
      height: "auto",
      width: "100%",
      position: "relative",
    },
    image: {
      ...shopExperienceDesktop.image,
      aspectRatio: 0.87,
      height: "auto",
      width: "auto",
      objectFit: "contain",
    },
  }),
  desktop: StyleSheet.create({
    ...shopExperienceDesktop,
  }),
};

export const productSliderStyles = StyleSheet.create({
  container: {
    marginHorizontal: "auto",
    maxWidth: 980,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  heading: {
    ...typography.h2,
    color: Colors.black.primary,
  },
});

const experienceForYourMobileDesktop = StyleSheet.create({
  externalContainer: {
    position: "relative",
    marginVertical: 240,
    maxWidth: 980,
    paddingHorizontal: 20,
    marginHorizontal: "auto",
  },
  container: {
    borderRadius: 35,
    backgroundColor: Colors.blue.fifth,
    paddingVertical: 50,
    paddingHorizontal: 60,
    minHeight: 390,
    flex: 1,
    flexDirection: "row",
  },
  textContainer: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  heading: {
    ...typography.h2,
    color: Colors.black.primary,
  },
  bodyText: {
    ...typography.body,
    fontWeight: 400,
  },
  btnGroup: {
    flexDirection: "row",
    gap: 15,
  },
  btnStyle: {
    backgroundColor: Colors.black.primary,
    width: 125,
    borderRadius: 7,
  },
  smallBtnText: {
    fontSize: 8,
    fontWeight: 400,
    lineHeight: 8,
  },
  normalBtnText: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: 600,
  },
  btnInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlign: "left",
    rowGap: 3,
  },
  imageContainer: {
    width: "50%",
  },
  img: {
    position: "absolute",
    width: 550,
    height: 650,
    objectFit: "contain",
    top: -200,
    right: -100,
  },
});

export const experienceForYourMobileStyles = {
  mobile: StyleSheet.create({
    ...experienceForYourMobileDesktop,
    externalContainer: {
      ...experienceForYourMobileDesktop.externalContainer,
      width: "100%",
      marginVertical: 60,
      paddingTop: 440,
    },
    container: {
      ...experienceForYourMobileDesktop.container,
      paddingHorizontal: 35,
      paddingVertical: 35,
      flexDirection: "column-reverse",
    },
    heading: {
      ...experienceForYourMobileDesktop.heading,
      fontSize: 24,
      lineHeight: 32,
    },
    textContainer: {
      ...experienceForYourMobileDesktop.textContainer,
      width: "100%",
      gap: 20,
    },
    btnGroup: {
      ...experienceForYourMobileDesktop.btnGroup,
      flexDirection: "column",
      gap: 10,
    },
    btnStyle: {
      ...experienceForYourMobileDesktop.btnStyle,
      width: "100%",
    },
    imageContainer: {
      ...experienceForYourMobileDesktop.imageContainer,
      width: "100%",
      marginHorizontal: -35,
    },
    img: {
      position: "absolute",
      width: "auto",
      height: 430,
      aspectRatio: 0.85,
      objectFit: "contain",
      top: -445,
    },
  }),
  tablet: StyleSheet.create({
    ...experienceForYourMobileDesktop,
    externalContainer: {
      ...experienceForYourMobileDesktop.externalContainer,
      marginVertical: 60,
      paddingTop: 440,
    },
    container: {
      ...experienceForYourMobileDesktop.container,

      flexDirection: "column-reverse",
    },
    textContainer: {
      ...experienceForYourMobileDesktop.textContainer,
      width: "100%",
      gap: 20,
    },
    imageContainer: {
      ...experienceForYourMobileDesktop.imageContainer,
      width: "100%",
      marginHorizontal: -35,
    },
    img: {
      position: "absolute",
      width: "auto",
      height: 430,
      aspectRatio: 0.85,
      objectFit: "contain",
      top: -445,
    },
  }),
  desktop: StyleSheet.create({
    ...experienceForYourMobileDesktop,
  }),
};

const newsletterDesktop = StyleSheet.create({
  ...categoriesSliderStyles.desktop,
  inputContainer: {
    marginTop: 20,
  },
});

export const newsletterStyles = {
  mobile: StyleSheet.create({
    ...newsletterDesktop,
    container: {
      ...newsletterDesktop.container,
      marginBottom: 20,
    },
    heading: {
      ...newsletterDesktop.heading,
      fontSize: 24,
      lineHeight: 32,
      textAlign: "center",
    },
    smallHeading: {
      ...newsletterDesktop.smallHeading,
      fontSize: 12,
      lineHeight: 18,
    },
  }),
  tablet: StyleSheet.create({
    ...newsletterDesktop,
  }),
  desktop: StyleSheet.create({
    ...newsletterDesktop,
  }),
};
