import React from 'react';
import {View, Text, StyleSheet, Pressable, Linking, Image} from 'react-native';
import footerStyles from '@/styles/footer';
import { Visa, MasterCard, AmericanExpress, PayPal } from '@/assets/icons/PaymentBrands';
import { WhatsApp, Facebook, Instagram } from '@/assets/icons/SocialMedia';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';
import { ThemedText } from '../ThemedText';

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
    city: string;
    state: string;
    zip: string;
  };
}

const socialLinks: SocialLink[] = [
  {component: <WhatsApp />, url: 'https://whatsapp.com'},
  {component: <Facebook />, url: 'https://facebook.com'},
  {component: <Instagram />, url: 'https://instagram.com'},
];

const services: NavigationLink[] = [
  {label: 'Viajes', url: ''},
  {label: 'Compras', url: ''},
  {label: 'Recargas', url: ''},
  {label: 'Trámites', url: ''},
];

const information: NavigationLink[] = [
  {label: 'Nosotros', url: ''},
  {label: 'Preguntas frecuentes', url: ''},
  {label: 'Términos y condiciones', url: ''},
  {label: 'Política de devolución', url: ''},
];

const Footer: React.FC<FooterProps> = ({
  email = 'contact@olasservices.com',
  phone = '(780) 358-9595',
  address = {
    street: '9611 Fontainebleau Blvd',
    city: 'Miami',
    state: 'FL',
    zip: '33172',
  },
}) => {
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
      console.error('An error occurred', error);
    }
  };

  const handleEmailPress = async (): Promise<void> => {
    try {
      await Linking.openURL(`mailto:${email}`);
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const handlePhonePress = async (): Promise<void> => {
    try {
      await Linking.openURL(`tel:${phone.replace(/[^0-9]/g, '')}`);
    } catch (error) {
      console.error('An error occurred', error);
    }
  };
  return (
    <View>
      <View style={styles.container}>
        {/* Left Section */}
        <View style={styles.logoSection}>
           <Image
                    source={require("@/assets/images/logo-footer.svg")}
                    style={styles.logo}
                  />
          <ThemedText style={styles.text}>
            Lorem ipsum dolor sit amet consectetur. Sit in sed rutrum...
          </ThemedText>
          <View style={styles.socialContainer}>
            {socialLinks.map((social, index) => (
              <Pressable
                key={index}
                onPress={() => handleSocialPress(social.url)}>
                {social.component}
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.footerMenu}>
          {/* Services Section */}
          <View>
            <ThemedText style={styles.sectionTitle}>Servicios</ThemedText>
            <View style={styles.footerItemContainer}>
            {services.map((service, index) => (
              <ThemedText
                key={index}
                style={styles.footerItemText}>
                {service.label}
              </ThemedText>
            ))}
            </View>
          </View>

          {/* Information Section */}
          <View>
            <ThemedText style={styles.sectionTitle}>Información</ThemedText>
            <View style={styles.footerItemContainer}>
            {information.map((info, index) => (
              <ThemedText
                key={index}
                style={styles.footerItemText}>
                {info.label}
              </ThemedText>
            ))}
            </View>
          </View>

          {/* Contact Section */}
          <View>
            <ThemedText style={styles.sectionTitle}>Atención al cliente</ThemedText>
            <View style={styles.footerItemContainer}>
            
            <ThemedText style={styles.footerItemText}>
              {address.street},{'\n'}
              {address.city}, {address.state} {address.zip}
            </ThemedText>
            <Pressable onPress={handlePhonePress}>
              <ThemedText style={styles.footerItemText}>{phone}</ThemedText>
            </Pressable>
            <Pressable onPress={handleEmailPress}>
              <ThemedText style={styles.footerItemText}>{email}</ThemedText>
            </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <ThemedText style={styles.copyright}>
          Olas International Services &copy; {new Date().getFullYear()} | Política de privacidad
        </ThemedText>
        <View style={styles.paymentMethods}>
          <Visa />
          <MasterCard />
          <AmericanExpress />
          <PayPal />
        </View>
      </View>
    </View>
  );
};


export default Footer;
