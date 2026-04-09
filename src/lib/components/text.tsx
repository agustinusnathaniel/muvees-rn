import { Text as RNText, type TextProps } from 'react-native';

/**
 * Global Text component — applies the app's default font via inline style.
 * Drop-in replacement for React Native's `<Text>`.
 * HeroUI components already get font from CSS variables.
 */
export function Text(props: TextProps) {
  const { style, ...rest } = props;
  return <RNText style={[{ fontFamily: 'Nunito' }, style]} {...rest} />;
}
