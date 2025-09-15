import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppStore } from '../src/state/store';
import { getTheme } from '../src/lib/theme';

export const unstable_settings = {
  anchor: '(tabs)',
} as const;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const mode = useAppStore((s) => s.mode);
  const t = getTheme(mode);

  const base = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: t.accent,
      card: base.colors.card,
      text: base.colors.text,
      background: base.colors.background,
      border: base.colors.border,
    },
  } as const;

  return (
    <ThemeProvider value={navTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="lampahan/[id]" options={{ title: '' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
