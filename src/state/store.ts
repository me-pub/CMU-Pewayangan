import { create } from 'zustand';

type Mode = 'authentic' | 'modern';

type SavedMap = Record<string, number>; // id -> timestamp

type AppState = {
  mode: Mode;
  setMode: (m: Mode) => void;
  saved: SavedMap;
  toggleSave: (id: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  mode: 'authentic',
  setMode: (m) => set({ mode: m }),
  saved: {},
  toggleSave: (id) =>
    set((s) => {
      const next = { ...s.saved };
      if (next[id]) delete next[id];
      else next[id] = Date.now();
      return { saved: next };
    }),
}));

export type { Mode };

