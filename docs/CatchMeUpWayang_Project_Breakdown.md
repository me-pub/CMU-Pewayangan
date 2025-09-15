# Catch Me Up Wayang — Project Breakdown
Last updated: 2025-09-15

Purpose: a fully offline mobile app that introduces Gen Z to wayang lampahan (plays) with two reading modes: Authentic and Modern. Content ships as local JSON; no login or network required.

—

## 1) Vision and Scope
- Goal: make classic wayang stories easy, delightful, and bingeable while respecting their cultural depth.
- Modes:
  - Authentic: Sinopsis, Full Cerita, Catatan Budaya.
  - Modern: Sinopsis, TL;DR, Key Events timeline, Wiki-style entities.
- v1 scope: a curated set of popular lampahan including Semar Mbangun Khayangan (required).
- Constraints: 100% offline; data and media bundled; small footprint; smooth on low-end Android.
- Non-goals (v1): user accounts, cloud sync, content authoring inside the app.

—

## 2) Milestones and Acceptance

### M0 — Foundations
- Boot Expo (TypeScript) with expo-router; strict TS, ESLint, Prettier.
- Design tokens (colors, type scale, spacing, radii, elevation); light/dark-ready.
- Data layer: JSON schema with Zod validation, AsyncStorage cache, simple versioning.
- Quality gate: unit tests runnable; CI lint passes locally.
Acceptance: app launches; tabs render; one sample JSON loads and validates.

### M1 — Authentic MVP
- Home with mode toggle; Popular and Recent sections from local index.
- Search across lampahan and characters with Fuse.js.
- Detail (Authentic): Sinopsis, Full Cerita, Catatan Budaya with rich text and in-page TOC.
- Bundled cover image per lampahan with graceful placeholder.
Acceptance: user can browse, search, and read Authentic content offline end-to-end.

### M2 — Modern Mode
- Detail (Modern): Sinopsis, TL;DR (2–3 sentences), Key Events timeline, Wiki cards.
- Entity sheets for characters, objects, locations, terms with cross-links.
- Local “Save” and history.
Acceptance: user can switch modes and navigate events and wiki without network.

### M3 — Polish and A11y
- Collections (editorial lists), sort/filter (era, characters, reading length).
- Performance: split JSON per lampahan; lazy load from bundle, warmed cache.
- Accessibility: dynamic type, screen reader labels, minimum contrast.
Acceptance: smooth navigation on low-end devices; a11y checks pass.

—

## 3) Architecture
- App framework: Expo (React Native) + TypeScript.
- Navigation: expo-router (tabs + stacks per screen cluster).
- State: lightweight store (Zustand) for UI prefs (mode, saved items); screen-local state via React.
- Storage: AsyncStorage for cached parsed data and user lists; source of truth is bundled JSON.
- Validation: Zod schemas for registry and lampahan files.
- Search: Fuse.js index built at first run; prebuilt optional later.
- UI: choose either NativeWind (Tailwind in RN) or Tamagui (one, not both). Icons via @expo/vector-icons.
- Testing: Jest + @testing-library/react-native; minimal Detox e2e for launch and search.
- Build: EAS Build (Android primary). iOS optional.

—

## 4) Navigation and Structure
- Tabs: Home • Library (Saved) • Search • Settings.
- Stacks: Home → List → Detail; Search → Results → Detail. Mode toggle in Home header, persisted.

Suggested layout (expo-router):
```
app/
  _layout.tsx
  index.tsx                   // Home (mode toggle, lists)
  search/
    index.tsx                 // Search
  lampahan/
    [id].tsx                  // Detail (mode-aware)
  settings/
    index.tsx
assets/
  images/
  lakon_data.json             // single JSON for v1
src/
  components/                 // Cards, Timeline, Wiki sheets
  features/
    detail/
    search/
    library/
  hooks/
  lib/
    fuse.ts                   // build & query search index
    storage.ts                // load/validate/cache JSON
    theme.ts                  // tokens & theming
  types/                      // zod schemas & TS types
  state/                      // zustand stores
```

—

## 5) Design Language
- Authentic theme: warm earth tones, subtle batik background at low opacity.
- Modern theme: clean neutrals with a single vibrant accent.
- Typography: system sans for UI; optional decorative serif only for large titles.
- Components: rounded cards, soft shadows; pill chips; accessible sizes (min 44dp touch area).
- Micro-interactions: gentle press feedback; empty states with line-art wayang illustration.

—

## 6) Data Model (JSON) — v1

Single-file data source at `assets/lakon_data.json`.

Top-level shape:
```jsonc
{
  "version": 1,
  "lampahan": [
    {
      "id": "semar_mbangun_khayangan",
      "title": "Semar Mbangun Khayangan",
      "era": "Punokawan",
      "popular": true,
      "aliases": ["Semar Bangun Kahyangan"],
      "tags": ["Semar", "Punokawan", "Spiritual", "Satire"],
      "authentic": {
        "sinopsis": "Ringkasan gaya klasik...",
        "full_cerita": "Naskah lengkap...",
        "catatan_budaya": ["Asal-usul lakon...", "Variasi pakeliran..."]
      },
      "modern": {
        "sinopsis": "Ringkas dan ringan...",
        "tldr": "Semar menata kembali tatanan kosmik dan menegur para dewa.",
        "key_events": [
          {"id": "ke1", "title": "Kekacauan di Kahyangan", "desc": "Tatanan dewa terganggu.", "order": 1, "icon": "sparkles"},
          {"id": "ke2", "title": "Semar Turun Tangan", "desc": "Semar mengambil alih.", "order": 2, "icon": "hand"},
          {"id": "ke3", "title": "Penataan Ulang", "desc": "Keseimbangan pulih.", "order": 3, "icon": "balance"}
        ],
        "wiki": {
          "karakter": [
            {"id": "semar", "name": "Semar", "role": "mentor", "bio": "Punokawan, simbol rakyat."},
            {"id": "para_dewa", "name": "Para Dewa", "role": "authority", "bio": "Diingatkan oleh Semar."}
          ],
          "objek": [{"id": "pusaka", "name": "Pusaka", "desc": "Simbol kekuasaan."}],
          "lokasi": [{"id": "kahyangan", "name": "Kahyangan", "desc": "Alam para dewa."}],
          "istilah": [{"id": "tatanan", "term": "Tatanan Kosmis", "desc": "Harmoni jagat raya."}]
        }
      },
      "images": [{"type": "cover", "src": "assets/images/semar.jpg", "credit": "Public domain / Wikimedia"}]
    }
  ]
}
```

Notes:
- Keep everything in one file for v1 simplicity; split later if size grows.
- `icon` uses a small internal vocabulary mapped to vector icons.
- `popular` and tags drive Home curation and filters.

—

## 7) Key Screens (Checklist)
- Home (mode switch, popular/recent lists, category chips).
- Detail (Authentic): Sinopsis, Full Cerita, Catatan Budaya (TOC).
- Detail (Modern): Sinopsis, TL;DR, Key Events (timeline), Wiki (cards).
- Search (global): characters/lampahan, filters (era/tags).
- Library (Saved): local bookmarks.
- Settings: theme (Authentic/Modern), font size, about page.

—

## 8) Milestones and Timeline (suggested)
- Weeks 1–2: M0 setup, tokens, JSON loader, search index.
- Weeks 3–4: M1 Authentic mode core UX.
- Week 5: M2 Modern mode features.
- Week 6: M3 polish, discovery, a11y; content QA.
- Week 7: Android release build.

—

## 9) Risks and Mitigations
- Bundle size: compress images; consider optional covers; split later.
- Search performance: reasonable Fuse options; prebuild index if needed.
- Editorial consistency: Zod validation + internal content lint/CLI.

—

## 10) Definition of Done (v1)
- 100% offline; cold start under ~2.5s on mid-range device.
- Search responds under ~150ms after index ready.
- At least 3 lampahan including Semar Mbangun Khayangan.
- Basic a11y (AA contrast), dynamic type, screen reader labels.
- EAS Android release; crash-free startup.

—

## 11) Next (v1.1+)
- Optional audio narration/ambience, share cards, time-to-read, export bookmarks.

—

## 12) Sprint 1 Tickets
- [ ] Init Expo TS + expo-router + UI kit (NativeWind or Tamagui)
- [ ] Theme tokens + provider + 2 theme variants
- [ ] Zod schema + loader for `assets/lakon_data.json`
- [ ] Fuse.js index build + search API
- [ ] Home + Mode switch + lists from JSON
- [ ] Detail Authentic (TOC + rich text)
- [ ] Detail Modern (TL;DR + Timeline + Wiki)
- [ ] Save/History in AsyncStorage
- [ ] Jest unit tests (loader, search) + Detox smoke

