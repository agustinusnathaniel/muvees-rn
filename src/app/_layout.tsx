import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';

import '^/tamagui-web.css';

import { config } from '^/tamagui.config';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';

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
  const [fontLoaded, fontError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (fontLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);

  if (!(fontLoaded || fontError)) {
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
