import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { SearchProvider } from "../context/SearchContext";
import BannerSlider from "../components/banners/BannerSlider";
import Categories from "../components/landing/Categories";
import CategoriesSlider from "../components/landing/CategoriesSlider";
import PopularBrands from "../components/landing/PopularBrands";
import GirlWithBagSection from "../components/landing/GirlWithBagSection";
import ProductSlider from "../components/landing/BestProducts";
import ExperienceFromYourMobile from "../components/landing/ExperienceFromYourMobile";
import Testimonials from "../components/landing/Testimonials";
import NewsletterSection from "../components/landing/NewsletterSection";
import BottomImage from "../components/landing/BottomImage";
import Footer from "@/components/layout/Footer";
import Btn from "@/components/Btn";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import IconSvg from "@/components/ui/IconSvg";
import { Colors } from "@/styles";

const LandingWrapper: React.FC = () => {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(true); // Modal is visible by default

  const countries = [
    { id: "CU", name: "Cuba" },
    { id: "VZ", name: "Venezuela" },
    { id: "MX", name: "Mexico" },
    { id: "BR", name: "Brazil" },
  ];
  const [selectedCountry, setSelectedCountry] = useState<string>(
    countries[0].name
  ); // No country selected initially

  const selectCountry = (country: string) => {
    setSelectedCountry(country);
    setModalVisible(false); // Close the modal after selection
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <>
          <View
            style={{ marginTop: 10, marginBottom: 60, paddingHorizontal: 20 }}
          >
            <SearchProvider>
              <BannerSlider height={500} />
              <Categories />
            </SearchProvider>
          </View>
          {/* <CategoriesSlider /> */}
          {/* <PopularBrands /> */}
          <GirlWithBagSection />
          {/* <ProductSlider /> */}
          <Testimonials />
          <ExperienceFromYourMobile />
          <NewsletterSection />
          <View style={{ width: "100%" }}>
            <BottomImage />
          </View>
          <View
            style={{ width: "90%", justifyContent: "center", margin: "auto" }}
          >
            <Footer />
          </View>
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default LandingWrapper;
