import { RelativePathString } from "expo-router";
import {
  ElectricalAppliances,
  FastDeliveryIcon,
  Ferreteria,
  FoodAndCombo,
  PersonalCare,
  SafePaymentIcon,
  Support247Icon,
} from "@/assets/icons/LandingIcons";
import React from "react";
import { ImageSourcePropType } from "react-native";

interface CategoryElement {
  name: string;
  icon?: React.ReactElement;
  url?: RelativePathString;
}

export const categories: CategoryElement[] = [
  {
    name: "Alimentos y Combos",
    icon: React.createElement(FoodAndCombo),
    url: "/services/market/products" as RelativePathString,
  },
  {
    name: "Cuidado personal y Hogar",
    icon: React.createElement(PersonalCare),
  },
  {
    name: "Ferretería",
    icon: React.createElement(Ferreteria),
  },
  {
    name: "Electrodomésticos y Celulares",
    icon: React.createElement(ElectricalAppliances),
  },
];

interface PopularBrand {
  name?: string;
  imageURL: ImageSourcePropType;
  websiteURL?: string;
}

const PATH = "@/assets/images/brands/";
const EXT = ".webp";

export const brands: PopularBrand[] = [
  {
    name: "Hershey",
    imageURL: require(`${PATH}hershey${EXT}`),
  },
  {
    name: "Kelloggs",
    imageURL: require(`${PATH}kelloggs${EXT}`),
  },
  {
    name: "Nestle",
    imageURL: require(`${PATH}nestle${EXT}`),
  },
  {
    name: "Carrefour",
    imageURL: require(`${PATH}carrefour${EXT}`),
  },
  {
    name: "BOSCH",
    imageURL: require(`${PATH}bosch${EXT}`),
  },
  {
    name: "Heinz",
    imageURL: require(`${PATH}heinz${EXT}`),
  },
  {
    name: "SONY",
    imageURL: require(`${PATH}sony${EXT}`),
  },
  {
    name: "Dove",
    imageURL: require(`${PATH}dove${EXT}`),
  },
  {
    name: "HUAWEI",
    imageURL: require(`${PATH}huawei${EXT}`),
  },
];

interface ShopExperienceData {
  heading?: string;
  text?: string;
  icon?: React.ReactElement;
}

export const shopExperienceData: ShopExperienceData[] = [
  {
    heading: "Entregas rápidas",
    text: "Lorem ipsum dolor sit amet consectetur. Sit in sed rutrum ultrices egestas. Neque leo praesent odio diam.",
    icon: React.createElement(FastDeliveryIcon),
  },
  {
    heading: "Pagos seguros",
    text: "Lorem ipsum dolor sit amet consectetur. Sit in sed rutrum ultrices egestas. Neque leo praesent odio diam.",
    icon: React.createElement(SafePaymentIcon),
  },
  {
    heading: "Asistencia 24/7",
    text: "Lorem ipsum dolor sit amet consectetur. Sit in sed rutrum ultrices egestas. Neque leo praesent odio diam.",
    icon: React.createElement(Support247Icon),
  },
];

export interface Review {
  rate: number;
  text: string;
  author?: string;
}

export const reviews: Review[] = [
  {
    rate: 3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamcoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    author: "Maxin Will",
  },
  {
    rate: 3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamcoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    author: "Maxin Will",
  },
  {
    rate: 3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamcoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    author: "Maxin Will",
  },
];
