type FontWeight = 'normal' | 'bold' | 'semibold';

type TypographyStyle = {
  fontSize: number;
  fontWeight: FontWeight;
  lineHeight?: number;
};

type Typography = {
  h1: TypographyStyle;
  h2: TypographyStyle;
  h3: TypographyStyle;
  body: TypographyStyle;
  bodyHighlight: TypographyStyle;
  categoriesTitle: TypographyStyle;
  filterTitle: TypographyStyle;
  selectedItems: TypographyStyle;
  label: TypographyStyle;
};

const typography: Typography = {
  h1: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 42,
  },
  h2: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 42,
  },
  h3: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
  },
  bodyHighlight: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
  },
  categoriesTitle: {
    fontSize: 22,
    fontWeight: 'semibold',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
  selectedItems: {
    fontSize: 13,
    fontWeight: 'semibold',
  },
  label: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 24,
  }
};

export default typography;