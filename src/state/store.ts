import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Mode = 'authentic' | 'modern';

type SavedMap = Record<string, number>; // id -> timestamp

type AppState = {
  mode: Mode;
  setMode: (m: Mode) => void;
  saved: SavedMap;
  toggleSave: (id: string) => void;
  history: string[]; // most recent first
  addHistory: (id: string) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
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
      history: [],
      addHistory: (id) =>
        set((s) => {
          const filtered = s.history.filter((x) => x !== id);
          const next = [id, ...filtered].slice(0, 50);
          return { history: next };
        }),
    }),
    {
      name: 'cmu-wayang-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode, saved: state.saved, history: state.history }),
    }
  )
);

export type { Mode };
