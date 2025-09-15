# Catch me Up Wayang — Project Breakdown
**Last updated:** 2025-09-15

> Mobile app to introduce Gen Z to *lampahan* (wayang plays) with two modes — **Authentic** and **Modern** — running fully offline using local JSON data.

---

## 1) Vision & Goals
- **Goal:** Make classic wayang stories accessible and bingeable for Gen Z with a professional yet playful UX.
- **Modes:**
  - **Authentic:** Sinopsis + Full Cerita (+ Catatan Budaya).
  - **Modern:** Sinopsis, **TL;DR**, **Key Events (Milestones)**, **Wiki (Fandom-style)**.
- **Scope v1:** Lampahan populer + *Semar Mbangun Khayangan* (mandatory).
- **Constraint:** 100% offline (no auth, no remote API). Assets & data shipped inside app (with optional lazy-load from bundled files).

---

## 2) Product Phases → EPICs → User Stories

### Phase 0 — Foundations & Project Setup
**Objective:** Create stable DX, structure, and design tokens.
- **EPIC F0.1: App Bootstrap**
  - Initialize Expo (TypeScript) with `expo-router`.
  - Set up folder structure, envs, basic tabs.
- **EPIC F0.2: Design System & Tokens**
  - Color tokens, typography scale, spacing, radius, elevation, icon sizes.
  - Theming: **Authentic** (earth/batik) & **Modern** (neutral + accent).
- **EPIC F0.3: Data Layer (Offline)**
  - JSON schema definition, data validation at load (zod).
  - AsyncStorage cache, optimistic read, versioning.
  - Offline search index (Fuse.js) built on first launch.
- **EPIC F0.4: Quality Gate**
  - ESLint, Prettier, TypeScript strict, Jest unit tests, Detox e2e (smoke), Husky pre-commit.

**Acceptance:** App boots, tabs render, tokens applied, JSON loads with validation, search index builds, tests run green.

---

### Phase 1 — MVP (Authentic Mode)
**Objective:** Deliver the core reading experience for Authentic mode.
- **EPIC A1.1: Home & Mode Switch**
  - Splash → Home with mode toggle (Authentic/Modern).
  - Featured list: “Populer” & “Terbaru” (from JSON).
- **EPIC A1.2: Index & Search (Lampahan + Karakter)**
  - Search bar (debounced), category chips.
  - Result list with badges (Era, Silsilah).
- **EPIC A1.3: Detail (Authentic)**
  - Sections: **Sinopsis**, **Full Cerita**, **Catatan Budaya**.
  - Rich text (headings, quotes), in-page TOC, deep links.
- **EPIC A1.4: Offline Assets**
  - Optional public-domain image per lampahan (bundled). Placeholder if missing.

**Acceptance:** Users can browse/search and fully read *Authentic* content offline.

---

### Phase 2 — Modern Mode
**Objective:** Modernized digest for quick consumption.
- **EPIC M2.1: Detail (Modern) Structure**
  - **Sinopsis (ringan)**, **TL;DR** (≤3 kalimat), **Key Events** (timeline), **Wiki** (Fandom-style cards).
- **EPIC M2.2: Key Events Timeline**
  - Horizontal timeline with swipe; each event: title, desc, emoji/icon, order.
- **EPIC M2.3: Wiki (Fandom-style)**
  - Entities: **Karakter**, **Pusaka/Objek**, **Lokasi/Negeri**, **Istilah**.
  - Cross-linking (tap to open entity sheet).
- **EPIC M2.4: Save & Quick Access (Local)**
  - Markah “★ Simpan” (stored locally) + history.

**Acceptance:** Users can switch ke *Modern*, mencerna TL;DR, melompat antar peristiwa, dan jelajah wiki tanpa internet.

---

### Phase 3 — Discovery, Polishing & A11y
- **EPIC D3.1: Discovery & Curation**
  - Koleksi tematik (mis. “Wayang Semar”, “Perang Baratayuda”). 
  - Sort/filter: era, tokoh, tingkat tragedi, durasi baca.
- **EPIC D3.2: Performance & Offline Reliability**
  - Split JSON per lampahan, lazy-load dari bundle.
  - Prebuild Fuse index; warm-cache on first open.
- **EPIC D3.3: Internationalization (Optional v1.1)**
  - i18n-ready (id-ID default). Copy segregated.
- **EPIC D3.4: Accessibility**
  - Dynamic type, sufficient contrast, talkback/voiceover labels.

**Acceptance:** Navigasi lancar, pencarian cepat, teks nyaman dibaca, a11y terpenuhi.

---

### Phase 4 — Content Expansion & Editorial
- **EPIC C4.1: Content Pack 1**
  - Baratayuda, Abimanyu Gugur, **Semar Mbangun Khayangan** (lengkap).
- **EPIC C4.2: Toolkit Editor (Internal only)**
  - Script Node/CLI untuk validasi & generate search index dari JSON.
- **EPIC C4.3: QA Editorial**
  - Glosarium konsisten, ejaan EYD, konsistensi nama (Jawa/Indonesia).

**Acceptance:** Konten awal rilis; internal tool mempermudah tambah lampahan berikutnya.

---

## 3) Tech Stack

### Mobile
- **Framework:** Expo (React Native) + **TypeScript**
- **Navigation:** `expo-router`
- **State:** Zustand (minimal) atau Jotai (atoms) — ringan & offline-friendly
- **Offline Storage:** `@react-native-async-storage/async-storage`
- **Data Validation:** `zod`
- **Search (offline):** `fuse.js` (fuzzy search untuk karakter/lampahan)
- **UI Kit:** Tailwind-in-RN via `nativewind` **atau** `tamagui` (choose one)
- **Icons:** `@expo/vector-icons` (Feather/Material)
- **Images:** Bundled assets + public-domain attribution in JSON
- **Testing:** Jest + React Native Testing Library; Detox (basic e2e)
- **Build/Ship:** EAS Build (Android first, iOS optional)

### Tooling
- ESLint (airbnb+react), Prettier, Husky (pre-commit), lint-staged
- Commitlint (conventional commits), Changesets (optional versioning)

---

## 4) Information Architecture & Navigation

**Tabs (Bottom):** Home · Library (Saved) · Search · Settings  
**Stacks:** 
- Home → List → Detail (mode-aware)
- Search → Results → Detail
- Mode switch: global toggle at Home header (persisted)

**File/Folder Skeleton (Expo Router):**
```
app/
  _layout.tsx
  index.tsx                 // Home (mode switch, lists)
  search/
    index.tsx               // Search page
  lampahan/
    [id].tsx                // Detail (mode-aware)
  settings/
    index.tsx
assets/
  images/...
  data/                     // JSON content (split per lampahan)
    index.json              // registry & metadata
    baratayuda.json
    abimanyu_gugur.json
    semar_mbangun_khayangan.json
src/
  components/               // Cards, Timeline, Wiki sheets
  features/
    detail/
    search/
    library/
  hooks/
  lib/
    fuse.ts                 // build & query search index
    storage.ts              // load/validate/cache JSON
    theme.ts                // tokens & theming
  types/                    // zod schemas & TS types
  state/                    // zustand stores
```

---

## 5) Design Language (berdasarkan referensi visual yang Anda kirim)
> Nuansa **earthy pastry/café** yang hangat namun modern. Terapkan pada wayang dengan dua rasa tema.

### Warna & Tone
- **Base:** krem, beige, cappuccino (#F6EDE6–#E8D6C3).
- **Text:** cokelat tua / espresso (#3A2A22).
- **Accent:** karamel / terracotta (#B86E4B) dan **Modern accent** opsional (#6CA2FF atau #7AD3A6) untuk badge.
- **Authentic theme:** earth tone + motif batik halus sebagai *background pattern* 5% opacity.
- **Modern theme:** clean beige + accent kuat untuk CTA dan chips.

### Typography
- **Display/Brand:** serif playful (logo-style) hanya untuk judul besar.
- **UI Text:** sans-serif clean (Inter, System font stack) — readable.
- **Scale:** 12 / 14 / 16 / 18 / 24 / 32 / 40 (line-height 1.3–1.5).

### Components & Layout
- **Cards:** rounded-xl/2xl, soft shadow (elevation rendah), padding besar.
- **Chips (Categories):** pill, ikon kecil kiri, selected = filled accent, unselected = outline.
- **Search Bar:** rounded, leading icon, placeholder ramah.
- **Timeline (Key Events):** horizontal, dot + line, swipeable.
- **Wiki Cards:** grid 2 kolom, ikon/foto kecil, tag (role: hero/villain).
- **Buttons:** filled (accent), full-width untuk CTA utama; ghost untuk sekunder.
- **Imagery:** foto/ilustrasi wayang (public domain), crop close-up, warm filter ringan.

### Micro-interactions
- **Tap states:** ripple halus; hover (web) elevasi +2.
- **Empty states:** ilustrasi outline wayang, tone ringan.
- **Accessibility:** kontras AA minimum; ukuran tombol min 44dp.

---

## 6) Data Model (JSON) — v1

### Registry
```jsonc
// assets/data/index.json
{
  "version": 1,
  "lampahan": [
    {"id":"baratayuda","title":"Baratayuda","era":"Mahabharata","popular":true},
    {"id":"abimanyu_gugur","title":"Abimanyu Gugur","era":"Mahabharata","popular":true},
    {"id":"semar_mbangun_khayangan","title":"Semar Mbangun Khayangan","era":"Punokawan","popular":true}
  ]
}
```

### Lampahan Schema (per file)
```jsonc
{
  "id": "semar_mbangun_khayangan",
  "title": "Semar Mbangun Khayangan",
  "aliases": ["Semar Bangun Kahyangan"],
  "era": "Punokawan",
  "tags": ["Semar","Punokawan","Spiritual","Satire"],
  "authentic": {
    "sinopsis": "Ringkasan gaya klasik...",
    "full_cerita": "Naskah lengkap...",
    "catatan_budaya": ["Asal-usul lakon...", "Variasi pakeliran..."]
  },
  "modern": {
    "sinopsis": "Ringkas & ringan...",
    "tldr": "Semar menata kembali tatanan kosmik dan menegur para dewa.",
    "key_events": [
      {"id":"ke1","title":"Kacau di Kahyangan","desc":"Tatanan dewa terganggu.","order":1,"emoji":"⚡"},
      {"id":"ke2","title":"Semar Turun Tangan","desc":"Semar mengambil alih.","order":2,"emoji":"🌀"},
      {"id":"ke3","title":"Penataan Ulang","desc":"Keseimbangan dipulihkan.","order":3,"emoji":"🌿"}
    ],
    "wiki": {
      "karakter":[
        {"id":"semar","name":"Semar","role":"mentor","bio":"Punokawan, simbol rakyat."},
        {"id":"dewa","name":"Para Dewa","role":"authority","bio":"Diingatkan oleh Semar."}
      ],
      "objek":[
        {"id":"jimat","name":"Pusaka","desc":"Simbol kekuasaan."}
      ],
      "lokasi":[
        {"id":"kahyangan","name":"Kahyangan","desc":"Alam para dewa."}
      ],
      "istilah":[
        {"id":"tatanan","term":"Tatanan Kosmis","desc":"Harmoni jagat raya."}
      ]
    }
  },
  "images":[
    {"type":"cover","src":"assets/images/semar.jpg","credit":"Public domain / Wikimedia"}
  ]
}
```

---

## 7) Key Screens (Checklist)
- Home (mode switch, best of today, categories chips).
- List Lampahan (grid/list cards).
- Detail (Authentic): Sinopsis, Full Cerita, Catatan Budaya (TOC).
- Detail (Modern): Sinopsis, TL;DR, Key Events (timeline), Wiki (cards).
- Search (global): karakter/lampahan, filter era/tags.
- Library (Saved): offline bookmarks.
- Settings: theme (Authentic/Modern), font size, tentang aplikasi.

---

## 8) Milestones & Timeline (suggested)
- **W1–2:** Phase 0 (setup, tokens, JSON schema, search index).
- **W3–4:** Phase 1 (Authentic: list, detail, reading UX).
- **W5:** Phase 2 (Modern: TL;DR, timeline, wiki).
- **W6:** Phase 3 (perf, discovery, a11y) + Content Pack 1 QA.
- **W7:** Release (Android).

---

## 9) Risks & Mitigations
- **Data size** (many naskah) → split JSON per lampahan + lazy-load + text compression.
- **Search perf** → index prebuild + Fuse.js options (minMatchCharLength, threshold).
- **Editorial consistency** → zod validation + linter untuk konten (custom CLI).

---

## 10) Done Definition (v1)
- App berjalan 100% offline, cold start < 2.5s (mid device).
- Pencarian ≤ 150ms setelah index siap.
- 3 lampahan lengkap termasuk **Semar Mbangun Khayangan**.
- A11y dasar (AA contrast), dynamic type, talkback label.
- Build rilis Android via EAS, crash-free startup tests.

---

## 11) Next (v1.1+)
- Audio narasi (dalang), ambience gamelan (toggle).
- Share card (quote/key event) sebagai gambar.
- On-device progress/time-to-read estimasi.
- Optional export bookmark (file).

---

## 12) Sample Dev Tickets (first sprint)
- [ ] Init Expo TS + router + nativewind/tamagui
- [ ] Theme tokens + provider, 2 theme variants
- [ ] JSON schema + zod + loader + examples
- [ ] Fuse.js index build & search API
- [ ] Home + Mode switch + lists
- [ ] Detail Authentic (TOC + rich text)
- [ ] Detail Modern (TL;DR + Timeline + Wiki)
- [ ] Save/History (AsyncStorage)
- [ ] Jest unit tests (loader, search), Detox smoke

---

*Made for offline-first storytelling. ✨*
