import { Colors } from "@/styles";
import Fonts from "@/styles/fonts";
import typography from "@/styles/typography";
import { StyleSheet } from "react-native";

export const PROD_IMAGE_SIZE = {
  mobile: 150,
  tablet: 225,
};

// Estilos comunes
const commonProductStyles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  imageOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    position: "absolute",
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
    marginHorizontal: "auto",
  },
  nameContainer: {
    width: "100%",
    marginBottom: 5,
  },
  name: {
    fontFamily: Fonts.regular,
    color: Colors.black.primary,
    fontWeight: 600,
    width: "100%",
    marginBottom: 6,
  },
  prices: {
    flexDirection: "row",
    gap: 4,
  },
  price: {
    fontFamily: Fonts.bold,
    color: Colors.black.primary,
    lineHeight: 26,
    fontSize: 22,
  },
  oldPrice: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.black.second,
    textDecorationLine: "line-through",
  },
  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

// Estilos para el item de producto en la lista
const productItemTablet = StyleSheet.create({
  ...commonProductStyles,
  image: {
    ...commonProductStyles.image,
    minWidth: PROD_IMAGE_SIZE.tablet,
    minHeight: PROD_IMAGE_SIZE.tablet,
    height: "100%",
    width: "100%",
    aspectRatio: 1,
  },
  name: {
    ...commonProductStyles.name,
    lineHeight: 26,
    fontSize: 18,
    minHeight: 52,
  },
  prices: {
    ...commonProductStyles.prices,
    alignItems: "baseline",
  },
  price: {
    ...commonProductStyles.price,
    fontSize: 22,
  },
  container: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  badge: {
    position: "absolute",
    top: 20,
    right: 0,
  },
  favorite: {
    display: "none",
    position: "absolute",
    top: 2,
    left: 2,
  },
  innerContainer: {
    paddingTop: 16,
    flex: 1,
  },
  addBtn: undefined,
  imageOverlay: {
    ...commonProductStyles.imageOverlay,
    minWidth: PROD_IMAGE_SIZE.tablet,
    minHeight: PROD_IMAGE_SIZE.tablet,
    aspectRatio: 1,
    height: "100%",
    width: "100%",
  },
  productCard: {
    marginBottom: 20,
  },
  actions: {
    paddingHorizontal: 0,
    justifyContent: "flex-start",
    gap: 10,
    flexDirection: "row",
    marginTop: 20,
    flexWrap: "wrap", // Posible bug
  },
});

const productItemStyles = {
  mobile: StyleSheet.create({
    ...productItemTablet,
    container: {
      ...productItemTablet.container,
      minWidth: PROD_IMAGE_SIZE.mobile,
    },
    innerContainer: {
      ...productItemTablet.innerContainer,
      minWidth: PROD_IMAGE_SIZE.mobile,
    },
    price: {
      ...productItemTablet.price,
      fontSize: 16,
      lineHeight: 24,
    },
    image: {
      ...productItemTablet.image,
      minWidth: PROD_IMAGE_SIZE.mobile,
      minHeight: PROD_IMAGE_SIZE.mobile,
    },
    imageOverlay: {
      ...productItemTablet.imageOverlay,
      minWidth: PROD_IMAGE_SIZE.mobile,
      minHeight: PROD_IMAGE_SIZE.mobile,
    },
    nameContainer: {
      ...productItemTablet.nameContainer,
      padding: 0,
    },
    name: {
      ...productItemTablet.name,
      fontSize: 14,
      lineHeight: 14,
      minHeight: 28,
    },
    oldPrice: {
      ...productItemTablet.oldPrice,
      fontSize: 10,
      lineHeight: 16,
    },
    addBtn: {
      marginLeft: 15,
      marginRight: 15,
      fontSize: 12,
      lineHeight: 12,
    },
  }),
  tablet: productItemTablet,
};

// Estilos para la vista detallada del producto
const productInfoStyles = StyleSheet.create({
  ...commonProductStyles,
  container: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 57,
  },
  badge: {
    paddingStart: 5,
  },
  imageContainer: {
    ...commonProductStyles.imageContainer,
    width: "100%",
  },
  imageOverlay: {
    ...commonProductStyles.imageOverlay,
    width: "100%",
    aspectRatio: 600 / 470,
    height: "auto",
  },
  detailsContainer: {
    flex: 1,
    paddingVertical: 25,
  },
  image: {
    ...commonProductStyles.image, // Reutilizamos la propiedad image
    width: "100%",
    aspectRatio: 600 / 470,
  },
  name: {
    ...commonProductStyles.name, // Reutilizamos la propiedad name
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 3,
  },
  prices: {
    ...commonProductStyles.prices,
    alignItems: "center",
    marginBottom: 25,
  },
  price: {
    ...commonProductStyles.price, // Reutilizamos la propiedad price
    fontSize: 22,
  },
  oldPrice: {
    ...commonProductStyles.oldPrice, // Reutilizamos la propiedad price
    paddingStart: 26,
    fontSize: 14,
  },
  favorite: {
    marginVertical: -5,
    top: 2,
    left: 2,
  },
  actions: {
    ...commonProductStyles.actions, // Reutilizamos las acciones
    paddingTop: 24,
    borderTopWidth: 2,
    borderTopColor: Colors.black.fourth,
    marginTop: 44,
  },
  numberInput: {
    backgroundColor: "transparent",
  },
  addBtn: {
    minWidth: 60,
  },
});

const productInfoResponsiveStyles = {
  mobile: StyleSheet.create({
    ...productInfoStyles,
    container: {
      ...productInfoStyles.container,
      flexDirection: "column",
      width: "auto",
    },
    imageContainer: {
      height: "auto",
      marginBottom: 20,
    },
    detailsContainer: {
      paddingHorizontal: 0,
    },
    image: {
      ...productInfoStyles.image,
      aspectRatio: 1,
    },
    name: {
      ...productInfoStyles.name,
      fontSize: 22,
      lineHeight: 24,
    },
    price: {
      ...productInfoStyles.price,
      fontSize: 16,
      lineHeight: 24,
    },
    oldPrice: {
      ...productInfoStyles.oldPrice,
      paddingStart: 10,
      fontSize: 10,
      lineHeight: 16,
    },
  }),
  desktop: productInfoStyles,
};

const productInfoSkeletonDesktop = StyleSheet.create({
  container: {
    width: "100%",
  },
  skeletonBase: {
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
  },
  breadcrumb: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  separator: {
    width: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 57,
  },
  imageContainer: {
    width: "45%",
  },
  image: {
    width: "100%",
    minHeight: 300,
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailsContainer: {
    width: "45%",
    gap: 16,
  },
  title: {
    height: 28,
    width: "100%",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  currentPrice: {
    height: 24,
    width: 120,
  },
  oldPrice: {
    height: 18,
    width: 100,
  },
  discount: {
    height: 24,
    width: 50,
    borderRadius: 4,
  },
  descriptionContainer: {
    gap: 8,
    marginBottom: 8,
  },
  descLine: {
    height: 16,
    width: "100%",
  },
  divider: {
    height: 1,
    backgroundColor: "#E1E9EE",
    marginVertical: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  quantityControl: {
    height: 40,
    width: 120,
    borderRadius: 50,
  },
  addButton: {
    height: 40,
    width: 100,
    borderRadius: 50,
  },
});

export const productInfoSkeletonStyles = {
  mobile: StyleSheet.create({
    ...productInfoResponsiveStyles.mobile,
    ...productInfoSkeletonDesktop,
    infoContainer: {
      ...productInfoSkeletonDesktop.infoContainer,
      flexDirection: "column",
      gap: 20,
    },
    imageContainer: {
      ...productInfoSkeletonDesktop.imageContainer,
      width: "100%",
    },
    image: {
      ...productInfoSkeletonDesktop.image,
      minHeight: 300,
    },
    detailsContainer: {
      ...productInfoSkeletonDesktop.detailsContainer,
      width: "100%",
    },
  }),
  tablet: StyleSheet.create({
    ...productInfoSkeletonDesktop,
    infoContainer: {
      ...productInfoSkeletonDesktop.infoContainer,
      flexDirection: "column",
      gap: 40,
    },
    imageContainer: {
      ...productInfoSkeletonDesktop.imageContainer,
      width: "100%",
    },
    image: {
      ...productInfoSkeletonDesktop.image,
      minHeight: 350,
    },
    detailsContainer: {
      ...productInfoSkeletonDesktop.detailsContainer,
      width: "100%",
    },
  }),
  desktop: StyleSheet.create({
    ...productInfoResponsiveStyles.desktop,
    ...productInfoSkeletonDesktop,
  }),
};

const productInShoppingCartStyles = StyleSheet.create({
  ...commonProductStyles,
  container: {
    width: "100%",
    paddingBottom: 15,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEFF3",
  },
  imageAndDetailsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  image: {
    ...commonProductStyles.image,
    borderRadius: 5,
    width: 80,
    height: 80,
  },
  imageOverlay: {
    ...commonProductStyles.imageOverlay,
    borderRadius: 5,
    width: 80,
    height: 80,
  }, 
  imageContainer: {
    ...commonProductStyles.imageContainer,
    marginRight: 15,
    maxWidth: 80,
  },
  textContainer: {
    flex: 1,
  },
  titleContainer: {
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.black.primary,
  },
  discountBadge: {
    marginLeft: 10,
  },
  trashIcon: {
    cursor: "pointer",
  },
  quantityAndTotalContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    columnGap: 20,
  },
  amountContainer: {
    width: 60,
  },
  totalText: {
    fontSize: 16,
    lineHeight: 27,
    fontWeight: 400,
    color: Colors.black.primary,
  },
  priceText: {
    color: Colors.black.primary,
    fontSize: 14,
    lineHeight: 27,
  },
  priceText2: {
    color: Colors.black.primary,
    marginLeft: 5,
  }
});

export {
  productItemStyles,
  productInfoResponsiveStyles,
  productInShoppingCartStyles,
};
