import {
  Nunito_200ExtraLight,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light,
  Nunito_300Light_Italic,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_500Medium,
  Nunito_500Medium_Italic,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black,
  Nunito_900Black_Italic,
} from '@expo-google-fonts/nunito';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';

import { config } from '^/tamagui.config';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';

import '^/tamagui-web.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    NunitoExtraLight: Nunito_200ExtraLight,
    NunitoLight: Nunito_300Light,
    Nunito: Nunito_400Regular,
    NunitoMedium: Nunito_500Medium,
    NunitoSemiBold: Nunito_600SemiBold,
    NunitoBold: Nunito_700Bold,
    NunitoExtraBold: Nunito_800ExtraBold,
    NunitoBlack: Nunito_900Black,
    NunitoExtraLightItalic: Nunito_200ExtraLight_Italic,
    NunitoLightItalic: Nunito_300Light_Italic,
    NunitoItalic: Nunito_400Regular_Italic,
    NunitoMediumItalic: Nunito_500Medium_Italic,
    NunitoSemiBoldItalic: Nunito_600SemiBold_Italic,
    NunitoBoldItalic: Nunito_700Bold_Italic,
    NunitoExtraBoldItalic: Nunito_800ExtraBold_Italic,
    NunitoBlackItalic: Nunito_900Black_Italic,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!(fontsLoaded || fontError)) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <ThemeProvider value={DefaultTheme}>
        <SWRConfig
          value={{
            provider: () => new Map(),
            isOnline() {
              /* Customize the network state detector */
              return true;
            },
            isVisible() {
              /* Customize the visibility state detector */
              return true;
            },
            initFocus() {
              /* Register the listener with your state provider */
            },
            initReconnect() {
              /* Register the listener with your state provider */
            },
          }}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </SWRConfig>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
