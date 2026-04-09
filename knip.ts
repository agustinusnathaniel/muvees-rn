import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  project: ['src/**/*.{ts,tsx}'],
  ignoreFiles: ['.agents']
};

export default config;
