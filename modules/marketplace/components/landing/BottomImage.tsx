import React from "react";
import { Image } from "react-native";

const image = require("@/assets/images/kitchen-appliances.webp")

const BottomImage = () => {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  return (
    <Image
      source={image}
      width={1440}
      height={535}
      resizeMode="cover"
      onLoad={() => setIsImageLoaded(true)}
      style={{ opacity: isImageLoaded ? 1 : 0, width: '100%', marginBottom: -60 }}
    />
  );
};

export default BottomImage;
