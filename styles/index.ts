import { StyleSheet, Dimensions } from 'react-native';

import * as Colors from "./colors"
import * as Outlines from "./outlines"
import * as Sizing from "./sizing"
import * as Typography from "./typography"

export {
  Colors,
  Outlines,
  Sizing, 
  Typography
}

export const mainTextColor: string = '#424B5A';
export const lightColor: string = '#F2F5F7';
export const ultraLightColor: string = '#EBF0F4';
export const mainRedColor: string = '#DD3247';
export const contentsBackgroundColor: string = '#FFFFFF';
export const greyColor: string = '#8994A5';
export const greenColor: string = '#098423';
export const orangeColor: string = '#D68D00';
export const lightGreyColor: string = '#CED7E5';
export const white: string = '#FFFFFF';

export const horizontal_padding: number = 10;
const { width, height } = Dimensions.get('window');

// Remove
export const testStyles = StyleSheet.create({
  defaultContainer: {
    flex: 1, 
    justifyContent: "center",  // Optional, adjust based on layout needs
    alignItems: "center", 
    gap: 10
  },
})

const defaultStyles = StyleSheet.create({
  defaultBorder: {
    borderColor: lightGreyColor,
    borderWidth: 1
  },
});

export default StyleSheet.create({
  contentsMainContainer: {
    backgroundColor: contentsBackgroundColor,
  },
  contentsFrame: {
    flex: 1,
    marginHorizontal: horizontal_padding,
    marginTop: 10,
    paddingBottom: 10
  },
  horizontalFrame: {
    marginHorizontal: horizontal_padding
  },

  paddingFrame: {
    padding: horizontal_padding
  },

  mainTextColor: {
    color: mainTextColor
  },

  lightBackground: {
    backgroundColor: lightColor
  },

  mainRedColor: {
    color: mainRedColor
  },

  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  rowAlignTop: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },

  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    zIndex: 998
  },
  floatingVideo: {
    position: 'absolute',
    right: 10,
    bottom: 85,
    width: 250,
    height: 140,
    zIndex: 998
  },
  ultraLightBackground: {
    backgroundColor: ultraLightColor
  },
  defaultRoundedButton: {
    ...defaultStyles.defaultBorder,
    borderRadius: 24,
    backgroundColor: 'rgba(66, 75, 90, 0.15)'
  },
  defaultShadow: {
    shadowColor: greyColor,
    shadowOpacity: .2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 }
  }
});