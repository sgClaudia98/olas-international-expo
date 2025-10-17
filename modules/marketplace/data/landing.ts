import { RelativePathString } from "expo-router";
import {
  FastDeliveryIcon,
  SafePaymentIcon,
  Support247Icon,
} from "@/components/LandingIcons";
import React from "react";
import { ImageSourcePropType } from "react-native";

export interface CategoryElement {
  name: string;
  icon?: React.ReactElement;
  code: string;
  url?: {
    departmentId: number;
    categoryId?: number;
  };
}

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
    heading: "MARKET.HOME.FEATURES.SUBTITLES.F1",
    text: "MARKET.HOME.FEATURES.DESCRIPTIONS.F1",
    icon: React.createElement(FastDeliveryIcon),
  },
  {
    heading: "MARKET.HOME.FEATURES.SUBTITLES.F2",
    text: "MARKET.HOME.FEATURES.DESCRIPTIONS.F2",
    icon: React.createElement(SafePaymentIcon),
  },
  {
    heading: "MARKET.HOME.FEATURES.SUBTITLES.F3",
    text: "MARKET.HOME.FEATURES.DESCRIPTIONS.F3",
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
