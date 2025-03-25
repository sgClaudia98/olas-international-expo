// Black tones
type Black =
  | "default"
  | "primary"
  | "second"
  | "third"
  | "fourth"
  | "fifth";
export const black: Record<Black, string> = {
  default: "#000000",
  primary: "#083366", 
  second: "#90A3BA",
  third: "#CED6E0",
  fourth: "#EBEFF3",
  fifth: "#F3F5F8",
};




type Blue = "primary" | "second" | "third" | "fourth" | "fifth" | "sixth";
export const blue: Record<Blue, string> = {
  primary: "#0078D9", 
  second: "#1A94F7", 
  third: "#8CC9FB", 
  fourth: "#D1EAFD",
  fifth: "#D1EAFD80",
  sixth: '#E8F5FE',
};

// Red color
type Red = "primary";
export const red: Record<Red, string> = {
  primary: "#E00000", 
};

// White color
type White = 'default';
export const white : Record<White, string> = {
  default: "#FFFFFF",
};

// Función para aplicar opacidad a un color hex
const applyOpacity = (hexColor: string, opacity: number): string => {
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

type Transparent = "clear" | "lightGray" | "darkGray";
export const transparent: Record<Transparent, string> = {
  clear: "rgba(255, 255, 255, 0)",
  lightGray: applyOpacity(black.third, 0.4), 
  darkGray: applyOpacity(black.primary, 0.8),
};

// Función para sombrear colores
export const shadeColor = (hexColor: string, percent: number): string => {
  const redGamut: number = parseInt(hexColor.slice(1, 3), 16);
  const greenGamut: number = parseInt(hexColor.slice(3, 5), 16);
  const blueGamut: number = parseInt(hexColor.slice(5, 7), 16);

  const rgb: Array<number> = [redGamut, greenGamut, blueGamut];

  const toShadedGamut = (gamut: number): number => {
    return Math.floor(Math.min(gamut * (1 + percent / 100), 255));
  };

  const toHex = (gamut: number): string => {
    return gamut.toString(16).length === 1
      ? `0${gamut.toString(16)}`
      : gamut.toString(16);
  };

  const shadedRGB: Array<number> = rgb.map(toShadedGamut);
  const shadedHex: Array<string> = shadedRGB.map(toHex);

  const hexString: string = shadedHex.join("");

  return `#${hexString}`;
};
