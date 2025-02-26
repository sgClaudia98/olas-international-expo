import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors} from '@/styles';
import typography from '@/styles/typography';

export interface FooterStyles {
  container: ViewStyle;
  logoSection: ViewStyle;
  text: TextStyle; 
  socialContainer: ViewStyle;
  footerMenu: ViewStyle;
  sectionTitle: TextStyle; 
  footerItemText: TextStyle; 
  bottomSection: ViewStyle;
  copyright: TextStyle; 
  paymentMethods: ViewStyle;
  logo: ImageStyle;
}

const styles = {
    mobile: StyleSheet.create<FooterStyles>({
      container: {
        backgroundColor: Colors.black.primary,
        paddingVertical: 60,
        paddingHorizontal: 40,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 25,
        gap: 40,
        width: '100%',
        marginHorizontal: 'auto',
      },
      logoSection: {
        minWidth: '100%'
      },
      footerMenu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 20,
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
    }),
    tablet: StyleSheet.create<FooterStyles>({
      container: {
        backgroundColor: Colors.black.primary,
        paddingVertical: 60,
        paddingHorizontal: 100,
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
    }),
  };

  export default styles;