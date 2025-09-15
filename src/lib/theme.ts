export type ThemeTokens = {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  tabBarBg: string;
  tabBarActive: string;
  tabBarInactive: string;
};

export const authentic: ThemeTokens = {
  background: '#FFFFFF',
  surface: '#FAF6F2',
  surfaceAlt: '#F1E6DA',
  text: '#3A2A22',
  textMuted: '#6B5B53',
  border: '#E8D6C3',
  accent: '#B86E4B',
  tabBarBg: '#F6EDE6',
  tabBarActive: '#B86E4B',
  tabBarInactive: 'rgba(58,42,34,0.6)',
};

export const modern: ThemeTokens = {
  background: '#FFFFFF',
  surface: '#F7F9FC',
  surfaceAlt: '#EEF3FB',
  text: '#111418',
  textMuted: '#6B7280',
  border: '#E5EAF3',
  accent: '#6CA2FF',
  tabBarBg: '#F2F5FA',
  tabBarActive: '#6CA2FF',
  tabBarInactive: 'rgba(17,20,24,0.55)',
};

export function getTheme(mode: 'authentic' | 'modern'): ThemeTokens {
  return mode === 'authentic' ? authentic : modern;
}
