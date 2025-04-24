import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  Image,
} from "react-native";
import footerStyles from "@/styles/footer";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import { ThemedText } from "../ThemedText";
import { useTranslation } from "react-i18next";
import { Link } from "expo-router";
import IconSvg from "../ui/IconSvg";
import { Colors } from "@/styles";
import { AmericanExpress, Mastercard, Paypal, Visa } from "../icons";

interface SocialLink {
  component: React.ReactElement;
  url: string;
}

interface NavigationLink {
  label: string;
  url?: string;
}

interface FooterProps {
  email?: string;
  phone?: string;
  address?: {
    street: string;
    addressLink?: string;
    city: string;
    state: string;
    zip: string;
  };
}

const socialLinks: SocialLink[] = [
  { component: <IconSvg name="WhatsApp" size={15} />, url: "https://whatsapp.com" },
  { component: <IconSvg name="Facebook" size={15} />, url: "https://facebook.com" },
  { component: <IconSvg name="Instagram" size={15} />, url: "https://instagram.com" },
];

const services: NavigationLink[] = [
 // { label: "MODULE.TRAVEL", url: "/services/travel" },
  { label: "MODULE.MARKET", url: "/services/market" },
];

const information: NavigationLink[] = [
  // { label: "PAGE.ABOUT_US", url: "/" },
  { label: "PAGE.FAQ", url: "/faq" },
  { label: "PAGE.TERMS_AND_CONDITIONS", url: "/terms-and-conditions" },
  { label: "PAGE.PRIVACY_POLICY", url: "/privacy-policy" },
];
const privacyPolicy: NavigationLink = {
  label: "PAGE.PRIVACY_POLICY",
  url: "/",
};

const Footer: React.FC<FooterProps> = ({
  email = "contact@olasservices.com",
  phone = "(780) 358-9595",
  address = {
    addressLink:
      "https://www.google.com/maps/search/?api=1&query=9507+SW+40th+St+Miami+FL+33165",
    street: "9611 Fontainebleau Blvd",
    city: "Miami",
    state: "FL",
    zip: "33172",
  },
}) => {
  const { t } = useTranslation();
  const styles = useResponsiveStyles(footerStyles);

  const handleSocialPress = async (url: string): Promise<void> => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error(`Don't know how to open this URL: ${url}`);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleAddressPress = async (): Promise<void> => {
    try {
      if (address.addressLink) await Linking.openURL(address.addressLink);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  const handleEmailPress = async (): Promise<void> => {
    try {
      await Linking.openURL(`mailto:${email}`);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handlePhonePress = async (): Promise<void> => {
    try {
      await Linking.openURL(`tel:${phone.replace(/[^0-9]/g, "")}`);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  return (
    <View>
      <View style={styles.container}>
        {/* Left Section */}
        <View style={styles.logoSection}>
          <Link href="/">
            <Image
              source={require("@/assets/images/logo-footer.svg")}
              style={styles.logo}
            />
          </Link>
          <ThemedText style={styles.text}>{t("DESCRIPTION")}</ThemedText>
          <View style={styles.socialContainer}>
            {socialLinks.map((social, index) => (
              <Pressable
                key={index}
                onPress={() => handleSocialPress(social.url)}
              >
                {social.component}
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.footerMenu}>
          {/* Services Section */}
          <View>
            <ThemedText style={styles.sectionTitle}>
              {t("HEADER.SERVICES")}
            </ThemedText>
            <View style={styles.footerItemContainer}>
              {services.map((service, index) => (
                <Link href={service.url as any}>
                  <ThemedText key={index} style={styles.footerItemText}>
                    {t(service.label)}
                  </ThemedText>
                </Link>
              ))}
            </View>
          </View>
          {/* Information Section */}
          <View>
            <ThemedText style={styles.sectionTitle}>
              {t("HEADER.INFORMATION")}
            </ThemedText>
            <View style={styles.footerItemContainer}>
              {information.map((info, index) => (
                <Link href={info.url as any}>
                  <ThemedText key={index} style={styles.footerItemText}>
                    {t(info.label)}
                  </ThemedText>
                </Link>
              ))}
            </View>
          </View>
          {/* Contact Section */}
          <View>
            <ThemedText style={styles.sectionTitle}>
              {t("HEADER.CUSTOMER_SERVICE")}
            </ThemedText>
            <View style={styles.footerItemContainer}>
              <Pressable onPress={handleAddressPress} style={styles.footerItemIconCont}>
              <IconSvg name="Location" size={17} height={21} color={Colors.blue.third}/>
                <ThemedText style={styles.footerItemText}>
                  {address.street},{"\n"}
                  {address.city}, {address.state} {address.zip}
                </ThemedText>
              </Pressable>
              <Pressable onPress={handlePhonePress}style={styles.footerItemIconCont}>
              <IconSvg name="Phone" size={17} height={21} color={Colors.blue.third}/>
                 <ThemedText style={styles.footerItemText}>{phone}</ThemedText>
              </Pressable>
              <Pressable onPress={handleEmailPress}style={styles.footerItemIconCont}>
              <IconSvg name="Email" size={17} height={21} color={Colors.blue.third}/>
                <ThemedText style={styles.footerItemText}>{email}</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <ThemedText style={styles.copyright}>
          Olas International Services &copy; {new Date().getFullYear()} |{" "}
          <Link href={privacyPolicy.url as any}>{t(privacyPolicy.label)}</Link>
        </ThemedText>
        <View style={styles.paymentMethods}>
          <Visa width={31.72} height={10.26} color={Colors.black.primary} />
          <Mastercard width={20.95} height={12.95} color={Colors.black.primary} />
          <AmericanExpress width={12.95} height={12.95} color={Colors.black.primary} />
          <Paypal width={10.52} height={12.95} color={Colors.black.primary} />
        </View>
      </View>
    </View>
  );
};

export default Footer;
