# Tamagui v2 Migration & Configuration Guide

> Last updated: 2026-04-08
> Current version: **2.0.0-rc.37** (latest stable)
> Reference: https://github.com/tamagui/tamagui/tree/main/code/starters/expo-router

---

## 📦 Package Versions

| Package | This Project | Official Starter | Notes |
|---------|-------------|-----------------|-------|
| `tamagui` | 2.0.0-rc.37 | workspace:* (rc.37) | ✅ Aligned |
| `@tamagui/config` | 2.0.0-rc.37 | workspace:* | ✅ Aligned |
| `@tamagui/babel-plugin` | 2.0.0-rc.37 | workspace:* | ✅ Aligned |
| `@tamagui/metro-plugin` | 2.0.0-rc.37 | ❌ Not used | ⚠️ Dev-only, removed from Metro |
| `@tamagui/cli` | 2.0.0-rc.37 | implicit | ✅ Aligned |
| `@tamagui/lucide-icons-2` | 2.0.0-rc.37 | workspace:* | ✅ Aligned |
| `@tamagui/themes` | 2.0.0-rc.37 | ❌ Not used | Custom themes via `themes` |
| Expo SDK | 55.0.0 | ~55.0.6 | ✅ Compatible |
| React | 19.2.0 | >=19 | ✅ Compatible |
| React Native | 0.83.4 | 0.83.2 | ✅ Compatible |
| TypeScript | 5.9.2 | ~5.9.2 | ✅ Aligned |
| react-native-reanimated | 4.2.1 | ~4.2.2 | ✅ Compatible |
| react-native-worklets | 0.7.2 | 0.7.2 | ✅ Required by reanimated v4 |

### Resolutions (required for dedup)
```json
{
  "resolutions": {
    "@tamagui/core": "2.0.0-rc.37",
    "@tamagui/web": "2.0.0-rc.37"
  }
}
```

---

## 🔧 Configuration Files

### tamagui.config.ts
```typescript
import { themes } from './src/lib/styles/theme';
import { animations } from '@tamagui/config/v5-reanimated';
import { defaultConfig } from '@tamagui/config/v5';
import { createFont, createTamagui } from 'tamagui';

// Custom Nunito font faces...

export const config = createTamagui({
  ...defaultConfig,
  animations,
  fonts: {
    ...defaultConfig.fonts,
    heading: headingFont,
    body: bodyFont,
  },
  themes,
});

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
```

**Key points:**
- Config v5 uses `defaultConfig` from `@tamagui/config/v5` (Radix Colors v3 palette, Tailwind-matching breakpoints)
- Animations are **separate** — import from `@tamagui/config/v5-reanimated`
- Custom fonts use `createFont()` spreading from `defaultConfig.fonts`
- TypeScript module augmentation for IntelliSense

### tamagui.build.ts
```typescript
import type { TamaguiBuildOptions } from 'tamagui';

export default {
  components: ['tamagui'],
  config: './tamagui.config.ts',
  outputCSS: './tamagui-web.css',
} satisfies TamaguiBuildOptions;
```

### babel.config.js
```javascript
module.exports = (api) => {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
```

**Diff from official starter:** This project previously had `useReactNativeWebLite: true` — removed because it's not in the official starter and not needed for Expo SDK 55.

### metro.config.js
```javascript
const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});
```

**Diff from official starter:** The official starter uses plain `getDefaultConfig(__dirname)` with no options. We keep `isCSSEnabled: true` because we import `tamagui-web.css` for web styles. The `@tamagui/metro-plugin` / `withTamagui()` wrapper is **no longer needed** — CSS extraction is handled by the compiler.

### _layout.tsx (native setup)
```typescript
import '@tamagui/native/setup-teleport';
import '^/tamagui-web.css';
```

**Why only `setup-teleport`?**
- `setup-teleport`: Required for `<Sheet>`, `<Dialog>`, `<Popover>`, `<Select>` — ensures React contexts work inside portaled content via `react-native-teleport`
- `setup-expo-linear-gradient`: Not needed — we don't use gradients

---

## ✅ Code Migration Changes

### Prop/API Replacements (v1 → v2)

| v1 (old) | v2 (new) | Notes |
|----------|----------|-------|
| `animation="bouncy"` | `transition="bouncy"` | Animation prop renamed |
| `secureTextEntry` | `type="password"` | Standard HTML input API |
| `keyboardType` | `type="email"`, `type="tel"`, etc. | Standard HTML input API |
| `onHoverIn` / `onHoverOut` | `onMouseEnter` / `onPointerEnter` | Web events standardization |
| `useTheme(props)` | `<Theme>` component | Hook → component pattern |
| `space` / `spaceDirection` (on Group) | `gap` | Use CSS gap instead |

### Native Setup Imports

Add to `src/app/_layout.tsx` (top of file, before other imports):

```typescript
// Portals for Sheet/Dialog/popover - required if using these components
import '@tamagui/native/setup-teleport';

// Only if using LinearGradient component
// import '@tamagui/native/setup-expo-linear-gradient';
```

---

## 📋 Migration Checklist

### Completed
- [x] Update all `@tamagui/*` packages to 2.0.0-rc.37
- [x] Update config to use `@tamagui/config/v5`
- [x] Import animations from `@tamagui/config/v5-reanimated`
- [x] Add resolutions for `@tamagui/core` and `@tamagui/web`
- [x] Add `@tamagui/native/setup-teleport` in `_layout.tsx`
- [x] Remove `withTamagui` from metro config (no longer needed)
- [x] Create `tamagui.build.ts` for CSS generation
- [x] Replace `animation` prop with `transition`
- [x] Update Input props (`secureTextEntry` → `type="password"`)
- [x] Remove `useReactNativeWebLite` from babel plugin (not needed for Expo 55)
- [x] Run `tamagui check` ✅
- [x] Build test ✅

### Not Applicable (Decisions)
- [ ] ~~Remove `@tamagui/metro-plugin` from devDependencies~~ — Kept as dev dep for `tamagui build` CLI, but **not used in metro.config.js**
- [ ] ~~Switch to default themes~~ — Custom theme builder retained for Nunito font + custom color scheme
- [ ] ~~Add `@tamagui/toast`~~ — Not needed, not using toast notifications

---

## 🚀 v2 Key Features Available

### Config v5
- Expanded color palettes (gray, orange, pink, purple, teal, neutral) via Radix Colors v3
- Opacity tokens (`$color01`, `$background005`)
- Pre-tuned shadow opacities
- Tailwind-matching breakpoints (`640px`–`1536px`)
- `createV5Theme()` helper for custom theme generation

### New Style Support
- `backgroundImage`, `boxShadow` (multi/inset/spread), `filter`, `mixBlendMode`
- `isolation`, `boxSizing`, `display`
- `position: fixed` (auto-converts to `absolute` on native)
- `border` shorthand, `outline` shorthand
- `textShadow`, `borderCurve`, `cursor`

### Animation Drivers (experimental)
- `transition` prop replaces `animation`
- Supports `delay`, asymmetric `enter`/`exit` animations
- Per-pseudo-state transitions (`hoverStyle`, `pressStyle`)
- `animatedBy` prop for per-component driver selection

### Component Scope (global portals)
```tsx
// Mount one Tooltip at root, place triggers anywhere
<Tooltip scope="global">
  <Tooltip.Content><Paragraph>Label</Paragraph></Tooltip.Content>
  <Slot />
</Tooltip>

// Anywhere in app
<Tooltip.Trigger scope="global" aria-label="Settings">
  <Button icon={Settings} />
</Tooltip.Trigger>
```

### Headless Components
- `@tamagui/switch-headless`, `@tamagui/checkbox-headless`
- `@tamagui/radio-headless`, `@tamagui/tabs-headless`

### Group Component Changes
- `Group.Item` is now **required** — no longer auto-clones children
- Removed `space`, `separator`, `scrollable`, `disablePassBorderRadius` props
- Manually add `<Separator />` between items

---

## 📝 Notes

### TypeScript Errors
Expected during development — the babel plugin transforms JSX at build time, but TypeScript doesn't see these transformations. The app builds and runs correctly.

### Key Differences from v1
1. **Animations are separate** — Must import from `@tamagui/config/v5-reanimated`
2. **Native setup imports** — Add `@tamagui/native/setup-teleport` in `_layout.tsx` (only if using Sheet/Dialog/Popover)
3. **Stricter types** — Tamagui v2 has more precise TypeScript types
4. **Simpler Metro config** — `withTamagui` plugin is no longer used in metro.config.js
5. **Config v5** — Uses new `defaultConfig` from `@tamagui/config/v5` with separate animations
6. **Reanimated v4** — Requires `react-native-worklets` package
7. **New Architecture required** — Expo SDK 55 only supports New Architecture
8. **`isCSSEnabled`** — Still used in our Metro config for web CSS support (official starter omits it)

### Prebuild (native code regeneration)

After upgrading Expo SDK or Tamagui, **always** use `--clean` to regenerate native folders from scratch:

```bash
# Android
yarn prebuild:android --clean

# iOS
yarn prebuild:ios --clean
```

**Why `--clean` is critical:** Without it, stale native files from previous Expo versions linger in `android/` and `ios/`. For example, after upgrading to Expo 55, the old `MainApplication.kt` still referenced `ReactNativeHostWrapper` (removed in Expo 50+), causing Kotlin compilation failures. The `--clean` flag wipes native folders before regenerating, ensuring they match the current SDK version.

### Upgrade Commands
```bash
# Upgrade all tamagui packages to latest
yarn upgrade:tamagui

# Upgrade to canary (pre-release)
yarn upgrade:tamagui:canary

# Check tamagui configuration
npx tamagui check

# Generate CSS for web
npx tamagui build

# Generate LLM prompt for your config (useful for AI-assisted upgrades)
npx tamagui generate-prompt
```

---

## 📚 Resources

- [Tamagui v2 Blog Post](https://tamagui.dev/blog/version-two)
- [Upgrade Guide](https://tamagui.dev/docs/guides/how-to-upgrade)
- [Official Expo Router Starter](https://github.com/tamagui/tamagui/tree/main/code/starters/expo-router)
- [Tamagui Docs](https://tamagui.dev/docs)
