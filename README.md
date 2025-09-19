# Catch Me Up Wayang

Catch Me Up Wayang is an offline-first Expo mobile app that reintroduces classic wayang lampahan (plays) to Gen Z readers. Every story ships with two reading modes: Authentic for cultural purists and Modern for quick, bingeable catch-ups, so users can explore wayang lore without needing an internet connection or an account.

## Highlights
- **100% offline experience:** Stories, images, and metadata are bundled as local JSON so the app works on low-end Android devices and in poor connectivity.
- **Dual reading modes:** Toggle between Authentic (Sinopsis, Full Cerita, Catatan Budaya) and Modern (Sinopsis, TL;DR, Key Events timeline, Wiki-style entities) perspectives for each lampahan.
- **Search and discovery:** Fuse.js-powered search plus curated Popular and Recent lists help readers dive into characters, locations, and key events fast.
- **Thoughtful design:** Light/dark-ready design tokens, accessible typography, and gentle micro-interactions keep the experience inviting.

## Tech Stack
- Expo + React Native (TypeScript) with `expo-router`
- Zustand for lightweight state (mode, saved items)
- AsyncStorage cache on top of bundled JSON content
- Zod for content validation, Fuse.js for fuzzy search
- Jest + Testing Library (unit) and Detox (smoke) planned for coverage

## Project Structure
The app uses Expo Router's file-based navigation. Key folders:

```
app/                # Screens and navigation layouts
assets/             # Images, splash assets, bundled JSON (e.g., lakon_data.json)
src/components/     # Reusable UI components (cards, timelines, wiki sheets)
src/features/       # Feature-level logic (detail, search, library)
src/lib/            # Utilities (fuse index, storage helpers, theming)
src/state/          # Zustand stores for UI preferences and saved items
```

Refer to `docs/CatchMeUpWayang_Project_Breakdown.md` for the full product vision, milestones, and acceptance criteria.

## Getting Started
1. Install dependencies
   ```bash
   npm install
   ```
2. Run the development server
   ```bash
   npx expo start
   ```
3. Choose your target:
   - Development build
   - Android emulator
   - iOS simulator
   - Expo Go (quick preview)

## Content Pipeline
- All lampahan live in `assets/lakon_data.json` (v1).
- Data is validated on load with Zod and cached locally for fast reopens.
- Key events, wiki entities, and tags fuel mode-specific layouts and search filters.

## Roadmap Snapshot
- **M0 Foundations:** Expo setup, design tokens, JSON validation, smoke tests.
- **M1 Authentic MVP:** Home feeds, search, detailed Authentic reading flow.
- **M2 Modern Mode:** TL;DR timelines, wiki cards, saved stories.
- **M3 Polish & A11y:** Collections, filters, performance tuning, accessibility passes.

## Contributing
1. Follow the roadmap in `docs/` before opening large pull requests.
2. Keep additions offline-ready; bundle assets and update JSON schemas/tests.
3. Run linting and tests before submitting changes.

Ready to help someone discover their next favorite wayang story? Run the app and start exploring.
