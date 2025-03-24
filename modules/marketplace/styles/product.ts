import { Colors } from "@/styles";
import Fonts from "@/styles/fonts";
import typography from "@/styles/typography";
import { StyleSheet } from "react-native";

const IMAGE_SIZE = {
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
  image: {
    borderRadius: 10,
    marginHorizontal: "auto",
  },
  nameContainer: {
    paddingVertical: 8,
    width: "100%",
  },
  name: {
    fontFamily: Fonts.bold,
    color: Colors.black.primary,
    fontWeight: "400",
    lineHeight: 26,
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
    width: IMAGE_SIZE.tablet,
    height: IMAGE_SIZE.tablet,
  },
  name: {
    ...commonProductStyles.name, 
    fontSize: 18,
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
    marginHorizontal: "auto",
    width: IMAGE_SIZE.tablet,
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
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: IMAGE_SIZE.tablet,
    flex: 1,
  },
  addBtn: undefined,
  imageOverlay: {
    width: IMAGE_SIZE.tablet,
    height: IMAGE_SIZE.tablet,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    position: "absolute",
    borderRadius: 10,
  },
  productCard: {
    backgroundColor: Colors.white.default,
    borderRadius: 0,
    shadowColor: Colors.white.default,
    shadowRadius: 0,
    boxShadow: "none",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    minHeight: 300,
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
    innerContainer: {
      ...productItemTablet.innerContainer,
      maxWidth: IMAGE_SIZE.tablet,
    },
    price: {
      ...productItemTablet.price,
      fontSize: 16,
    },
    image: {
      ...productItemTablet.image,
      width: IMAGE_SIZE.mobile,
      height: IMAGE_SIZE.mobile,
    },
    imageOverlay: {
      ...productItemTablet.imageOverlay,
      width: IMAGE_SIZE.mobile,
      height: IMAGE_SIZE.mobile,
      backgroundColor: "red"
    },
    nameContainer: {
      ...productItemTablet.nameContainer,
      padding: 0,
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
    paddingVertical: 16,
    flexDirection: "row",
  },
  badge: {
    paddingStart: 5,
  },
  imageContainer: {
    ...commonProductStyles.imageContainer, // Reutilizamos la propiedad image
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  image: {
    ...commonProductStyles.image, // Reutilizamos la propiedad image
    width: "100%",
    height: 470,
    paddingRight: 20,
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
  },
});

const productInShoppingCartStyles = StyleSheet.create({
  ...commonProductStyles,
  container: {
    width: "100%",
    paddingBottom: 10,
    paddingRight: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEFF3",
  },
  imageAndDetailsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  image: {
    borderRadius: 5,
    width: 80,
    height: 80,
    objectFit: "contain",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 600,
    color: Colors.black.primary,
  },
  discountBadge: {
    marginLeft: 10,
  },
  trashIcon: {
    marginTop: 5,
    cursor: "pointer",
  },
  quantityAndTotalContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    columnGap: 40,
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
    fontWeight: 700,
  },
});

export { productItemStyles, productInfoStyles, productInShoppingCartStyles };
