import { config as configBase } from '@tamagui/config';
import { createFont, createTamagui } from 'tamagui';

const nunitoFace = {
  200: {
    normal: 'NunitoExtraLight',
    italic: 'NunitoExtraLightItalic',
  },
  300: {
    normal: 'NunitoLight',
    italic: 'NunitoLightItalic',
  },
  400: {
    normal: 'Nunito',
    italic: 'NunitoItalic',
  },
  500: {
    normal: 'NunitoMedium',
    italic: 'NunitoMediumItalic',
  },
  600: {
    normal: 'NunitoSemiBold',
    italic: 'NunitoSemiBoldItalic',
  },
  700: {
    normal: 'NunitoBold',
    italic: 'NunitoBoldItalic',
  },
  800: {
    normal: 'NunitoExtraBold',
    italic: 'NunitoExtraBoldItalic',
  },
  900: {
    normal: 'NunitoBlack',
    italic: 'NunitoBlackItalic',
  },
};

const headingFont = createFont({
  ...configBase.fonts.heading,
  family: 'Nunito',
  face: nunitoFace,
});

const bodyFont = createFont({
  ...configBase.fonts.body,
  family: 'Nunito',
  face: nunitoFace,
});

export const config = createTamagui({
  ...configBase,
  fonts: {
    ...configBase.fonts,
    heading: headingFont,
    body: bodyFont,
  },
});

export default config;

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
