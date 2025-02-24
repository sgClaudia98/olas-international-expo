import React from 'react';
import {View, Text, StyleSheet, Pressable, Linking, Image} from 'react-native';
import {Colors} from '@/styles';
import typography from '@/styles/typography';
import { Visa, MasterCard, AmericanExpress, PayPal } from '@/assets/icons/PaymentBrands';
import { WhatsApp, Facebook, Instagram } from '@/assets/icons/SocialMedia';

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
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet consectetur. Sit in sed rutrum...
          </Text>
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
            <Text style={styles.sectionTitle}>Servicios</Text>
            {services.map((service, index) => (
              <Text
                key={index}
                style={styles.footerItemText}>
                {service.label}
              </Text>
            ))}
          </View>

          {/* Information Section */}
          <View>
            <Text style={styles.sectionTitle}>Información</Text>
            {information.map((info, index) => (
              <Text
                key={index}
                style={styles.footerItemText}>
                {info.label}
              </Text>
            ))}
          </View>

          {/* Contact Section */}
          <View>
            <Text style={styles.sectionTitle}>Atención al cliente</Text>
            <Text style={styles.footerItemText}>
              {address.street},{'\n'}
              {address.city}, {address.state} {address.zip}
            </Text>
            <Pressable onPress={handlePhonePress}>
              <Text style={styles.footerItemText}>{phone}</Text>
            </Pressable>
            <Pressable onPress={handleEmailPress}>
              <Text style={styles.footerItemText}>{email}</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.copyright}>
          Olas International Services &copy; {new Date().getFullYear()} | Política de privacidad
        </Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black.primary,
    paddingVertical: 60,
    paddingHorizontal: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 25,
    gap: 40,
    width: '100%',
    marginHorizontal: 'auto',
  },
  logoSection: {
    minWidth: 200,
  },
  footerMenu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 80,
  },
  logo: {
    marginBottom: 25,
  },
  text: {
    color: Colors.blue.fourth,
    marginBottom: 12,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  sectionTitle: {
    ...typography.bodyHighlight,
    color: Colors.blue.fourth,
    fontWeight: '600',
    marginBottom: 24,
  },
  footerItemText: {
    color: Colors.blue.third,
    marginBottom: 18,
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  bottomSection: {
    marginVertical: 20,
    width: '100%',
    marginHorizontal: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  copyright: {
    color: Colors.black.primary,
    fontSize: 12,
    lineHeight: 22,
    fontWeight: 400,
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
});

export default Footer;
