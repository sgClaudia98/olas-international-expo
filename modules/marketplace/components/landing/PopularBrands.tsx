import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { brands } from "../../data/landing";
import { popularBrandsStyles } from "../../styles/landing";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";

const PopularBrands = () => {
  const styles = useResponsiveStyles(popularBrandsStyles);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Marcas populares</Text>
      <View style={styles.brandsContainer}>
        {brands.map((brand) => (
          <Image source={brand.imageURL} key={brand.name}></Image>
        ))}
      </View>
    </View>
  );
};

export default PopularBrands;
