import Fonts from "./fonts";

type TypographyStyle = {
  fontSize: number;
  fontFamily: string;
  lineHeight?: number;
};

type Typography = {
  h1: TypographyStyle;
  h2: TypographyStyle;
  h3: TypographyStyle;
  body: TypographyStyle;
  bodyHighlight: TypographyStyle;
  title2B: TypographyStyle;
  categoriesTitle: TypographyStyle;
  filterTitle: TypographyStyle;
  selectedItems: TypographyStyle;
  label: TypographyStyle;
};

const typography: Typography = {
  h1: {
    fontSize: 36,
    fontFamily: Fonts.bold,
    lineHeight: 42,
  },
  h2: {
    fontSize: 30,
    fontFamily: Fonts.bold,
    lineHeight: 42,
  },
  h3: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    lineHeight: 24,
  },
  bodyHighlight: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    lineHeight: 24,
  },
  title2B: {
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
  categoriesTitle: {
    fontSize: 22,
    fontFamily: Fonts.semibold,
  },
  filterTitle: {
    fontSize: 18,
    fontFamily: Fonts.semibold,
  },
  selectedItems: {
    fontSize: 13,
    fontFamily: Fonts.semibold,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    lineHeight: 24,
  }
};

export default typography;