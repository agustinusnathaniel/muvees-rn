const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

module.exports = withUniwindConfig(
  wrapWithReanimatedMetroConfig(config, {
    cssEntryFile: './global.css',
    dtsFile: './src/uniwind-types.d.ts',
  }),
);
