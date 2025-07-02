/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';

const buildNumber = 9;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  newArchEnabled: true,
  slug: 'muvees-rn-expo',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './src/lib/assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  assetBundlePatterns: ['**/*'],
  ios: {
    userInterfaceStyle: 'automatic',
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    buildNumber: String(buildNumber),
  },
  android: {
    userInterfaceStyle: 'automatic',
    adaptiveIcon: {
      foregroundImage: './src/lib/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: Env.PACKAGE,
    versionCode: buildNumber,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './src/lib/assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-font',
    'expo-web-browser',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#ffffff',
        image: './src/lib/assets/images/icon.png',
        imageWidth: 200,
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          enableProguardInReleaseBuilds: true,
          enableShrinkResourcesInReleaseBuilds: true,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    ...ClientEnv,
    router: {
      origin: false,
    },
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  updates: {
    url: Env.EAS_UPDATES_URL,
  },
});
