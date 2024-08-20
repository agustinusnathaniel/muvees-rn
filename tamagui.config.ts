import * as themes from './src/lib/styles/theme';
import { config as configBase } from '@tamagui/config';
import { createFont, createTamagui } from 'tamagui';

const nunitoFace = {
  200: {
    normal: 'NunitoExtraLight',
  },
  300: {
    normal: 'NunitoLight',
  },
  400: {
    normal: 'Nunito',
  },
  500: {
    normal: 'NunitoMedium',
  },
  600: {
    normal: 'NunitoSemiBold',
  },
  700: {
    normal: 'NunitoBold',
  },
  800: {
    normal: 'NunitoExtraBold',
  },
  900: {
    normal: 'NunitoBlack',
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
  themes,
});

export default config;

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
